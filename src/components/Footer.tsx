import React, { useState } from 'react';
import { ArrowRight, Check, Youtube, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Phone } from 'lucide-react';
import { GSJLogo } from './GSJLogo';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_RAW } from '../data/fleetData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-white border-t border-slate-200/90 text-slate-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colonnes du pied de page selon la disposition de l'Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Colonne 1 : Logo & Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <GSJLogo
              size="md"
              onClick={() => onNavigateSection('hero')}
              className="cursor-pointer"
            />

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-900 mb-2 font-display">
                Abonnez-vous à la newsletter privilège
              </label>

              <form onSubmit={handleSubscribe} className="relative max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email ..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs py-3 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00AEEF] text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-btn-dark hover:glass-btn-cyan text-white flex items-center justify-center transition-all active:scale-90 shadow-md"
                  aria-label="S'inscrire à la newsletter"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </form>

              {subscribed && (
                <p className="text-[11px] text-emerald-600 font-semibold mt-2 animate-in fade-in-50">
                  Merci ! Vous recevrez en avant-première nos offres exclusives à Abidjan.
                </p>
              )}
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <p className="font-semibold text-slate-900">
                Contact officiel GSJ Location Abidjan :
              </p>
              <a
                href={`tel:${OFFICIAL_PHONE_RAW}`}
                className="inline-flex items-center gap-1.5 text-[#00AEEF] font-bold hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{OFFICIAL_PHONE}</span>
              </a>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Siège social : Abidjan, Côte d'Ivoire. Agences : Sofitel Hôtel Ivoire Cocody & Zone 4 Marcory.
              </p>
            </div>
          </div>

          {/* Colonne 2 : Villes principales */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
              Zones desservies
            </h5>
            <ul className="space-y-2 text-xs text-slate-500">
              {[
                'Abidjan - Cocody & Vallon',
                'Abidjan - Plateau Affaires',
                'Abidjan - Marcory Zone 4',
                'Aéroport Félix-Houphouët',
                'Assinie-Mafia (Villas)',
                'Yamoussoukro Capitale',
                'Grand-Bassam',
                'San-Pédro Cité & Port',
              ].map((zone) => (
                <li key={zone}>
                  <button
                    onClick={() => onNavigateSection('fleet')}
                    className="hover:text-[#00AEEF] transition-colors text-left"
                  >
                    {zone}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Explorer */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
              Nos Prestations
            </h5>
            <ul className="space-y-2 text-xs text-slate-500">
              {[
                'Location avec chauffeur en costume',
                'Transferts VIP Aéroport Abidjan',
                'Cortèges de Mariage & Cérémonies',
                'Délégations & Sommets Officiels',
                'Mise à disposition longue durée',
                'Escorte de sécurité sur demande',
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigateSection('services')}
                    className="hover:text-[#00AEEF] transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Trajets Interurbains */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-display">
              Trajets interurbains
            </h5>
            <ul className="space-y-2 text-xs text-slate-500">
              {[
                'Abidjan ⇄ Assinie Beach Resort',
                'Abidjan ⇄ Yamoussoukro',
                'Abidjan ⇄ Grand-Bassam',
                'Abidjan ⇄ San-Pédro',
                'Circuits touristiques sur-mesure',
                'Déplacements VIP sécurisés',
              ].map((route) => (
                <li key={route}>
                  <button
                    onClick={() => onNavigateSection('fleet')}
                    className="hover:text-[#00AEEF] transition-colors text-left"
                  >
                    {route}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ligne inférieure : Copyright, mentions et réseaux sociaux */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>© 2026 GSJ Location Abidjan. Tous droits réservés.</span>
          </div>

          <div className="flex items-center gap-6 text-slate-500 font-medium">
            <a href="#terms" className="hover:text-slate-900 transition-colors">Conditions générales</a>
            <a href="#privacy" className="hover:text-slate-900 transition-colors">Confidentialité</a>
            <a href="#legal" className="hover:text-slate-900 transition-colors">Mentions légales</a>
            <a href="#accessibility" className="hover:text-slate-900 transition-colors">Accessibilité</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#00AEEF] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${OFFICIAL_PHONE_RAW.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-500 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
