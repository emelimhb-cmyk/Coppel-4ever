import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Volume2,
  VolumeX,
  CreditCard,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
  Camera,
  Battery,
  Flame,
  ArrowRight,
  Printer,
  Share2,
  Info,
  Check,
  ShoppingBag,
  Eye,
  Scale
} from 'lucide-react';
import {
  type Smartphone,
  CATALOGO_SMARTPHONES,
  PRESET_CONSULTAS,
  generateSmartFallback,
} from '../data/phonesData.ts';

interface AsesorSectionProps {
  onSelectPhone: (phone: Smartphone) => void;
  onSimulateCredit: (phone: Smartphone) => void;
  onAddToCompare: (phone: Smartphone) => void;
  compareList: Smartphone[];
}

export interface RecommendationItem {
  modelo: string;
  por_que_es_ideal: string;
  precio_contado: string;
  abono_quincenal_estimado: {
    plazo: string;
    monto: string;
  }[];
  puntos_fuertes: string[];
}

export const AsesorSection: React.FC<AsesorSectionProps> = ({
  onSelectPhone,
  onSimulateCredit,
  onAddToCompare,
  compareList,
}) => {
  const [prompt, setPrompt] = useState(
    'Busco un celular con excelente cámara de fotos para conciertos, batería para 24 horas y que el abono quincenal en Coppel no supere los $450.'
  );
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([
    {
      modelo: 'Samsung Galaxy A55 5G',
      por_que_es_ideal:
        'Es una de las mejores opciones para conciertos gracias a su estabilización óptica (OIS) que evita fotos borrosas mientras bailas. Su procesador gestiona increíblemente la energía para que grabes todo el evento sin miedo a que se apague, y su pantalla Super AMOLED brilla incluso bajo las luces del escenario.',
      precio_contado: '$8,999 MXN',
      abono_quincenal_estimado: [
        {
          plazo: '24 quincenas',
          monto: '$438 MXN',
        },
        {
          plazo: '36 quincenas',
          monto: '$325 MXN',
        },
      ],
      puntos_fuertes: [
        'Cámara con Modo Noche mejorado y OIS',
        'Resistencia al agua y polvo (IP67)',
        'Batería de 5,000 mAh para más de 24 horas',
      ],
    },
    {
      modelo: 'Motorola Edge 50 Fusion',
      por_que_es_ideal:
        'Este equipo es perfecto si buscas estilo y rendimiento. Su sensor de cámara Sony LYTIA es especialista en captar luz en condiciones oscuras (como un concierto), asegurando fotos nítidas. Además, su carga ultra rápida de 68W te garantiza que, con solo unos minutos de carga, tendrás batería para todo el día.',
      precio_contado: '$6,999 MXN',
      abono_quincenal_estimado: [
        {
          plazo: '24 quincenas',
          monto: '$342 MXN',
        },
        {
          plazo: '36 quincenas',
          monto: '$255 MXN',
        },
      ],
      puntos_fuertes: [
        'Pantalla curva pOLED de 144Hz',
        'Carga TurboPower de 68W en caja',
        'Sensor Sony LYTIA ideal para poca luz',
      ],
    },
    {
      modelo: 'Xiaomi Redmi Note 13 Pro+ 5G',
      por_que_es_ideal:
        'Si quieres ver al artista de cerca aunque estés lejos del escenario, su cámara de 200MP es tu mejor aliada para hacer zoom sin perder calidad. Es un guerrero de la batería y su carga de 120W es de las más rápidas en Coppel: carga de 0 a 100% en menos de 25 minutos antes de salir al show.',
      precio_contado: '$9,499 MXN',
      abono_quincenal_estimado: [
        {
          plazo: '36 quincenas',
          monto: '$395 MXN',
        },
        {
          plazo: '24 quincenas',
          monto: '$462 MXN',
        },
      ],
      puntos_fuertes: [
        'Cámara principal de 200MP con OIS',
        'Carga hiper rápida de 120W HyperCharge',
        'Pantalla CrystalRes 1.5K de alta resolución',
      ],
    },
  ]);

  const [advisorMessage, setAdvisorMessage] = useState(
    '¡Hola! Entiendo perfectamente lo que buscas: quieres capturar esos momentos épicos en los conciertos sin preocuparte por la batería y cuidando tu bolsillo. Estos tres modelos son los favoritos de nuestros clientes en Coppel por su equilibrio entre cámaras profesionales y pagos quincenales muy cómodos. ¡Espero que disfrutes mucho tu próximo evento con tu nuevo smartphone!'
  );

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Match recommendation model with full catalog entry
  const getCatalogMatch = (modeloName: string): Smartphone | undefined => {
    const cleanName = modeloName.toLowerCase();
    return CATALOGO_SMARTPHONES.find(p => {
      const pName = p.modelo.toLowerCase();
      return cleanName.includes(p.id) || 
             pName.includes(cleanName) || 
             cleanName.includes(pName) ||
             (cleanName.includes('a55') && p.id.includes('a55')) ||
             (cleanName.includes('edge 50') && p.id.includes('edge-50')) ||
             (cleanName.includes('note 13') && p.id.includes('note-13')) ||
             (cleanName.includes('magic 6') && p.id.includes('magic-6')) ||
             (cleanName.includes('poco x6') && p.id.includes('poco-x6')) ||
             (cleanName.includes('g84') && p.id.includes('g84')) ||
             (cleanName.includes('a35') && p.id.includes('a35')) ||
             (cleanName.includes('iphone 13') && p.id.includes('iphone-13'));
    });
  };

  const handleAskAdvisor = async (customPrompt?: string) => {
    const query = customPrompt || prompt;
    if (!query.trim()) return;

    if (customPrompt) {
      setPrompt(customPrompt);
    }

    setLoading(true);
    stopSpeaking();

    try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error('Error al consultar al asesor');
      }

      const data = await response.json();
      if (data.recomendaciones && data.recomendaciones.length > 0) {
        setRecommendations(data.recomendaciones);
      }
      if (data.mensaje_asesor) {
        setAdvisorMessage(data.mensaje_asesor);
      }
    } catch (err) {
      console.warn('Network call failed, utilizing built-in advisor fallback:', err);
      const fallback = generateSmartFallback(query);
      setRecommendations(fallback.recomendaciones);
      setAdvisorMessage(fallback.mensaje_asesor);
    } finally {
      setLoading(false);
    }
  };

  // Text to speech toggle
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${advisorMessage} Te recomiendo: ${recommendations.map(r => r.modelo).join(', ')}.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-MX';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleCopyQuote = () => {
    const quoteText = `COTIZACIÓN COPPEL 4EVER: TU SMARTPHONE IDEAL\n\n` +
      `Mensaje del Asesor:\n${advisorMessage}\n\n` +
      recommendations.map((r, i) => (
        `OPCIÓN ${i + 1}: ${r.modelo}\n` +
        `• Precio de Contado: ${r.precio_contado}\n` +
        `• Abono Quincenal: ${r.abono_quincenal_estimado.map(a => `${a.monto} (${a.plazo})`).join(' | ')}\n` +
        `• Puntos Fuertes: ${r.puntos_fuertes.join(', ')}\n`
      )).join('\n') +
      `\nCotización generada para presentar en tienda física Coppel o Coppel.com`;

    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Advisor Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003B95] via-[#002868] to-[#001740] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-900">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#FED400]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FED400] text-slate-950 font-black text-xs uppercase px-3.5 py-1.5 rounded-full shadow-md tracking-wider">
            <Sparkles className="w-4 h-4 text-[#003B95]" /> Asesor Especialista Coppel 4ever
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Encuentra tu <span className="text-[#FED400] underline decoration-[#FED400]/40">Smartphone Ideal</span> con pagos a tu medida
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto">
            Dinos qué necesitas (conciertos, batería, gaming, trabajo) y tu presupuesto quincenal.
            Te calculamos el precio de contado y los abonos oficiales a <strong className="text-white">24 o 36 quincenas</strong> con Crédito Coppel.
          </p>

          {/* Quick Presets */}
          <div className="pt-2">
            <p className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-2.5">
              Búsquedas populares de nuestros clientes:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PRESET_CONSULTAS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleAskAdvisor(preset.prompt)}
                  className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all border flex items-center gap-1.5 ${
                    prompt === preset.prompt
                      ? 'bg-[#FED400] text-slate-900 border-[#FED400] shadow-md scale-105'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <span>{preset.titulo}</span>
                  <span className="text-[10px] bg-black/20 text-slate-200 px-1.5 py-0.5 rounded">
                    &lt; ${preset.abono_max}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Input Form */}
          <div className="pt-4">
            <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-2xl flex flex-col sm:flex-row items-stretch gap-2 border-2 border-[#FED400]">
              <div className="relative flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ej: Busco un celular con excelente cámara de fotos para conciertos, batería para 24 horas y que el abono quincenal no supere los $450..."
                  rows={2}
                  className="w-full text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium px-4 py-2.5 rounded-xl border-none focus:outline-none focus:ring-0 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskAdvisor();
                    }
                  }}
                />
              </div>

              <button
                onClick={() => handleAskAdvisor()}
                disabled={loading || !prompt.trim()}
                className="bg-[#FED400] hover:bg-yellow-400 text-[#003B95] font-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap text-sm sm:text-base self-stretch sm:self-auto"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-[#003B95] border-t-transparent rounded-full animate-spin" />
                    <span>Analizando celulares...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#003B95]" />
                    <span>Consultar al Asesor</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advisor Response Area */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Advisor Message Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#003B95] text-[#FED400] flex items-center justify-center font-black text-xl shadow-md border-2 border-[#FED400]">
                C
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">Asesor Virtual Coppel</h3>
                <span className="text-[11px] font-bold bg-blue-50 text-[#003B95] px-2 py-0.5 rounded-full border border-blue-200">
                  Especialista en Telefonía
                </span>
              </div>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                {advisorMessage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
            <button
              onClick={toggleSpeech}
              title="Escuchar recomendación del asesor"
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Detener voz</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#003B95]" />
                  <span>Escuchar</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyQuote}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all"
              title="Copiar cotización para llevar a tienda"
            >
              {copiedQuote ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">¡Cotización Copiada!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#003B95]" />
                  <span>Guardar Cotización</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2 to 3 Recommended Smartphones Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Tus Smartphones Recomendados
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Seleccionados exactamente para tus prioridades y con abonos dentro de tu presupuesto.
              </p>
            </div>
            <span className="text-xs font-extrabold bg-[#FED400] text-slate-900 px-2.5 py-1 rounded-lg">
              {recommendations.length} Equipos Ideales
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => {
              const matchedCatalog = getCatalogMatch(rec.modelo);
              const isCompared = matchedCatalog && compareList.some(c => c.id === matchedCatalog.id);

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Badge top */}
                  <div className="bg-[#003B95] text-white px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1 text-[#FED400]">
                      <Sparkles className="w-3.5 h-3.5" /> Opción #{index + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-200 bg-white/10 px-2 py-0.5 rounded">
                      {matchedCatalog?.etiqueta_destacada || 'Recomendado Coppel'}
                    </span>
                  </div>

                  {/* Image and Header */}
                  <div className="p-5 pb-3">
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-50 mb-4 group-hover:scale-[1.02] transition-transform">
                      {matchedCatalog ? (
                        <img
                          src={matchedCatalog.imagen}
                          alt={rec.modelo}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200">
                          <ShoppingBag className="w-12 h-12 text-[#003B95]/40" />
                        </div>
                      )}
                      
                      {/* Price Tag Overlay */}
                      <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block leading-tight">
                          Precio de contado
                        </span>
                        <span className="text-base font-black text-slate-900">
                          {rec.precio_contado}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-[#003B95] transition-colors leading-snug">
                      {rec.modelo}
                    </h3>
                  </div>

                  {/* Biweekly Installments Spotlight */}
                  <div className="mx-5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-yellow-200/80 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-[#003B95] flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-amber-600" /> Abono con Crédito Coppel
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-900 bg-[#FED400] px-1.5 py-0.5 rounded">
                        Quincenal
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {rec.abono_quincenal_estimado.map((abono, aIdx) => (
                        <div key={aIdx} className="bg-white p-2 rounded-xl border border-yellow-200 text-center shadow-xs">
                          <span className="text-[10px] font-bold text-slate-500 block">
                            a {abono.plazo}
                          </span>
                          <span className="text-base font-black text-slate-900">
                            {abono.monto}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why it's ideal description */}
                  <div className="px-5 pb-3 flex-1">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-3.5">
                      <p className="text-[11px] font-bold text-[#003B95] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> ¿Por qué es ideal para ti?
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {rec.por_que_es_ideal}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Puntos Fuertes
                      </p>
                      {rec.puntos_fuertes.map((punto, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#003B95] mt-1.5 flex-shrink-0" />
                          <span>{punto}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-3 border-t border-slate-100 bg-slate-50/50 mt-auto space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          if (matchedCatalog) onSelectPhone(matchedCatalog);
                        }}
                        disabled={!matchedCatalog}
                        className="w-full bg-[#003B95] hover:bg-blue-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#FED400]" />
                        <span>Ver Ficha</span>
                      </button>

                      <button
                        onClick={() => {
                          if (matchedCatalog) onSimulateCredit(matchedCatalog);
                        }}
                        disabled={!matchedCatalog}
                        className="w-full bg-[#FED400] hover:bg-yellow-400 text-slate-900 font-extrabold text-xs py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-[#003B95]" />
                        <span>Simular</span>
                      </button>
                    </div>

                    {matchedCatalog && (
                      <button
                        onClick={() => onAddToCompare(matchedCatalog)}
                        className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border ${
                          isCompared
                            ? 'bg-blue-50 text-[#003B95] border-blue-200'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isCompared ? '✓ En lista de comparación' : '+ Comparar frente a frente'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coppel Guarantee & Benefits Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B95] flex items-center justify-center flex-shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Abonos Quincenales Fijos</h4>
              <p className="text-[11px] text-slate-500">Pagas lo acordado cada 15 días con tu tarjeta o en sucursal.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
              ⚡
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Ahorra al Liquidar Antes</h4>
              <p className="text-[11px] text-slate-500">Si pagas antes de tu plazo, Coppel bonifica los intereses.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
              ★
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Entrega Inmediata</h4>
              <p className="text-[11px] text-slate-500">Recoge en 2 horas en cualquier tienda Coppel de México.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
