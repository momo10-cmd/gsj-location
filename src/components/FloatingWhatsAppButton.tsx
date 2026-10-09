import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { OFFICIAL_PHONE_RAW, OFFICIAL_PHONE } from '../data/fleetData';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const defaultMessage =
    "Bonjour GSJ Location Abidjan, je souhaiterais des informations pour la location d'un véhicule de votre flotte.";

  const handleStartChat = (customText?: string) => {
    const textToSend = customText || userQuery || defaultMessage;
    const encoded = encodeURIComponent(textToSend);
    const cleanNumber = OFFICIAL_PHONE_RAW.replace('+', '');
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Pop-up de discussion rapide avec Glassmorphism */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] sm:w-96 max-w-sm bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/70 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
          {/* En-tête de la boîte WhatsApp */}
          <div className="bg-[#075E54]/95 backdrop-blur-md text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center font-bold text-[#075E54] text-xs sm:text-sm shadow-xs">
                  GSJ
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm tracking-tight font-display">
                  GSJ Location Abidjan
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>En ligne · Conciergerie VIP</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full glass-btn-light text-white/90 hover:text-white flex items-center justify-center active:scale-95 transition-all"
              aria-label="Fermer la fenêtre WhatsApp"
            >
              <X className="w-4 h-4 text-slate-800" />
            </button>
          </div>

          {/* Corps avec messages types */}
          <div className="p-3.5 sm:p-4 bg-slate-50/70 space-y-2.5 text-xs">
            {/* Bulle reçue */}
            <div className="bg-white/95 p-3 rounded-2xl rounded-tl-xs shadow-xs border border-slate-100 text-slate-800">
              <p className="font-semibold text-xs">
                Bonjour ! Bienvenue chez GSJ Location.
              </p>
              <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                Comment pouvons-nous vous assister ? Nos conseillers sont à votre écoute 24h/24 au {OFFICIAL_PHONE}.
              </p>
            </div>

            {/* Questions fréquentes en un clic avec glassmorphism */}
            <div className="space-y-1.5 pt-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Demandes rapides :
              </span>
              <button
                type="button"
                onClick={() =>
                  handleStartChat(
                    "Bonjour GSJ Location, je souhaite connaître les disponibilités pour la Lamborghini Urus à Abidjan."
                  )
                }
                className="w-full text-left p-2.5 glass-btn-light rounded-xl text-slate-700 hover:text-[#00AEEF] transition-all truncate text-[11px] font-medium active:scale-95"
              >
                🟡 Disponibilité Lamborghini Urus
              </button>
              <button
                type="button"
                onClick={() =>
                  handleStartChat(
                    "Bonjour GSJ Location, je souhaite réserver le Chevrolet Tahoe 2025 ou la Mercedes Classe V avec chauffeur."
                  )
                }
                className="w-full text-left p-2.5 glass-btn-light rounded-xl text-slate-700 hover:text-[#00AEEF] transition-all truncate text-[11px] font-medium active:scale-95"
              >
                🚐 Van VIP ou Grand SUV avec chauffeur
              </button>
              <button
                type="button"
                onClick={() =>
                  handleStartChat(
                    "Bonjour GSJ Location, quel est le tarif pour un transfert aéroport Félix-Houphouët-Boigny vers Cocody ?"
                  )
                }
                className="w-full text-left p-2.5 glass-btn-light rounded-xl text-slate-700 hover:text-[#00AEEF] transition-all truncate text-[11px] font-medium active:scale-95"
              >
                ✈️ Tarifs transfert aéroport Félix-Houphouët
              </button>
            </div>
          </div>

          {/* Saisie personnalisée */}
          <div className="p-3 bg-white/95 border-t border-slate-200/50 flex items-center gap-2">
            <input
              type="text"
              placeholder="Écrivez votre message..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleStartChat();
                }
              }}
              className="flex-1 text-xs py-2 px-3 bg-slate-100/80 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => handleStartChat()}
              className="w-9 h-9 rounded-xl glass-btn-whatsapp text-white flex items-center justify-center transition-all active:scale-90 shadow-sm shrink-0"
              title="Envoyer sur WhatsApp"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Bouton Flottant Principal 'Contact WhatsApp' avec Glassmorphism */}
      <button
        type="button"
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            handleStartChat();
          }
        }}
        className="group relative flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 glass-btn-whatsapp active:scale-95 text-white font-bold text-xs sm:text-sm rounded-full shadow-2xl transition-all duration-300"
        aria-label="Contact WhatsApp GSJ Location"
      >
        {/* Pulsing glow ring */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-70 blur-xs animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white stroke-[#25D366] stroke-[1.5]" />
        </div>

        {/* Label */}
        <span className="relative tracking-tight font-display whitespace-nowrap">
          Contact WhatsApp
        </span>

        {/* Témoin lumineux */}
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-white" />
        </span>
      </button>
    </div>
  );
};
