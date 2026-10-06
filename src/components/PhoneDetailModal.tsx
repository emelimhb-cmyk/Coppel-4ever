import React, { useState } from 'react';
import type { Smartphone } from '../data/phonesData.ts';
import {
  X,
  CreditCard,
  Camera,
  Battery,
  Cpu,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Printer,
  CheckCircle2,
  Calendar,
  Share2,
  Check
} from 'lucide-react';

interface PhoneDetailModalProps {
  phone: Smartphone | null;
  onClose: () => void;
  onSimulateCredit: (phone: Smartphone) => void;
}

export const PhoneDetailModal: React.FC<PhoneDetailModalProps> = ({
  phone,
  onClose,
  onSimulateCredit,
}) => {
  const [copied, setCopied] = useState(false);

  if (!phone) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQuote = () => {
    const text = `COTIZACIÓN COPPEL: ${phone.modelo}\n` +
      `Precio Contado: ${phone.precio_contado}\n` +
      `Abono Quincenal a 24 plazos: ${phone.abono_quincenal_estimado[0].monto}\n` +
      `Cámara: ${phone.specs.camara_principal}\n` +
      `Batería: ${phone.specs.bateria}\n` +
      `Válido en tiendas Coppel México`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#003B95] text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#FED400] text-slate-950 font-black text-xs px-2.5 py-1 rounded-md uppercase">
              {phone.marca}
            </span>
            <span className="text-xs text-slate-200 font-medium">Telefonía Oficial Coppel</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={phone.imagen}
                alt={phone.modelo}
                className="w-full h-full object-cover"
              />
              {phone.etiqueta_destacada && (
                <div className="absolute top-3 left-3 bg-[#FED400] text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow">
                  {phone.etiqueta_destacada}
                </div>
              )}
            </div>

            {/* Price & Installments Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{phone.modelo}</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Color: {phone.color_destacado}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase block">Precio de Contado</span>
                <span className="text-3xl font-black text-slate-900">{phone.precio_contado}</span>
              </div>

              {/* Installments Spotlight */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#003B95] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-600" /> Abonos con Crédito Coppel
                  </span>
                  <span className="text-[10px] font-bold text-amber-900 bg-[#FED400] px-2 py-0.5 rounded">
                    Quincenal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {phone.abono_quincenal_estimado.map((abono, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-yellow-200 text-center">
                      <span className="text-[10px] font-bold text-slate-400 block">{abono.plazo}</span>
                      <span className="text-lg font-black text-slate-900">{abono.monto}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why it's ideal block */}
          <div className="bg-blue-50/70 p-4.5 rounded-2xl border border-blue-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003B95] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-[#FED400]" /> ¿Por qué es tu smartphone ideal?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {phone.por_que_es_ideal}
            </p>
          </div>

          {/* Key Specs Table */}
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider">
              Ficha Técnica Detallada
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Cámara Trasera Principal</span>
                <span className="font-extrabold text-slate-800">{phone.specs.camara_principal}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Cámara Frontal</span>
                <span className="font-extrabold text-slate-800">{phone.specs.camara_frontal}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Batería y Carga Rápida</span>
                <span className="font-extrabold text-slate-800">{phone.specs.bateria} • {phone.specs.carga_rapida}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Pantalla</span>
                <span className="font-extrabold text-slate-800">{phone.specs.pantalla}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Procesador</span>
                <span className="font-extrabold text-slate-800">{phone.specs.procesador}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Memoria y Almacenamiento</span>
                <span className="font-extrabold text-slate-800">{phone.specs.ram_rom}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Protección y Resistencia</span>
                <span className="font-extrabold text-slate-800">{phone.specs.resistencia}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-400 block mb-1">Conectividad</span>
                <span className="font-extrabold text-slate-800">{phone.specs.conectividad}</span>
              </div>
            </div>
          </div>

          {/* Benefits at Coppel stores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <Truck className="w-4 h-4 text-[#003B95]" />
              <span className="text-xs font-bold text-slate-700">Envío Gratis a Domicilio</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#003B95]" />
              <span className="text-xs font-bold text-slate-700">1 Año de Garantía Oficial</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <RotateCcw className="w-4 h-4 text-[#003B95]" />
              <span className="text-xs font-bold text-slate-700">Cambio Físico en Tienda</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyQuote}
              className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-3.5 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copiada</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#003B95]" />
                  <span>Copiar Cotización</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-3.5 rounded-xl border border-slate-200 items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Imprimir Ficha</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onClose();
                onSimulateCredit(phone);
              }}
              className="bg-[#FED400] hover:bg-yellow-400 text-slate-950 font-black text-xs py-2.5 px-5 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#003B95]" />
              <span>Simular mi Crédito Coppel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
