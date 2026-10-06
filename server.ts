import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { CATALOGO_SMARTPHONES, generateSmartFallback } from './src/data/phonesData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini client server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Eres el Asesor Especialista de 'Coppel 4ever: Tu Smartphone Ideal'. Tu misión es recomendar exactamente de 2 a 3 smartphones que cumplan con las prioridades del usuario (cámara, batería, rendimiento) y su presupuesto. Siempre desglosa el precio de contado oficial en México y estima el pago en abonos quincenales con Crédito Coppel (a 24 o 36 quincenas). Explica por qué es ideal para el cliente usando un tono empático, ágil y confiable de tienda departamental Coppel.

Debes responder ÚNICAMENTE un objeto JSON válido con la siguiente estructura:
{
  "recomendaciones": [
    {
      "modelo": "Nombre del modelo exacto (ej. Samsung Galaxy A55 5G)",
      "por_que_es_ideal": "Explicación detallada de por qué se adapta a sus necesidades",
      "precio_contado": "$X,XXX MXN",
      "abono_quincenal_estimado": [
        {
          "plazo": "24 quincenas",
          "monto": "$XXX MXN"
        }
      ],
      "puntos_fuertes": [
        "Punto 1",
        "Punto 2",
        "Punto 3"
      ]
    }
  ],
  "mensaje_asesor": "Mensaje cordial y entusiasta de despedida al estilo Coppel"
}`;

// API Routes
app.post('/api/recommend', async (req, res) => {
  const { prompt } = req.body;
  const userPrompt = typeof prompt === 'string' && prompt.trim().length > 0
    ? prompt.trim()
    : 'Busco un celular con excelente cámara de fotos para conciertos, batería para 24 horas y que el abono quincenal en Coppel no supere los $450.';

  if (!ai) {
    const fallback = generateSmartFallback(userPrompt);
    return res.json({ ...fallback, source: 'curated_coppel_catalog' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.4,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const text = response.text;
    if (text) {
      try {
        const parsed = JSON.parse(text);
        if (parsed.recomendaciones && Array.isArray(parsed.recomendaciones)) {
          return res.json({ ...parsed, source: 'gemini-3.8-flash' });
        }
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON:', parseErr, text);
      }
    }
    // If output is not valid JSON, fallback
    const fallback = generateSmartFallback(userPrompt);
    return res.json({ ...fallback, source: 'fallback_after_unparsed' });
  } catch (err: any) {
    console.error('Gemini API call failed:', err?.message || err);
    const fallback = generateSmartFallback(userPrompt);
    return res.json({ ...fallback, source: 'fallback_after_error' });
  }
});

app.get('/api/catalog', (_req, res) => {
  res.json({ catalog: CATALOGO_SMARTPHONES });
});

// Crédito Coppel Calculation Endpoint
app.post('/api/simulate-credit', (req, res) => {
  const { precioContado, plazoQuincenas, enganchePorcentaje = 0 } = req.body;
  const precio = Number(precioContado) || 8000;
  const plazo = Number(plazoQuincenas) || 24;
  const enganchePct = Number(enganchePorcentaje) || 0;

  const enganche = Math.round(precio * (enganchePct / 100));
  const montoAFinanciar = Math.max(0, precio - enganche);

  // Coppel standard retail factor
  // 16 quincenas: 1.10
  // 24 quincenas: 1.17
  // 36 quincenas: 1.50
  // 48 quincenas: 1.82
  let factor = 1.17;
  if (plazo <= 16) factor = 1.10;
  else if (plazo <= 24) factor = 1.17;
  else if (plazo <= 36) factor = 1.50;
  else factor = 1.82;

  const totalCredito = Math.round(montoAFinanciar * factor) + enganche;
  const saldoFinanciado = Math.round(montoAFinanciar * factor);
  const abonoQuincenal = Math.ceil(saldoFinanciado / plazo);

  res.json({
    precioContado: precio,
    enganche,
    montoAFinanciar,
    plazoQuincenas: plazo,
    factor,
    totalCredito,
    abonoQuincenal,
    ahorroLiquidarContado: totalCredito - precio
  });
});

// Vite Middleware Setup for Dev / Static Serving for Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Coppel 4ever] Server running on port ${PORT} (isProd=${isProd})`);
  });
}

startServer();
