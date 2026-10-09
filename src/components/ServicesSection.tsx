import React from 'react';
import { Plane, Shield, Crown, Building2, Clock, Car } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Plane className="w-6 h-6 text-[#00AEEF]" />,
      title: 'Transferts Aéroport Express',
      description:
        'Accueil VIP personnalisé dès la sortie de votre vol à Abidjan (Félix-Houphouët-Boigny), prise en charge des bagages et transfert sécurisé direct.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: 'Chauffeurs de Sécurité & Escorte',
      description:
        'Chauffeurs professionnels formés à la conduite défensive, protocolaire et aux exigences des personnalités diplomatiques et chefs d’entreprise.',
    },
    {
      icon: <Crown className="w-6 h-6 text-amber-500" />,
      title: 'Mariages & Événements de Prestige',
      description:
        'Sublimez vos célébrations avec notre Lamborghini Urus, notre Mercedes Classe V Maybach et notre Chevrolet Tahoe 2025 décorés selon vos désirs.',
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#4C85FA]" />,
      title: 'Corporate & Flotte d’Entreprise',
      description:
        'Solutions de mise à disposition mensuelle ou annuelle pour délégations, sommets internationaux et cadres dirigeants à Abidjan.',
    },
  ];

  return (
    <section id="services" className="py-10 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12 text-center lg:text-left mx-auto lg:mx-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF]">
            Excellence & Sur-Mesure
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mt-1 font-display">
            Des prestations d'exception pour chaque instant
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto lg:mx-0">
            GSJ Location redéfinit les standards de la conciergerie automobile en Côte d'Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {srv.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00AEEF] transition-colors font-display">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {srv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
