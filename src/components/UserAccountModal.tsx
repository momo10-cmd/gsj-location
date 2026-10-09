import React from 'react';
import { X, ShieldCheck, Award, Phone, CheckCircle, LogOut } from 'lucide-react';
import { Currency, formatPrice, OFFICIAL_PHONE, OFFICIAL_PHONE_RAW } from '../data/fleetData';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  currency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* En-tête VIP */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00AEEF] to-[#4C85FA] text-white flex items-center justify-center font-bold text-2xl shadow-lg border border-white/20">
              JK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-extrabold text-white font-display">
                  Jean-Philippe K.
                </h4>
                <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> VIP Black
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Client Privilège GSJ Location Abidjan · Membre depuis 2024
              </p>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-5 text-xs max-h-[70vh] overflow-y-auto">
          {/* Avantages VIP */}
          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl space-y-2">
            <div className="flex items-center justify-between font-bold text-sky-950">
              <span className="flex items-center gap-1.5 font-display">
                <ShieldCheck className="w-4 h-4 text-[#00AEEF]" /> Vos Avantages Exclusifs
              </span>
              <span className="text-[11px] text-[#00AEEF] font-bold">Actif</span>
            </div>
            <ul className="space-y-1.5 text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Livraison et restitution gratuites partout à Abidjan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Chauffeur de sécurité offert dès 4 jours de location</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Priorité absolue sur le Chevrolet Tahoe 2025 & la Mercedes Classe V</span>
              </li>
            </ul>
          </div>

          {/* Réservation récente */}
          <div>
            <h5 className="font-bold text-slate-900 mb-2 font-display">Réservation récente</h5>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Chevrolet Tahoe 2025</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                  Confirmée
                </span>
              </div>
              <div className="text-slate-500 flex items-center justify-between text-[11px]">
                <span>12 - 15 Juin 2026 · Sofitel Hôtel Ivoire</span>
                <span className="font-mono font-bold text-slate-800">
                  {formatPrice(690, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Conciergerie VIP Abidjan */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-white font-display">Concierge Privé 24/7</div>
              <p className="text-[11px] text-slate-300">Ligne directe Abidjan : {OFFICIAL_PHONE}</p>
            </div>
            <a
              href={`tel:${OFFICIAL_PHONE_RAW}`}
              className="px-4 py-2 glass-btn-cyan text-white font-bold rounded-full flex items-center gap-1.5 active:scale-95 transition-all text-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Appeler</span>
            </a>
          </div>
        </div>

        {/* Pied de la modale */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 glass-btn-dark text-white text-xs font-semibold rounded-full active:scale-95 transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
