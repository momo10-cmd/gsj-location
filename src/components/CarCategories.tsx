import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CAR_CATEGORIES, CategoryInfo } from '../data/fleetData';

interface CarCategoriesProps {
  onSelectCategory: (categoryKey: string) => void;
  selectedCategory: string | null;
}

export const CarCategories: React.FC<CarCategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section id="categories" className="py-8 sm:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre centré sur mobile */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-3 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
              Catégories de véhicules
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Sélectionnez un univers pour filtrer nos 10 véhicules exclusifs disponibles à Abidjan
            </p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory('all')}
              className="px-3.5 py-1.5 glass-btn-light rounded-full text-xs font-semibold text-[#00AEEF] hover:text-sky-600 transition-all active:scale-95"
            >
              Afficher toute la flotte (10 véhicules)
            </button>
          )}
        </div>

        {/* Grille des 4 cartes verticales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CAR_CATEGORIES.map((cat: CategoryInfo, index: number) => {
            const isSelected = selectedCategory === cat.categoryKey;
            const isFirst = index === 0;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.categoryKey)}
                className={`group relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected ? 'ring-3 ring-[#00AEEF] ring-offset-2' : ''
                }`}
              >
                {/* Image d'arrière-plan */}
                <div className="absolute inset-0 bg-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75" />
                </div>

                {/* Nom en haut à gauche */}
                <div className="absolute top-5 left-5 z-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight whitespace-pre-line tracking-tight drop-shadow-sm font-display">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-white/80 font-medium">
                    {cat.count} véhicule{cat.count > 1 ? 's' : ''} disponible{cat.count > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Bouton rond avec Glassmorphism en bas à droite */}
                <div className="absolute bottom-5 right-5 z-10">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group-hover:scale-110 active:scale-95 ${
                      isFirst
                        ? 'glass-btn-primary text-white'
                        : 'glass-btn-light text-slate-900 group-hover:glass-btn-cyan group-hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Descriptif en bas */}
                <div className="absolute bottom-5 left-5 z-10 max-w-[65%] opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
