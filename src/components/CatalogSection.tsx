import React, { useState, useMemo } from 'react';
import { type Smartphone as SmartphoneItem, CATALOGO_SMARTPHONES } from '../data/phonesData.ts';
import {
  Search,
  SlidersHorizontal,
  CreditCard,
  Scale,
  Eye,
  Camera,
  Battery,
  Cpu,
  Sparkles,
  Check,
  Flame,
  Smartphone
} from 'lucide-react';

interface CatalogSectionProps {
  onSelectPhone: (phone: SmartphoneItem) => void;
  onSimulateCredit: (phone: SmartphoneItem) => void;
  onAddToCompare: (phone: SmartphoneItem) => void;
  compareList: SmartphoneItem[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectPhone,
  onSimulateCredit,
  onAddToCompare,
  compareList,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [maxAbono, setMaxAbono] = useState<number>(650);
  const [sortBy, setSortBy] = useState<'abono_asc' | 'precio_asc' | 'conciertos' | 'bateria'>('conciertos');

  const brands = ['all', 'Samsung', 'Motorola', 'Xiaomi', 'Honor', 'POCO', 'Apple'];

  const filteredPhones = useMemo(() => {
    return CATALOGO_SMARTPHONES.filter(phone => {
      // Search term
      const matchesSearch =
        phone.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.specs.camara_principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.specs.procesador.toLowerCase().includes(searchTerm.toLowerCase());

      // Brand filter
      const matchesBrand = selectedBrand === 'all' || phone.marca === selectedBrand;

      // Abono filter (matches 24 or 36 quincenas installment under max)
      const lowestAbono = Math.min(...phone.abono_quincenal_estimado.map(a => a.monto_num));
      const matchesAbono = lowestAbono <= maxAbono;

      return matchesSearch && matchesBrand && matchesAbono;
    }).sort((a, b) => {
      if (sortBy === 'abono_asc') {
        const abonoA = a.abono_quincenal_estimado[0].monto_num;
        const abonoB = b.abono_quincenal_estimado[0].monto_num;
        return abonoA - abonoB;
      }
      if (sortBy === 'precio_asc') {
        return a.precio_contado_num - b.precio_contado_num;
      }
      if (sortBy === 'conciertos') {
        return b.puntuacion_uso.conciertos_noche - a.puntuacion_uso.conciertos_noche;
      }
      if (sortBy === 'bateria') {
        return b.puntuacion_uso.bateria_duracion - a.puntuacion_uso.bateria_duracion;
      }
      return 0;
    });
  }, [searchTerm, selectedBrand, maxAbono, sortBy]);

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Catalog Title Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#003B95] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Telefonía Celular Coppel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Catálogo de Smartphones Disponibles
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Precios oficiales de contado en México y cotización con Crédito Coppel a 24 y 36 quincenas.
          </p>
        </div>

        {/* Global info pill */}
        <div className="flex items-center gap-3 bg-amber-50 border border-yellow-200 p-3.5 rounded-2xl flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#FED400] text-slate-900 flex items-center justify-center font-black">
            $
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-500 block">Abonos desde</span>
            <span className="text-lg font-black text-[#003B95]">$182 MXN / quincena</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="relative md:col-span-5">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por modelo, 200MP, Snapdragon..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#003B95] focus:border-transparent font-medium"
            />
          </div>

          {/* Abono Quincenal Slider */}
          <div className="md:col-span-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-slate-600">Abono Quincenal Máximo:</span>
              <span className="text-[#003B95] font-black">${maxAbono} MXN</span>
            </div>
            <input
              type="range"
              min="200"
              max="700"
              step="20"
              value={maxAbono}
              onChange={(e) => setMaxAbono(Number(e.target.value))}
              className="w-full accent-[#003B95] cursor-pointer"
            />
          </div>

          {/* Sort By Select */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#003B95]"
            >
              <option value="conciertos">🎸 Mejor para Conciertos</option>
              <option value="abono_asc">💵 Abono Más Económico</option>
              <option value="bateria">🔋 Mayor Batería</option>
              <option value="precio_asc">🏷️ Precio Contado Más Bajo</option>
            </select>
          </div>
        </div>

        {/* Brand Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 mr-1">Marca:</span>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBrand === brand
                  ? 'bg-[#003B95] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {brand === 'all' ? 'Todas las marcas' : brand}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
        <span>Mostrando {filteredPhones.length} smartphones en inventario</span>
        <span>Crédito sujeto a aprobación Coppel</span>
      </div>

      {/* Grid of Phones */}
      {filteredPhones.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-extrabold text-slate-800 text-lg">No encontramos equipos con esos filtros</h3>
          <p className="text-sm text-slate-500 mt-1">Intenta aumentar el abono quincenal máximo o buscar otra marca.</p>
          <button
            onClick={() => {
              setMaxAbono(700);
              setSelectedBrand('all');
              setSearchTerm('');
            }}
            className="mt-4 bg-[#003B95] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhones.map((phone) => {
            const isCompared = compareList.some(c => c.id === phone.id);
            return (
              <div
                key={phone.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Header Tag */}
                <div className="p-3 pb-0 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#003B95] px-2 py-0.5 rounded-md border border-blue-100">
                    {phone.marca}
                  </span>
                  {phone.etiqueta_destacada && (
                    <span className="text-[10px] font-extrabold bg-[#FED400] text-slate-900 px-2 py-0.5 rounded-md">
                      {phone.etiqueta_destacada}
                    </span>
                  )}
                </div>

                {/* Phone Image */}
                <div className="p-4 pt-2">
                  <div className="h-44 rounded-2xl overflow-hidden bg-slate-50 relative group-hover:scale-[1.02] transition-transform">
                    <img
                      src={phone.imagen}
                      alt={phone.modelo}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {phone.specs.conectividad}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mt-3 group-hover:text-[#003B95] transition-colors line-clamp-1">
                    {phone.modelo}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Contado:</span>
                    <span className="text-base font-black text-slate-900">
                      {phone.precio_contado}
                    </span>
                  </div>
                </div>

                {/* Biweekly Installment Highlight Box */}
                <div className="mx-4 p-3 rounded-2xl bg-amber-50/80 border border-yellow-200 mb-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span className="flex items-center gap-1 text-[#003B95]">
                      <CreditCard className="w-3.5 h-3.5 text-amber-600" /> Abono Coppel:
                    </span>
                    <span className="text-amber-800 bg-[#FED400] text-[10px] font-black px-1.5 py-0.2 rounded">
                      Quincenal
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">a 24 quincenas:</span>
                      <span className="text-base font-black text-slate-900">
                        {phone.abono_quincenal_estimado[0].monto}
                      </span>
                    </div>
                    {phone.abono_quincenal_estimado[1] && (
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block font-medium">a 36 quincenas:</span>
                        <span className="text-sm font-extrabold text-[#003B95]">
                          {phone.abono_quincenal_estimado[1].monto}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key Specs Pills */}
                <div className="px-4 pb-3 flex-1 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                    <Camera className="w-3.5 h-3.5 text-[#003B95] flex-shrink-0" />
                    <span className="truncate">{phone.specs.camara_principal}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg">
                    <Battery className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{phone.specs.bateria} • {phone.specs.carga_rapida}</span>
                  </div>
                </div>

                {/* Buttons footer */}
                <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/60 mt-auto space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectPhone(phone)}
                      className="bg-[#003B95] hover:bg-blue-900 text-white font-bold text-xs py-2 px-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-[#FED400]" />
                      <span>Detalles</span>
                    </button>
                    <button
                      onClick={() => onSimulateCredit(phone)}
                      className="bg-[#FED400] hover:bg-yellow-400 text-slate-900 font-extrabold text-xs py-2 px-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CreditCard className="w-3 h-3 text-[#003B95]" />
                      <span>Simular</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onAddToCompare(phone)}
                    className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 border ${
                      isCompared
                        ? 'bg-blue-50 text-[#003B95] border-blue-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>{isCompared ? '✓ Comparando' : '+ Comparar'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
