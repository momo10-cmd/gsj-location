import React, { useState } from 'react';
import { ArrowRight, Star, Zap, Gauge, Users, Check } from 'lucide-react';
import { Vehicle, Currency, formatPricePerDay } from '../data/fleetData';

interface TrendVehiclesProps {
  vehicles: Vehicle[];
  currency: Currency;
  selectedCategory: string | null;
  onClearCategoryFilter: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
}

export const TrendVehicles: React.FC<TrendVehiclesProps> = ({
  vehicles,
  currency,
  selectedCategory,
  onClearCategoryFilter,
  onBookVehicle,
}) => {
  const [showAllVehicles, setShowAllVehicles] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Supercar' | 'Grand SUV' | 'Van & Minibus' | 'Berline' | 'Pick-Up'>('All');

  // Filter logic: only among the 10 vehicles
  const filteredVehicles = vehicles.filter((v) => {
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'Berline_PickUp') {
        if (v.category !== 'Berline' && v.category !== 'Pick-Up') return false;
      } else if (v.category !== selectedCategory) {
        return false;
      }
    }
    if (activeTab !== 'All' && v.category !== activeTab) {
      return false;
    }
    return true;
  });

  const displayedList = showAllVehicles ? filteredVehicles : filteredVehicles.slice(0, 4);

  return (
    <section id="fleet" className="py-8 sm:py-14 bg-[#FAFAFA] border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête centré sur mobile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-6 sm:mb-8 text-center sm:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
                Véhicules tendance
              </h2>
              {selectedCategory && selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100/80 backdrop-blur-md text-sky-800 text-xs font-semibold rounded-full border border-sky-200">
                  <span>Filtre : {selectedCategory}</span>
                  <button
                    onClick={onClearCategoryFilter}
                    className="hover:text-red-600 font-bold ml-1 active:scale-90"
                    title="Effacer le filtre"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Les 10 modèles exclusifs de notre parc automobile disponibles avec chauffeur ou conduite autonome à Abidjan
            </p>
          </div>

          {/* Bouton droite : Glassmorphism éclatant */}
          <button
            onClick={() => setShowAllVehicles(!showAllVehicles)}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-btn-primary text-white text-xs sm:text-sm font-semibold rounded-full transition-all active:scale-95 shadow-md"
          >
            <span>{showAllVehicles ? 'Réduire la liste' : 'Voir les 10 voitures'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Onglets de filtrage avec Glassmorphism */}
        <div className="flex items-center justify-start sm:justify-center lg:justify-start gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'All', label: 'Toutes les voitures (10)' },
            { id: 'Supercar', label: 'Supercar & Prestige' },
            { id: 'Grand SUV', label: 'Grands SUV & 4x4' },
            { id: 'Van & Minibus', label: 'Vans & Minibus VIP' },
            { id: 'Berline', label: 'Berline' },
            { id: 'Pick-Up', label: 'Pick-Up 4x4' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all active:scale-95 ${
                activeTab === tab.id
                  ? 'glass-btn-dark text-white shadow-md'
                  : 'glass-btn-light text-slate-700 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grille des cartes de véhicules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedList.map((car, index) => {
            const isHighlight = car.highlightCard || (index === 0 && !selectedCategory && activeTab === 'All');

            return (
              <div
                key={car.id}
                className={`group rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isHighlight
                    ? 'bg-[#E2EEFF]/90 backdrop-blur-md border border-blue-200/80 shadow-xs'
                    : 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs'
                }`}
              >
                {/* Haut : Nom & Catégorie */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 tracking-tight font-display">
                        {car.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-medium">
                        <span>{car.brand}</span>
                        <span>·</span>
                        <span>{car.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50/80 backdrop-blur-xs px-2 py-0.5 rounded-lg border border-amber-200/50">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{car.rating}</span>
                    </div>
                  </div>

                  {/* Photo du véhicule */}
                  <div className="relative my-3 sm:my-4 h-36 sm:h-40 flex items-center justify-center overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = 'true';
                          const filename = target.src.split('/').pop()?.split('?')[0];
                          if (filename) target.src = `/images/${filename}`;
                        }
                      }}
                    />
                  </div>

                  {/* Micro Caractéristiques */}
                  <div className="grid grid-cols-3 gap-1 py-2 my-1.5 border-t border-b border-black/5 text-[10px] text-slate-600">
                    <div className="flex items-center gap-1" title="Puissance">
                      <Zap className="w-3 h-3 text-[#00AEEF] shrink-0" />
                      <span className="truncate">{car.specs.power.split(' ')[0]} ch</span>
                    </div>
                    <div className="flex items-center gap-1" title="Accélération">
                      <Gauge className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{car.specs.acceleration.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1" title="Nombre de places">
                      <Users className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{car.specs.seats} pl.</span>
                    </div>
                  </div>
                </div>

                {/* Bas : Tarif à gauche et Bouton Réserver Glassmorphic à droite */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-950 font-display tabular-nums">
                      {formatPricePerDay(car.pricePerDayUSD, currency)}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Dispo Abidjan
                    </span>
                  </div>

                  <button
                    onClick={() => onBookVehicle(car)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all active:scale-95 shadow-sm ${
                      isHighlight
                        ? 'glass-btn-dark text-white hover:glass-btn-cyan'
                        : 'glass-btn-light text-slate-900 hover:glass-btn-cyan hover:text-white'
                    }`}
                  >
                    Réserver
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message si aucun résultat */}
        {displayedList.length === 0 && (
          <div className="text-center py-10 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200">
            <p className="text-slate-600 font-medium text-xs sm:text-sm">
              Aucun véhicule trouvé dans cette catégorie.
            </p>
            <button
              onClick={() => {
                onClearCategoryFilter();
                setActiveTab('All');
              }}
              className="mt-3 px-4 py-2 glass-btn-cyan text-white text-xs font-semibold rounded-full active:scale-95"
            >
              Afficher toute notre flotte
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
