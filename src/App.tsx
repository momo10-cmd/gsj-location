import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero, SearchCriteria } from './components/Hero';
import { CarCategories } from './components/CarCategories';
import { TrendVehicles } from './components/TrendVehicles';
import { BenefitsBar } from './components/BenefitsBar';
import { PromoDiscountBanner } from './components/PromoDiscountBanner';
import { ServicesSection } from './components/ServicesSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { InteractiveBookingModal } from './components/InteractiveBookingModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { UserAccountModal } from './components/UserAccountModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { FLEET_VEHICLES, Vehicle, Currency } from './data/fleetData';

export default function App() {
  // Global States (Devise par défaut en Francs CFA XOF)
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modales
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<Vehicle | null>(null);

  // Critères de recherche saisis dans le Hero
  const [activeSearchCriteria, setActiveSearchCriteria] = useState<SearchCriteria | null>(null);

  // Raccourci clavier (⌘K ou Ctrl+K pour recherche rapide)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Gestion de la recherche depuis le Hero
  const handleHeroSearch = (criteria: SearchCriteria) => {
    setActiveSearchCriteria(criteria);

    // Défilement fluide vers la flotte
    const fleetEl = document.getElementById('fleet');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ouverture de la modale de réservation
  const handleBookVehicle = (vehicle: Vehicle) => {
    setSelectedVehicleForBooking(vehicle);
    setIsBookingModalOpen(true);
  };

  // Réservation de l'Urus depuis la bannière promotionnelle
  const handleBookFeaturedPromo = () => {
    const urus = FLEET_VEHICLES.find((v) => v.id === 'lamborghini-urus') || FLEET_VEHICLES[0];
    handleBookVehicle(urus);
  };

  // Clic sur une catégorie
  const handleSelectCategory = (categoryKey: string) => {
    if (categoryKey === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryKey);
      const fleetEl = document.getElementById('fleet');
      if (fleetEl) {
        fleetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Défilement fluide vers une section
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* 1. En-tête : Navigation & Logo GSJ Location Abidjan */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAccount={() => setIsAccountModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Contenu principal suivant l'UI de la maquette */}
      <main className="flex-1">
        {/* 2. Hero avec Urus de prestige & moteur de recherche flottant */}
        <Hero onSearch={handleHeroSearch} />

        {/* 3. Catégories de véhicules (Prestige, Grands SUV, Vans VIP, Berlines & Pick-Up) */}
        <CarCategories
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />

        {/* 4. Flotte des 10 véhicules exclusifs */}
        <TrendVehicles
          vehicles={FLEET_VEHICLES}
          currency={currency}
          selectedCategory={selectedCategory}
          onClearCategoryFilter={() => setSelectedCategory(null)}
          onBookVehicle={handleBookVehicle}
        />

        {/* 5. Bandeau des 4 engagements & avantages VIP */}
        <BenefitsBar />

        {/* 6. Bannière Promotionnelle Lamborghini Urus */}
        <PromoDiscountBanner onBookFeatured={handleBookFeaturedPromo} />

        {/* 7. Services et conciergerie à Abidjan */}
        <ServicesSection />

        {/* 8. FAQ en Français */}
        <FAQSection />
      </main>

      {/* 9. Pied de page conforme à la maquette */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Modale interactive de réservation pas-à-pas */}
      <InteractiveBookingModal
        vehicle={selectedVehicleForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        currency={currency}
        initialPickupLocation={activeSearchCriteria?.pickupLocation}
        initialDropoffLocation={activeSearchCriteria?.dropoffLocation}
        initialPickupDate={activeSearchCriteria?.pickupDate}
        initialPickupTime={activeSearchCriteria?.pickupTime}
      />

      {/* Modale de recherche rapide (⌘K) */}
      <QuickSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        currency={currency}
        onSelectVehicle={(veh) => {
          handleBookVehicle(veh);
        }}
      />

      {/* Espace VIP Client */}
      <UserAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currency={currency}
      />

      {/* Bouton Flottant Contact WhatsApp en bas à droite */}
      <FloatingWhatsAppButton />
    </div>
  );
}
