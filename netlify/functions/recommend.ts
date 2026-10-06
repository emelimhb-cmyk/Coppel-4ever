import { GoogleGenAI } from '@google/genai';
import { CATALOGO_SMARTPHONES, generateSmartFallback } from '../../src/data/phonesData.ts';

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

export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let prompt = '';
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    prompt = body.prompt || '';
  } catch {
    prompt = '';
  }

  const userPrompt = typeof prompt === 'string' && prompt.trim().length > 0
    ? prompt.trim()
    : 'Busco un celular con excelente cámara de fotos para conciertos, batería para 24 horas y que el abono quincenal en Coppel no supere los $450.';

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallback = generateSmartFallback(userPrompt);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fallback, source: 'curated_coppel_catalog' }),
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

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
          return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...parsed, source: 'gemini-3.8-flash' }),
          };
        }
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON:', parseErr, text);
      }
    }

    const fallback = generateSmartFallback(userPrompt);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fallback, source: 'fallback_after_unparsed' }),
    };
  } catch (err: any) {
    console.error('Gemini Netlify Function failed:', err?.message || err);
    const fallback = generateSmartFallback(userPrompt);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fallback, source: 'fallback_after_error' }),
    };
  }
};
