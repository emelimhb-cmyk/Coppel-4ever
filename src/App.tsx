import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { AsesorSection } from './components/AsesorSection.tsx';
import { CatalogSection } from './components/CatalogSection.tsx';
import { CreditSimulator } from './components/CreditSimulator.tsx';
import { PhoneComparator } from './components/PhoneComparator.tsx';
import { PhoneDetailModal } from './components/PhoneDetailModal.tsx';
import { CoppelCreditModal } from './components/CoppelCreditModal.tsx';
import { type Smartphone, CATALOGO_SMARTPHONES } from './data/phonesData.ts';
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  Truck,
  Heart,
  HelpCircle,
  PhoneCall,
  Store,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'asesor' | 'catalogo' | 'simulador' | 'comparador'>('asesor');
  const [selectedPhone, setSelectedPhone] = useState<Smartphone | null>(null);
  const [phoneForCredit, setPhoneForCredit] = useState<Smartphone | null>(CATALOGO_SMARTPHONES[0]);
  const [compareList, setCompareList] = useState<Smartphone[]>([
    CATALOGO_SMARTPHONES[0], // Samsung A55
    CATALOGO_SMARTPHONES[1], // Moto Edge 50 Fusion
    CATALOGO_SMARTPHONES[2], // Redmi Note 13 Pro+
  ]);
  const [showCreditInfo, setShowCreditInfo] = useState(false);

  // Handlers
  const handleOpenDetail = (phone: Smartphone) => {
    setSelectedPhone(phone);
  };

  const handleSimulateCredit = (phone: Smartphone) => {
    setPhoneForCredit(phone);
    setActiveTab('simulador');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompare = (phone: Smartphone) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === phone.id);
      if (exists) {
        return prev.filter(p => p.id !== phone.id);
      } else {
        if (prev.length >= 3) {
          // Replace last one or keep max 3
          return [...prev.slice(1), phone];
        }
        return [...prev, phone];
      }
    });
  };

  const handleRemoveFromCompare = (phoneId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== phoneId));
  };

  const handleAddFromCatalogToCompare = (phone: Smartphone) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === phone.id)) return prev;
      if (prev.length >= 3) {
        return [...prev.slice(1), phone];
      }
      return [...prev, phone];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#FED400] selection:text-[#003B95]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={compareList.length}
        onOpenCreditInfo={() => setShowCreditInfo(true)}
      />

      {/* Main Content by Tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'asesor' && (
          <AsesorSection
            onSelectPhone={handleOpenDetail}
            onSimulateCredit={handleSimulateCredit}
            onAddToCompare={handleToggleCompare}
            compareList={compareList}
          />
        )}

        {activeTab === 'catalogo' && (
          <CatalogSection
            onSelectPhone={handleOpenDetail}
            onSimulateCredit={handleSimulateCredit}
            onAddToCompare={handleToggleCompare}
            compareList={compareList}
          />
        )}

        {activeTab === 'simulador' && (
          <CreditSimulator
            initialPhone={phoneForCredit}
            onSelectPhone={handleOpenDetail}
          />
        )}

        {activeTab === 'comparador' && (
          <PhoneComparator
            compareList={compareList}
            onRemoveFromCompare={handleRemoveFromCompare}
            onSelectPhone={handleOpenDetail}
            onSimulateCredit={handleSimulateCredit}
            onAddFromCatalog={handleAddFromCatalogToCompare}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#002255] text-slate-300 mt-16 border-t border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FED400] text-[#003B95] font-black text-lg flex items-center justify-center">
                  C
                </div>
                <span className="font-black text-xl text-white">Coppel 4ever</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Asesor oficial de smartphones y cotizador de crédito con abonos quincenales para toda la República Mexicana.
              </p>
              <div className="flex items-center gap-2 pt-2 text-[#FED400] text-xs font-bold">
                <Truck className="w-4 h-4" /> Envío sin costo en compras en línea
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Crédito Coppel</h4>
              <p className="hover:text-white cursor-pointer" onClick={() => setShowCreditInfo(true)}>
                ¿Cómo funciona el Crédito Coppel?
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setActiveTab('simulador')}>
                Simulador de Abonos Quincenales
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setShowCreditInfo(true)}>
                Beneficios de Liquidación Anticipada
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setShowCreditInfo(true)}>
                Requisitos para trámite en tienda
              </p>
            </div>

            {/* Col 3 */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider mb-2">Telefonía Celular</h4>
              <p className="hover:text-white cursor-pointer" onClick={() => setActiveTab('catalogo')}>
                Smartphones Samsung Galaxy
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setActiveTab('catalogo')}>
                Smartphones Motorola Edge y Moto G
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setActiveTab('catalogo')}>
                Xiaomi Redmi y POCO 5G
              </p>
              <p className="hover:text-white cursor-pointer" onClick={() => setActiveTab('catalogo')}>
                Apple iPhone con Crédito Coppel
              </p>
            </div>

            {/* Col 4 */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider">Atención Coppel</h4>
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-[#FED400]" />
                <span>800 220 7735 (Línea Gratuita)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Store className="w-4 h-4 text-[#FED400]" />
                <span>Más de 1,700 tiendas en México</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Válido en tiendas Coppel de la República Mexicana. Abonos calculados a 24 o 36 quincenas con Crédito Coppel sujeto a aprobación.
              </p>
            </div>
          </div>

          <div className="border-t border-blue-900/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© 2026 Coppel 4ever: Tu Smartphone Ideal. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con pasión para clientes Coppel en México
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PhoneDetailModal
        phone={selectedPhone}
        onClose={() => setSelectedPhone(null)}
        onSimulateCredit={handleSimulateCredit}
      />

      <CoppelCreditModal
        isOpen={showCreditInfo}
        onClose={() => setShowCreditInfo(false)}
      />
    </div>
  );
}
