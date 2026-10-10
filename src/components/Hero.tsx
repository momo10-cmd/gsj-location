import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ArrowRightLeft, Sparkles, Search } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/fleetData';
import heroUrusImg from '../assets/images/hero_urus_prestige_1791504709687.jpg';

export type BookingMode = 'Distance' | 'À l’heure' | 'Forfait Journée';

export interface SearchCriteria {
  mode: BookingMode;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
}

interface HeroProps {
  onSearch: (criteria: SearchCriteria) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [mode, setMode] = useState<BookingMode>('Forfait Journée');
  const [pickupLocation, setPickupLocation] = useState(POPULAR_LOCATIONS[0]);
  const [dropoffLocation, setDropoffLocation] = useState(POPULAR_LOCATIONS[1]);
  const [pickupDate, setPickupDate] = useState('2026-06-12');
  const [pickupTime, setPickupTime] = useState('13:00');

  const [showPickupList, setShowPickupList] = useState(false);
  const [showDropoffList, setShowDropoffList] = useState(false);

  const handleSwapLocations = (e: React.MouseEvent) => {
    e.stopPropagation();
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      mode,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
    });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-slate-950 pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Arrière-plan Lamborghini Urus & Pavillon de Prestige */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroUrusImg}
          alt="Lamborghini Urus GSJ Location Abidjan"
          className="w-full h-full object-cover object-center scale-[1.01]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = 'true';
              target.src = '/images/hero_urus_prestige_1791504709687.jpg';
            }
          }}
        />
        {/* Filtres de dégradé pour lisibilité parfaite */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-black/35" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloc Texte Principal : Centré sur mobile */}
        <div className="pt-6 sm:pt-10 pb-8 sm:pb-12 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6">
            {/* Titre Principal centré sur mobile */}
            <div className="w-full lg:max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/95 text-xs font-semibold uppercase tracking-wider border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" />
                <span>Excellence & Prestige · Abidjan</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance font-display mx-auto lg:mx-0">
                Location de voitures <br className="hidden sm:inline" />
                de prestige
              </h1>
            </div>

            {/* Paragraphe centré sur mobile */}
            <div className="w-full lg:max-w-md text-center lg:text-left">
              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal bg-black/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-3.5 lg:p-0 rounded-2xl border border-white/10 lg:border-0 mx-auto lg:mx-0">
                Vivez une expérience de location sans stress à Abidjan. Flotte exclusive de 10 véhicules avec chauffeur de sécurité bilingue, prise en charge aéroport et conciergerie 24h/24.
              </p>
            </div>
          </div>
        </div>

        {/* Barre de Réservation Glassmorphic sans espaces nuisibles */}
        <div className="w-full">
          {/* Onglets de mode avec effet Glassmorphism */}
          <div className="flex justify-center lg:justify-start mb-0">
            <div className="inline-flex p-1 bg-white/40 backdrop-blur-xl rounded-t-2xl border-t border-x border-white/50 shadow-sm gap-1">
              {(['Distance', 'À l’heure', 'Forfait Journée'] as BookingMode[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMode(tab)}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 ${
                    mode === tab
                      ? 'glass-btn-cyan text-white shadow-md'
                      : 'glass-btn-light text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Formulaire Principal avec Glassmorphism et espacements optimisés pour mobile */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-tl-none rounded-tr-2xl rounded-b-2xl shadow-2xl border border-white/70 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-2 items-center"
          >
            {/* Champ 1 : Lieu de prise en charge */}
            <div className="relative lg:col-span-3 p-2.5 bg-white/60 hover:bg-white/90 border border-slate-200/60 rounded-xl transition-colors">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-900 tracking-tight">
                Prise en charge à Abidjan
              </label>
              <div
                onClick={() => setShowPickupList(!showPickupList)}
                className="flex items-center gap-1.5 mt-1 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                <span className="text-xs text-slate-800 truncate font-semibold">
                  {pickupLocation}
                </span>
              </div>

              {showPickupList && (
                <div className="absolute left-0 top-full mt-2 w-full sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/80 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                    Lieux populaires
                  </div>
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setPickupLocation(loc);
                        setShowPickupList(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-[#00AEEF] transition-colors truncate font-medium"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Champ 2 : Lieu de restitution */}
            <div className="relative lg:col-span-3 p-2.5 bg-white/60 hover:bg-white/90 border border-slate-200/60 rounded-xl transition-colors">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-900 tracking-tight">
                  Restitution
                </label>
                <button
                  type="button"
                  onClick={handleSwapLocations}
                  title="Inverser les lieux"
                  className="p-1 glass-btn-light rounded-lg text-slate-500 hover:text-[#00AEEF] transition-colors active:scale-90"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                </button>
              </div>
              <div
                onClick={() => setShowDropoffList(!showDropoffList)}
                className="flex items-center gap-1.5 mt-1 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-xs text-slate-800 truncate font-semibold">
                  {dropoffLocation}
                </span>
              </div>

              {showDropoffList && (
                <div className="absolute left-0 top-full mt-2 w-full sm:w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/80 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                    Lieux de restitution
                  </div>
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => {
                        setDropoffLocation(loc);
                        setShowDropoffList(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-[#00AEEF] transition-colors truncate font-medium"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Champ 3 : Date */}
            <div className="lg:col-span-2 p-2.5 bg-white/60 hover:bg-white/90 border border-slate-200/60 rounded-xl transition-colors">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-900 tracking-tight">
                Date de début
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="text-xs text-slate-800 font-semibold bg-transparent border-0 p-0 focus:ring-0 cursor-pointer w-full"
                />
              </div>
            </div>

            {/* Champ 4 : Heure */}
            <div className="lg:col-span-2 p-2.5 bg-white/60 hover:bg-white/90 border border-slate-200/60 rounded-xl transition-colors">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-900 tracking-tight">
                Heure de départ
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5 text-[#00AEEF] shrink-0" />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="text-xs text-slate-800 font-semibold bg-transparent border-0 p-0 focus:ring-0 cursor-pointer w-full"
                />
              </div>
            </div>

            {/* Bouton d'action : Glassmorphism éclatant */}
            <div className="lg:col-span-2 sm:col-span-2 mt-1 sm:mt-0">
              <button
                type="submit"
                className="w-full h-11 sm:h-12 glass-btn-primary text-white font-bold text-sm rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Rechercher</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
