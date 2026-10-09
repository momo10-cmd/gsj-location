import React, { useState } from 'react';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { FLEET_VEHICLES, Vehicle, Currency, formatPricePerDay } from '../data/fleetData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectVehicle,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = FLEET_VEHICLES.filter((car) => {
    const q = query.toLowerCase();
    return (
      car.name.toLowerCase().includes(q) ||
      car.brand.toLowerCase().includes(q) ||
      car.category.toLowerCase().includes(q) ||
      car.specs.fuel.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Champ de recherche */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher par modèle (Urus, Tahoe 2025, Classe V, Prado, Bestune, Sprinter...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 text-xs"
            >
              Effacer
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-btn-light flex items-center justify-center text-slate-600 active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filtres rapides par marque des 10 véhicules */}
        <div className="px-4 py-2.5 bg-slate-50/80 backdrop-blur-md border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] font-semibold whitespace-nowrap">Marques :</span>
          {['Lamborghini', 'Chevrolet', 'Mercedes-Benz', 'Toyota', 'Bestune', 'Kia', 'Buick', 'Changan'].map((brand) => (
            <button
              key={brand}
              onClick={() => setQuery(brand)}
              className="px-3 py-1.5 glass-btn-light rounded-full text-slate-700 hover:text-[#00AEEF] font-semibold transition-all active:scale-95 whitespace-nowrap"
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Liste des résultats */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          {filtered.length > 0 ? (
            filtered.map((car) => (
              <div
                key={car.id}
                onClick={() => {
                  onSelectVehicle(car);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-sky-50/60 border border-transparent hover:border-sky-200 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 bg-slate-100 rounded-xl flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-900 group-hover:text-[#00AEEF] transition-colors font-display">
                      {car.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{car.brand}</span>
                      <span>·</span>
                      <span>{car.category}</span>
                      <span>·</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Dispo Abidjan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-black text-slate-900 font-display">
                      {formatPricePerDay(car.pricePerDayUSD, currency)}
                    </div>
                    <div className="text-[10px] text-slate-400">{car.specs.power}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#00AEEF] group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              Aucun véhicule disponible ne correspond à « {query} » parmi nos 10 modèles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
