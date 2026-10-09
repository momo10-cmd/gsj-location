import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/fleetData';

interface PromoDiscountBannerProps {
  featuredVehicle?: Vehicle;
  onBookFeatured: () => void;
}

export const PromoDiscountBanner: React.FC<PromoDiscountBannerProps> = ({
  onBookFeatured,
}) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-slate-900">
      {/* Halo lumineux subtil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Colonne gauche : Centrée sur mobile */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-sky-400 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offre Privilège Abidjan</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] font-display text-balance mx-auto lg:mx-0">
              Réservez la Lamborghini Urus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-[#00AEEF]">
                avec un tarif exclusif
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed mx-auto lg:mx-0">
              Faites sensation à Abidjan avec le Super SUV le plus convoité. Moteur V8 biturbo 650 ch et chauffeur de sécurité disponible sur demande.
            </p>

            <div className="pt-1 flex justify-center lg:justify-start">
              <button
                onClick={onBookFeatured}
                className="px-7 sm:px-8 py-3.5 glass-btn-primary text-white font-bold text-xs sm:text-sm rounded-full transition-all active:scale-95 shadow-xl flex items-center gap-2 group"
              >
                <span>Réserver maintenant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Colonne droite : Visuel Urus + Carte Glassmorphic de réduction */}
          <div className="lg:col-span-7 relative flex items-center justify-center mt-2 sm:mt-0">
            {/* Visuel Urus */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900/60">
              <img
                src="/src/assets/images/fleet_lamborghini_urus_1791504578957.jpg"
                alt="Lamborghini Urus à Abidjan - GSJ Location"
                className="w-full h-auto object-cover max-h-[340px] sm:max-h-[380px]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/20" />
            </div>

            {/* Encart Glassmorphic -25% */}
            <div className="absolute -top-3 right-2 sm:right-6 bg-[#4C85FA]/80 backdrop-blur-2xl text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 transform hover:scale-105 transition-transform duration-300 max-w-[170px] sm:max-w-[190px]">
              <div className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-none">
                -25%
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-white/95 mt-1.5 leading-snug">
                Dès 3 jours de <br />
                location à Abidjan
              </p>
              <div className="mt-1.5 text-[9px] sm:text-[10px] text-blue-100 font-mono font-bold bg-white/10 px-2 py-0.5 rounded-md inline-block">
                Code : URUS25
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
