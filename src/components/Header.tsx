import React from 'react';
import { Smartphone, Sparkles, CreditCard, Scale, ShieldCheck, Truck, Store, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: 'asesor' | 'catalogo' | 'simulador' | 'comparador';
  setActiveTab: (tab: 'asesor' | 'catalogo' | 'simulador' | 'comparador') => void;
  compareCount: number;
  onOpenCreditInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  onOpenCreditInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Coppel */}
      <div className="bg-[#003B95] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-[#FED400]">
              <Sparkles className="w-3.5 h-3.5" /> Coppel 4ever: Tu Smartphone Ideal
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-200">
              <Truck className="w-3.5 h-3.5 text-[#FED400]" /> Envío gratis a todo México
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FED400]" /> Garantía Coppel 1 año
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreditInfo}
              className="text-xs bg-[#FED400] text-slate-900 font-bold px-2.5 py-0.5 rounded hover:bg-yellow-400 transition-colors flex items-center gap-1"
            >
              <CreditCard className="w-3 h-3" /> Pide tu Crédito Coppel
            </button>
            <span className="hidden sm:inline text-slate-300 text-xs">Abonos quincenales a 24 y 36 plazos</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('asesor')}>
            <div className="w-10 h-10 rounded-xl bg-[#FED400] flex items-center justify-center shadow-sm border border-yellow-400">
              <span className="font-black text-[#003B95] text-xl tracking-tighter">C</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-[#003B95]">Coppel</span>
                <span className="bg-[#FED400] text-[#003B95] text-[10px] font-black uppercase px-1.5 py-0.5 rounded tracking-wide">4ever</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-none">Tu Smartphone Ideal</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('asesor')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'asesor'
                  ? 'bg-[#003B95] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeTab === 'asesor' ? 'text-[#FED400]' : 'text-[#003B95]'}`} />
              <span>Asesor Inteligente</span>
            </button>

            <button
              onClick={() => setActiveTab('catalogo')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'catalogo'
                  ? 'bg-[#003B95] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Smartphone className={`w-4 h-4 ${activeTab === 'catalogo' ? 'text-[#FED400]' : 'text-[#003B95]'}`} />
              <span>Catálogo</span>
            </button>

            <button
              onClick={() => setActiveTab('simulador')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'simulador'
                  ? 'bg-[#003B95] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <CreditCard className={`w-4 h-4 ${activeTab === 'simulador' ? 'text-[#FED400]' : 'text-[#003B95]'}`} />
              <span className="hidden sm:inline">Simulador Crédito</span>
              <span className="sm:hidden">Crédito</span>
            </button>

            <button
              onClick={() => setActiveTab('comparador')}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'comparador'
                  ? 'bg-[#003B95] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Scale className={`w-4 h-4 ${activeTab === 'comparador' ? 'text-[#FED400]' : 'text-[#003B95]'}`} />
              <span className="hidden sm:inline">Comparar</span>
              {compareCount > 0 && (
                <span className="bg-[#FED400] text-slate-900 font-extrabold text-xs px-1.5 py-0.2 rounded-full">
                  {compareCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
