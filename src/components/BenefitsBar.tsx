import React from 'react';
import { Smartphone, Gem, Clock, ShieldCheck } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center shrink-0 text-[#00AEEF]">
          <Smartphone className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
      title: 'Réservation instantanée',
      description: 'En 2 minutes avec validation immédiate par notre conciergerie VIP à Abidjan',
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center shrink-0 text-cyan-400">
          <Gem className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
      title: 'Privilèges clients réguliers',
      description: 'Tarifs préférentiels, surclassement offert et chauffeur dédié en costume',
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center shrink-0 text-[#4C85FA]">
          <Clock className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
      title: 'Modification ou annulation sans frais',
      description: 'Flexibilité totale jusqu’à 72 heures avant l’heure de prise en charge',
    },
    {
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md flex items-center justify-center shrink-0 text-emerald-400">
          <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
        </div>
      ),
      title: 'Flotte sécurisée & Assistance 24/7',
      description: 'Véhicules impeccables, climatisés, avec assistance permanente à Abidjan',
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-8 sm:py-12 border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {item.icon}
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-snug font-display">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
