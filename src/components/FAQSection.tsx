import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quels documents sont nécessaires pour louer un véhicule de luxe chez GSJ Location ?',
      a: 'Pour louer un véhicule de notre flotte, vous devez présenter une pièce d’identité en cours de validité (Passeport ou CNI), un permis de conduire valide depuis au moins 2 ans (permis ivoirien ou international), ainsi qu’un justificatif de domicile ou de séjour (réservation d’hôtel). En formule avec chauffeur privé, le permis de conduire n’est pas exigé.',
    },
    {
      q: 'Comment s’organise la prise en charge avec chauffeur privé à Abidjan ?',
      a: 'Nos chauffeurs dédiés sont rigoureusement sélectionnés : ponctuels, vêtus en costume élégant, discrets et parfaitement au fait de la circulation abidjanaise. Le chauffeur se présente à l’adresse convenue (Aéroport, Sofitel Ivoire, Plateau, etc.) 15 minutes avant l’horaire fixé avec un véhicule impeccablement nettoyé.',
    },
    {
      q: 'Puis-je effectuer des déplacements en dehors d’Abidjan (Assinie, Yamoussoukro, Grand-Bassam) ?',
      a: 'Absolument ! Tous nos véhicules (notamment nos SUV Chevrolet Tahoe 2025, Toyota Land Cruiser Prado et notre Double Cabine Changan Hunter) sont autorisés pour des trajets interurbains vers Assinie-Mafia, Grand-Bassam, Yamoussoukro ou San-Pédro. Merci de le préciser lors de votre réservation pour adapter le forfait kilométrique.',
    },
    {
      q: 'Quels sont les modes de paiement acceptés et comment se passe la caution ?',
      a: 'Nous acceptons les règlements par carte bancaire (Visa, Mastercard, Amex), virement bancaire anticipé, ainsi que les solutions Mobile Money locales (Wave, Orange Money, MTN MoMo) et les espèces à la livraison. La caution est pré-autorisée par empreinte bancaire ou dépôt de garantie restitué immédiatement au retour du véhicule.',
    },
    {
      q: 'Comment s’applique l’offre de remise sur la Lamborghini Urus ?',
      a: 'L’offre privilège s’applique automatiquement pour toute réservation de la Lamborghini Urus en renseignant le code promotionnel URUS25 lors de votre commande ou en cliquant sur le bouton « Réserver maintenant » de la bannière. Vous bénéficiez de 25% de remise dès 3 jours de location avec conciergerie VIP dédiée.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AEEF]">
            Questions Fréquentes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-1 font-display">
            Tout ce que vous devez savoir
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Des réponses claires et transparentes pour une expérience sans le moindre accroc
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#00AEEF] transition-colors"
                >
                  <span>{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? 'rotate-180 glass-btn-cyan text-white' : 'glass-btn-light text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100/60 animate-in fade-in-50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
