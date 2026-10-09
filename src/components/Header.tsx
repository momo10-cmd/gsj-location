import React, { useState } from 'react';
import { Search, User, Menu, X, ChevronDown, Phone } from 'lucide-react';
import { GSJLogo } from './GSJLogo';
import { Currency, OFFICIAL_PHONE, OFFICIAL_PHONE_RAW } from '../data/fleetData';

interface HeaderProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenSearch,
  onOpenAccount,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', id: 'hero' },
    { label: 'Services', id: 'services' },
    { label: 'Notre Flotte', id: 'fleet' },
    { label: 'Catégories', id: 'categories' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-2.5 sm:top-5 left-2.5 sm:left-6 right-2.5 sm:right-6 z-40 max-w-6xl mx-auto pointer-events-none transition-all">
      {/* Bulle flottante principale avec effet Glassmorphism */}
      <header className="pointer-events-auto glass-header rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300">
        {/* Zone 1: Logo GSJ Location Abidjan */}
        <div className="flex items-center">
          <GSJLogo
            size="sm"
            onClick={() => onNavigateSection('hero')}
            className="hover:opacity-90 transition-opacity scale-90 sm:scale-100 origin-left"
          />
        </div>

        {/* Zone 2: Navigation Links en Français (desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#00AEEF] transition-colors relative py-1 hover:font-semibold"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Boutons avec effet Glassmorphism */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Appel direct (desktop) */}
          <a
            href={`tel:${OFFICIAL_PHONE_RAW}`}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 glass-btn-light text-slate-800 hover:text-[#00AEEF] rounded-full text-xs font-bold transition-all active:scale-95"
            title="Appeler GSJ Location"
          >
            <Phone className="w-3 h-3 text-[#00AEEF]" />
            <span>{OFFICIAL_PHONE}</span>
          </a>

          {/* Recherche rapide avec bouton glassmorphic */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 glass-btn-light rounded-full text-xs text-slate-600 hover:text-slate-900 transition-all active:scale-95"
            title="Rechercher un véhicule"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Rechercher...</span>
            <kbd className="hidden md:inline-block text-[9px] bg-white/70 border border-slate-200/80 rounded px-1.5 py-0.5 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Sélecteur de Devise Glassmorphic */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 glass-btn-light rounded-full transition-all active:scale-95"
              aria-label="Sélectionner la devise"
            >
              <span>{currentCurrency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl py-1 z-50 animate-in fade-in-50 zoom-in-95">
                {(['XOF', 'EUR', 'USD'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between transition-colors ${
                      currentCurrency === curr ? 'text-[#00AEEF] font-bold bg-sky-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="text-[10px] text-slate-400">
                      {curr === 'XOF' ? 'FCFA' : curr === 'EUR' ? '€' : '$'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bouton Compte VIP Glassmorphic Sombre */}
          <button
            onClick={onOpenAccount}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-btn-dark text-white flex items-center justify-center transition-all active:scale-95 group"
            title="Espace VIP & Mes Réservations"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Hamburger Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-btn-light flex items-center justify-center text-slate-700 hover:text-slate-900 active:scale-95 transition-all"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Menu mobile flottant avec Glassmorphism */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto mt-2 bg-white/85 backdrop-blur-2xl border border-white/60 rounded-3xl p-5 shadow-2xl space-y-3 animate-in fade-in-50 zoom-in-95">
          <a
            href={`tel:${OFFICIAL_PHONE_RAW}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 glass-btn-light text-emerald-800 rounded-2xl text-xs font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Appel direct : {OFFICIAL_PHONE}</span>
          </a>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="py-2.5 px-3 text-left text-xs font-semibold text-slate-800 hover:text-[#00AEEF] glass-btn-light rounded-xl truncate transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
            <span>Devise :</span>
            <div className="flex gap-1.5">
              {(['XOF', 'EUR', 'USD'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    currentCurrency === curr ? 'glass-btn-cyan text-white' : 'glass-btn-light text-slate-700'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
