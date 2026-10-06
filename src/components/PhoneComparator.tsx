import React from 'react';
import { type Smartphone, CATALOGO_SMARTPHONES } from '../data/phonesData.ts';
import {
  Scale,
  X,
  CreditCard,
  Camera,
  Battery,
  Cpu,
  Layers,
  Sparkles,
  Eye,
  PlusCircle,
  Check
} from 'lucide-react';

interface PhoneComparatorProps {
  compareList: Smartphone[];
  onRemoveFromCompare: (phoneId: string) => void;
  onSelectPhone: (phone: Smartphone) => void;
  onSimulateCredit: (phone: Smartphone) => void;
  onAddFromCatalog: (phone: Smartphone) => void;
}

export const PhoneComparator: React.FC<PhoneComparatorProps> = ({
  compareList,
  onRemoveFromCompare,
  onSelectPhone,
  onSimulateCredit,
  onAddFromCatalog,
}) => {
  // If list is empty, default with popular options
  const displayedPhones = compareList.length > 0
    ? compareList
    : [CATALOGO_SMARTPHONES[0], CATALOGO_SMARTPHONES[1], CATALOGO_SMARTPHONES[2]];

  const remainingCatalog = CATALOGO_SMARTPHONES.filter(
    p => !displayedPhones.some(dp => dp.id === p.id)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#003B95] bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
            <Scale className="w-3.5 h-3.5 text-[#003B95]" /> Frente a Frente
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Comparador de Smartphones Coppel
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Compara cámaras, batería, precio de contado y abonos quincenales para tomar la mejor decisión.
          </p>
        </div>

        {/* Add phone quick picker */}
        {displayedPhones.length < 3 && remainingCatalog.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                const found = CATALOGO_SMARTPHONES.find(p => p.id === e.target.value);
                if (found) onAddFromCatalog(found);
                e.target.value = '';
              }}
              defaultValue=""
              className="bg-[#FED400] text-slate-950 font-bold text-xs py-2 px-3 rounded-xl border-none shadow cursor-pointer focus:ring-2 focus:ring-[#003B95]"
            >
              <option value="" disabled>+ Agregar otro celular a comparar...</option>
              {remainingCatalog.map(p => (
                <option key={p.id} value={p.id}>{p.modelo}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60">
              <th className="p-4 sm:p-6 w-1/4 font-extrabold text-xs uppercase text-slate-400">
                Características
              </th>
              {displayedPhones.map((phone) => (
                <th key={phone.id} className="p-4 sm:p-6 w-1/4 align-top">
                  <div className="relative space-y-3">
                    {displayedPhones.length > 1 && (
                      <button
                        onClick={() => onRemoveFromCompare(phone.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                        title="Quitar de comparación"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="h-32 rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={phone.imagen}
                        alt={phone.modelo}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#003B95] uppercase bg-blue-50 px-2 py-0.5 rounded">
                        {phone.marca}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1 line-clamp-2">
                        {phone.modelo}
                      </h3>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Precio de Contado */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Precio de Contado Oficial
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-black text-slate-900 text-base sm:text-lg">
                  {phone.precio_contado}
                </td>
              ))}
            </tr>

            {/* Abono 24 quincenas */}
            <tr className="bg-yellow-50/30">
              <td className="p-4 sm:p-5 font-bold text-[#003B95]">
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  <span>Abono Quincenal (24 plazos)</span>
                </div>
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-black text-slate-900">
                  <span className="text-base text-amber-900 bg-[#FED400] px-2 py-1 rounded-lg">
                    {phone.abono_quincenal_estimado[0].monto}
                  </span>
                  <span className="text-xs text-slate-500 block mt-1">cada 15 días</span>
                </td>
              ))}
            </tr>

            {/* Abono 36 quincenas */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Abono Quincenal (36 plazos)
              </td>
              {displayedPhones.map((phone) => {
                const abono36 = phone.abono_quincenal_estimado.find(a => a.plazo.includes('36')) || phone.abono_quincenal_estimado[1];
                return (
                  <td key={phone.id} className="p-4 sm:p-5 font-extrabold text-[#003B95]">
                    {abono36 ? abono36.monto : 'Consultar'}
                  </td>
                );
              })}
            </tr>

            {/* Cámara Principal */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#003B95]" />
                  <span>Cámara Principal</span>
                </div>
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-medium text-slate-700">
                  {phone.specs.camara_principal}
                </td>
              ))}
            </tr>

            {/* Cámara Frontal */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Cámara Frontal (Selfies)
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-medium text-slate-700">
                  {phone.specs.camara_frontal}
                </td>
              ))}
            </tr>

            {/* Batería y Carga */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                <div className="flex items-center gap-1.5">
                  <Battery className="w-4 h-4 text-emerald-600" />
                  <span>Batería y Carga</span>
                </div>
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 text-slate-700">
                  <span className="font-extrabold block text-slate-900">{phone.specs.bateria}</span>
                  <span className="text-xs text-slate-500">{phone.specs.carga_rapida}</span>
                </td>
              ))}
            </tr>

            {/* Pantalla */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Pantalla
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-medium text-slate-700">
                  {phone.specs.pantalla}
                </td>
              ))}
            </tr>

            {/* Procesador y Memoria */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span>Procesador y RAM</span>
                </div>
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 text-slate-700">
                  <span className="font-extrabold block text-slate-900">{phone.specs.procesador}</span>
                  <span className="text-xs text-slate-500">{phone.specs.ram_rom}</span>
                </td>
              ))}
            </tr>

            {/* Resistencia al agua */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Resistencia
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 font-semibold text-slate-700">
                  {phone.specs.resistencia}
                </td>
              ))}
            </tr>

            {/* Calificación Conciertos */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Calificación Conciertos 🎸
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-full h-2 max-w-[120px] overflow-hidden">
                      <div
                        className="bg-[#003B95] h-full rounded-full"
                        style={{ width: `${phone.puntuacion_uso.conciertos_noche}%` }}
                      />
                    </div>
                    <span className="font-black text-slate-900 text-xs">
                      {phone.puntuacion_uso.conciertos_noche}/100
                    </span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Actions */}
            <tr>
              <td className="p-4 sm:p-5 font-bold text-slate-500 bg-slate-50/40">
                Acciones
              </td>
              {displayedPhones.map((phone) => (
                <td key={phone.id} className="p-4 sm:p-5 space-y-2">
                  <button
                    onClick={() => onSimulateCredit(phone)}
                    className="w-full bg-[#FED400] hover:bg-yellow-400 text-slate-950 font-extrabold text-xs py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#003B95]" />
                    <span>Simular Crédito</span>
                  </button>
                  <button
                    onClick={() => onSelectPhone(phone)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-1.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
