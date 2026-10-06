import React, { useState, useMemo } from 'react';
import { type Smartphone, CATALOGO_SMARTPHONES } from '../data/phonesData.ts';
import {
  CreditCard,
  Calculator,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Percent,
  ArrowRight,
  Store,
  DollarSign
} from 'lucide-react';

interface CreditSimulatorProps {
  initialPhone?: Smartphone | null;
  onSelectPhone: (phone: Smartphone) => void;
}

export const CreditSimulator: React.FC<CreditSimulatorProps> = ({
  initialPhone,
  onSelectPhone,
}) => {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string>(
    initialPhone?.id || 'samsung-galaxy-a55'
  );
  const [customPrice, setCustomPrice] = useState<number>(
    initialPhone?.precio_contado_num || 8999
  );
  const [useCustomPrice, setUseCustomPrice] = useState<boolean>(false);
  const [plazoQuincenas, setPlazoQuincenas] = useState<number>(24);
  const [enganchePorcentaje, setEnganchePorcentaje] = useState<number>(0);

  const activePhone = useMemo(() => {
    return CATALOGO_SMARTPHONES.find(p => p.id === selectedPhoneId);
  }, [selectedPhoneId]);

  const precioEfectivo = useCustomPrice ? customPrice : (activePhone?.precio_contado_num || 8000);

  // Coppel factor calculation
  const calculations = useMemo(() => {
    const enganche = Math.round(precioEfectivo * (enganchePorcentaje / 100));
    const montoAFinanciar = Math.max(0, precioEfectivo - enganche);

    let factor = 1.17;
    if (plazoQuincenas <= 16) factor = 1.10;
    else if (plazoQuincenas <= 24) factor = 1.17;
    else if (plazoQuincenas <= 36) factor = 1.50;
    else factor = 1.82;

    const saldoFinanciado = Math.round(montoAFinanciar * factor);
    const totalCredito = saldoFinanciado + enganche;
    const abonoQuincenal = Math.ceil(saldoFinanciado / plazoQuincenas);
    const interesTotal = totalCredito - precioEfectivo;

    return {
      precioEfectivo,
      enganche,
      montoAFinanciar,
      plazoQuincenas,
      saldoFinanciado,
      totalCredito,
      abonoQuincenal,
      interesTotal,
      ahorroLiquidacionAnticipada: interesTotal
    };
  }, [precioEfectivo, plazoQuincenas, enganchePorcentaje]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003B95] bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <Calculator className="w-3.5 h-3.5 text-[#003B95]" /> Cotizador Oficial
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Simulador de Crédito Coppel
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Calcula exactamente tu pago quincenal para cualquier celular con plazos a 16, 24, 36 o 48 quincenas.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#003B95] text-white p-4 rounded-2xl flex-shrink-0">
          <CreditCard className="w-8 h-8 text-[#FED400]" />
          <div>
            <span className="text-[11px] text-slate-300 block">Beneficio Exclusivo</span>
            <span className="text-sm font-bold text-[#FED400]">0% Enganche Disponible</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select phone or amount */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003B95] text-white text-xs flex items-center justify-center font-bold">1</span>
                Elige el Smartphone o ingresa un monto
              </h2>
              <div className="flex items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setUseCustomPrice(false)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    !useCustomPrice ? 'bg-[#003B95] text-white' : 'text-slate-600 bg-slate-100'
                  }`}
                >
                  Del catálogo
                </button>
                <button
                  onClick={() => setUseCustomPrice(true)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    useCustomPrice ? 'bg-[#003B95] text-white' : 'text-slate-600 bg-slate-100'
                  }`}
                >
                  Monto libre
                </button>
              </div>
            </div>

            {!useCustomPrice ? (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase">Selecciona el modelo:</label>
                <select
                  value={selectedPhoneId}
                  onChange={(e) => setSelectedPhoneId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-white focus:ring-2 focus:ring-[#003B95]"
                >
                  {CATALOGO_SMARTPHONES.map(phone => (
                    <option key={phone.id} value={phone.id}>
                      {phone.modelo} — Contado: {phone.precio_contado}
                    </option>
                  ))}
                </select>

                {activePhone && (
                  <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <img
                      src={activePhone.imagen}
                      alt={activePhone.modelo}
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 truncate">{activePhone.modelo}</h4>
                      <p className="text-xs text-slate-500">{activePhone.specs.camara_principal}</p>
                      <span className="text-xs font-black text-[#003B95]">{activePhone.precio_contado}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-600">Precio de Contado en Tienda:</span>
                  <span className="text-lg font-black text-[#003B95]">${customPrice.toLocaleString('es-MX')} MXN</span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="25000"
                  step="250"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="w-full accent-[#003B95] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                  <span>$2,500 MXN</span>
                  <span>$12,000 MXN</span>
                  <span>$25,000 MXN</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Select Plazo */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#003B95] text-white text-xs flex items-center justify-center font-bold">2</span>
              Plazo de Pago (Quincenas)
            </h2>
            <p className="text-xs text-slate-500">
              En Coppel los plazos más populares para telefonía móvil son 24 y 36 quincenas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[16, 24, 36, 48].map((plazo) => (
                <button
                  key={plazo}
                  onClick={() => setPlazoQuincenas(plazo)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    plazoQuincenas === plazo
                      ? 'bg-[#003B95] text-white border-[#003B95] shadow-md ring-2 ring-blue-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-lg font-black block">{plazo}</span>
                  <span className="text-[11px] font-bold block opacity-90">quincenas</span>
                  <span className="text-[10px] block opacity-75 mt-0.5">
                    ({plazo / 2} meses)
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Optional Down Payment (Enganche) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#003B95] text-white text-xs flex items-center justify-center font-bold">3</span>
                Pago Inicial / Enganche (Opcional)
              </h2>
              <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-yellow-200">
                {enganchePorcentaje}% (${calculations.enganche.toLocaleString('es-MX')} MXN)
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Con buen historial en Coppel puedes llevarte tu equipo sin dar enganche (0%). Dar un anticipo reduce tu abono quincenal.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[0, 10, 20, 30].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setEnganchePorcentaje(pct)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    enganchePorcentaje === pct
                      ? 'bg-[#FED400] text-slate-950 border-[#FED400] font-black'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct === 0 ? 'Sin Enganche' : `${pct}%`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Breakdown Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-[#003B95] to-[#002260] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-900">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FED400]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Highlight Quincenal */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
                <span className="text-xs uppercase font-extrabold text-[#FED400] tracking-wider block">
                  Tu Abono Quincenal Estimado
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  ${calculations.abonoQuincenal.toLocaleString('es-MX')} <span className="text-lg font-bold text-[#FED400]">MXN</span>
                </div>
                <span className="text-xs text-slate-300 font-medium block mt-1">
                  a {calculations.plazoQuincenas} quincenas fijas
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Precio de Contado Oficial:</span>
                  <span className="font-extrabold text-white">${calculations.precioEfectivo.toLocaleString('es-MX')} MXN</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Enganche inicial ({enganchePorcentaje}%):</span>
                  <span className="font-extrabold text-[#FED400]">${calculations.enganche.toLocaleString('es-MX')} MXN</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Monto financiado:</span>
                  <span className="font-extrabold text-white">${calculations.montoAFinanciar.toLocaleString('es-MX')} MXN</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Total a pagar con crédito:</span>
                  <span className="font-extrabold text-white">${calculations.totalCredito.toLocaleString('es-MX')} MXN</span>
                </div>
              </div>

              {/* Liquidación anticipada note */}
              <div className="bg-[#FED400] text-slate-950 p-4 rounded-2xl flex items-start gap-3 shadow-md">
                <Sparkles className="w-5 h-5 text-[#003B95] flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="block font-black text-slate-900">¡Ahorras si liquidas antes!</strong>
                  En Coppel puedes liquidar antes de las {calculations.plazoQuincenas} quincenas y te ahorras los intereses de los plazos restantes.
                </div>
              </div>

              {/* Requisitos Coppel */}
              <div className="pt-2 text-xs text-slate-300 space-y-2">
                <span className="font-bold uppercase tracking-wider text-white block">Requisitos en Coppel:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Identificación oficial (INE/IFE o Pasaporte)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Comprobante de domicilio reciente</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mayor de 16 años (con tutor) o mayor de 18 años</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
