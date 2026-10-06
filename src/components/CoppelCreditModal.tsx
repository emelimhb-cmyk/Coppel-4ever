import React from 'react';
import {
  X,
  CreditCard,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Store,
  DollarSign,
  Gift
} from 'lucide-react';

interface CoppelCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoppelCreditModal: React.FC<CoppelCreditModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#003B95] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FED400] text-[#003B95] flex items-center justify-center font-black text-xl">
              C
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">¿Cómo funciona el Crédito Coppel?</h3>
              <p className="text-xs text-slate-200">Mejora tu vida estrenando tu smartphone ideal hoy mismo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Steps */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#003B95] tracking-wider mb-3">
              3 Pasos para estrenar en Coppel
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-center">
                <span className="w-7 h-7 rounded-full bg-[#003B95] text-white text-xs font-black mx-auto flex items-center justify-center mb-2">1</span>
                <h5 className="font-extrabold text-xs text-slate-900">Solicita tu crédito</h5>
                <p className="text-[11px] text-slate-500 mt-1">En línea o en cualquier tienda con tu INE y comprobante.</p>
              </div>

              <div className="p-4 rounded-2xl bg-yellow-50/60 border border-yellow-200 text-center">
                <span className="w-7 h-7 rounded-full bg-[#FED400] text-slate-950 text-xs font-black mx-auto flex items-center justify-center mb-2">2</span>
                <h5 className="font-extrabold text-xs text-slate-900">Elige tu Smartphone</h5>
                <p className="text-[11px] text-slate-500 mt-1">Con abonos quincenales a 24 o 36 quincenas.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black mx-auto flex items-center justify-center mb-2">3</span>
                <h5 className="font-extrabold text-xs text-slate-900">Paga cada quincena</h5>
                <p className="text-[11px] text-slate-500 mt-1">Desde la App Coppel, OXXO, cajeros o tiendas físicas.</p>
              </div>
            </div>
          </div>

          {/* Gran Beneficio: Liquidación Anticipada */}
          <div className="p-4 rounded-2xl bg-[#FED400]/20 border border-yellow-300">
            <div className="flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                  Beneficio de Liquidación Anticipada
                </h4>
                <p className="text-xs text-slate-700 mt-1">
                  En Coppel, si tienes un plazo a 24 o 36 quincenas pero decides liquidar antes, <strong>se te descuentan los intereses de las quincenas no transcurridas</strong>. ¡Pagas menos si terminas de pagar más rápido!
                </p>
              </div>
            </div>
          </div>

          {/* Requisitos Oficiales */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              Requisitos mínimos en México
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ser mayor de 16 años (con aval familiar) o mayor de 18 años.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Identificación oficial vigente (INE o pasaporte).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Comprobante de domicilio (luz, agua o predial con no más de 3 meses).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Sin cobro de anualidad de por vida en la tarjeta departamental Coppel.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="bg-[#003B95] text-white font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-blue-900 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
