import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, Shield, UserCheck, Plane, Award, Sparkles, Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Vehicle, Currency, formatPrice, POPULAR_LOCATIONS, OFFICIAL_PHONE_RAW } from '../data/fleetData';

interface InteractiveBookingModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialPickupLocation?: string;
  initialDropoffLocation?: string;
  initialPickupDate?: string;
  initialPickupTime?: string;
}

export const InteractiveBookingModal: React.FC<InteractiveBookingModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  currency,
  initialPickupLocation,
  initialDropoffLocation,
  initialPickupDate,
  initialPickupTime,
}) => {
  if (!isOpen || !vehicle) return null;

  // Multi-step
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form values
  const [pickupLoc, setPickupLoc] = useState(initialPickupLocation || POPULAR_LOCATIONS[0]);
  const [dropoffLoc, setDropoffLoc] = useState(initialDropoffLocation || POPULAR_LOCATIONS[1]);
  const [startDate, setStartDate] = useState(initialPickupDate || '2026-06-12');
  const [endDate, setEndDate] = useState('2026-06-15');
  const [startTime, setStartTime] = useState(initialPickupTime || '13:00');
  const [returnTime, setReturnTime] = useState('13:00');

  // Options
  const [withChauffeur, setWithChauffeur] = useState(vehicle.withChauffeurRecommended || false);
  const [vipInsurance, setVipInsurance] = useState(true);
  const [airportFastTrack, setAirportFastTrack] = useState(false);
  const [childSeat, setChildSeat] = useState(false);

  // Promo code
  const isUrus = vehicle.id === 'lamborghini-urus';
  const [promoCode, setPromoCode] = useState(isUrus ? 'URUS25' : '');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(isUrus ? 25 : 0);
  const [promoMessage, setPromoMessage] = useState<string>(
    isUrus ? 'Offre Spéciale Urus -25% appliquée !' : ''
  );

  // Client info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+225 ');
  const [email, setEmail] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'arrival' | 'wave_momo' | 'card'>('arrival');

  // Confirmation result
  const [bookingId, setBookingId] = useState('');

  // Calculate rental days
  const calculateDays = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(1, diffDays || 1);
    } catch {
      return 3;
    }
  };

  const days = calculateDays();
  const baseVehicleTotal = vehicle.pricePerDayUSD * days;

  // Options cost (USD)
  const chauffeurCost = withChauffeur ? 40 * days : 0;
  const insuranceCost = vipInsurance ? 20 * days : 0;
  const airportCost = airportFastTrack ? 30 : 0;
  const childSeatCost = childSeat ? 15 : 0;

  const subtotalUSD = baseVehicleTotal + chauffeurCost + insuranceCost + airportCost + childSeatCost;
  const discountAmountUSD = (baseVehicleTotal * appliedDiscount) / 100;
  const totalUSD = Math.max(0, subtotalUSD - discountAmountUSD);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'URUS25') {
      setAppliedDiscount(25);
      setPromoMessage('Code URUS25 validé : -25% de remise !');
    } else if (code === 'GSJVIP') {
      setAppliedDiscount(15);
      setPromoMessage('Code Privilège VIP validé : -15% appliqués !');
    } else if (code === 'ABIDJAN10') {
      setAppliedDiscount(10);
      setPromoMessage('Code Bienvenue Abidjan : -10% appliqués !');
    } else {
      setPromoMessage('Code promo invalide ou expiré.');
      setAppliedDiscount(0);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `GSJ-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setStep(4);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Bonjour GSJ Location Abidjan,\nJe souhaite confirmer ma réservation :\n• Référence : ${bookingId}\n• Véhicule : ${vehicle.name}\n• Période : du ${startDate} au ${endDate} (${days} jours)\n• Prise en charge : ${pickupLoc}\n• Chauffeur privé : ${withChauffeur ? 'Oui, requis' : 'Conduite autonome'}\n• Montant total estimé : ${formatPrice(totalUSD, currency)}\n• Client : ${fullName} (${phone})\nMerci de me recontacter pour finaliser.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${OFFICIAL_PHONE_RAW.replace('+', '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto animate-in fade-in-50 zoom-in-95">
        {/* En-tête de la modale */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00AEEF] flex items-center justify-center font-bold text-white text-xs">
              GSJ
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight font-display">
                {step === 4 ? 'Réservation Confirmée' : `Réserver : ${vehicle.name}`}
              </h3>
              <p className="text-xs text-slate-300">
                {step === 4
                  ? `Dossier N° ${bookingId}`
                  : `Étape ${step} sur 3 · Location de prestige à Abidjan`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-btn-light flex items-center justify-center text-slate-800 active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barre de progression des étapes */}
        {step < 4 && (
          <div className="bg-slate-100 px-6 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-600 border-b border-slate-200">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#00AEEF] font-bold' : ''}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#00AEEF] text-white' : 'bg-slate-300'}`}>1</span>
              <span>Dates & Lieux</span>
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#00AEEF] font-bold' : ''}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#00AEEF] text-white' : 'bg-slate-300'}`}>2</span>
              <span>Chauffeur & Options</span>
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => setStep(3)}
              className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#00AEEF] font-bold' : ''}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#00AEEF] text-white' : 'bg-slate-300'}`}>3</span>
              <span>Coordonnées & Devis</span>
            </button>
          </div>
        )}

        {/* Corps de la modale */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* ÉTAPE 1 : Dates, Heures, Lieux */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Carte récapitulative du véhicule */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-36 h-24 object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      const filename = target.src.split('/').pop()?.split('?')[0];
                      if (filename) target.src = `/images/${filename}`;
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-[#00AEEF]">{vehicle.brand}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{vehicle.category}</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900 font-display">{vehicle.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{vehicle.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Tarif par jour</div>
                  <div className="text-lg font-black text-slate-900 font-display">
                    {formatPrice(vehicle.pricePerDayUSD, currency)} /jour
                  </div>
                </div>
              </div>

              {/* Sélection des adresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00AEEF]" /> Lieu de prise en charge à Abidjan
                  </label>
                  <select
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> Lieu de restitution à Abidjan
                  </label>
                  <select
                    value={dropoffLoc}
                    onChange={(e) => setDropoffLoc(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates & Heures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" /> Date & Heure de début
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00AEEF]" /> Date & Heure de fin
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Résumé de durée */}
              <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between text-xs text-sky-950">
                <span className="font-semibold">
                  Durée de location : <strong>{days} jour{days > 1 ? 's' : ''}</strong>
                </span>
                <span className="font-bold text-sky-800">
                  Montant véhicule de base : {formatPrice(baseVehicleTotal, currency)}
                </span>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : Options Privilège & Chauffeur */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 font-display">
                Services & Prestations VIP Complémentaires
              </h4>

              {/* Option Chauffeur */}
              <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={withChauffeur}
                  onChange={(e) => setWithChauffeur(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#00AEEF] rounded focus:ring-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#00AEEF]" /> Chauffeur Privé Professionnel (Costume & Bilingue)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 font-display">
                      +{formatPrice(40 * days, currency)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Chauffeur discret, courtois et expérimenté. Connaissance parfaite des itinéraires d'Abidjan (Cocody, Plateau, Marcory, Assinie).
                  </p>
                </div>
              </label>

              {/* Assurance VIP */}
              <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={vipInsurance}
                  onChange={(e) => setVipInsurance(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#00AEEF] rounded focus:ring-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-600" /> Assurance Tous Risques VIP (Franchise 0 FCFA)
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 font-display">
                      +{formatPrice(20 * days, currency)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Protection totale sans franchise en cas d'incident, assistance dépannage 24/7 et véhicule de remplacement immédiat.
                  </p>
                </div>
              </label>

              {/* Accueil Aéroport */}
              <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={airportFastTrack}
                  onChange={(e) => setAirportFastTrack(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#00AEEF] rounded focus:ring-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Plane className="w-4 h-4 text-blue-600" /> Accueil VIP Aéroport Félix-Houphouët-Boigny
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 font-display">
                      +{formatPrice(30, currency)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Prise en charge avec pancarte personnalisée dès la sortie du hall des arrivées et port des bagages inclus.
                  </p>
                </div>
              </label>

              {/* Siège Enfant */}
              <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-sky-50/50 rounded-2xl border border-slate-200 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={childSeat}
                  onChange={(e) => setChildSeat(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#00AEEF] rounded focus:ring-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" /> Siège Bébé / Enfant ISOFIX
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 font-display">
                      +{formatPrice(15, currency)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Siège de sécurité homologué installé et vérifié avant votre départ.
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* ÉTAPE 3 : Coordonnées, Code Promo & Devis */}
          {step === 3 && (
            <form id="booking-form" onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nom & Prénoms complets *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Jean-Philippe Konan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#00AEEF]" /> Téléphone WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+225 07 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#00AEEF]" /> Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@entreprise.ci"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Numéro de vol (Optionnel si aéroport)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: AF702 ou HF510"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00AEEF]"
                  />
                </div>
              </div>

              {/* Code promotionnel */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00AEEF]" /> Code promotionnel ou Avantage Privilège
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="ex: URUS25, GSJVIP, ABIDJAN10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-xl uppercase font-mono font-bold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 glass-btn-dark text-white text-xs font-semibold rounded-xl active:scale-95 transition-all"
                  >
                    Appliquer
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1.5 font-semibold ${
                      appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Mode de règlement */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Mode de règlement souhaité
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'arrival', label: 'À la livraison', sub: 'Espèces / TPE' },
                    { id: 'wave_momo', label: 'Wave / Mobile Money', sub: 'Orange / MTN' },
                    { id: 'card', label: 'Carte Bancaire', sub: 'Visa / Mastercard' },
                  ].map((pay) => (
                    <button
                      key={pay.id}
                      type="button"
                      onClick={() => setPaymentMethod(pay.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paymentMethod === pay.id
                          ? 'border-[#00AEEF] bg-sky-50/60 ring-2 ring-[#00AEEF]/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{pay.label}</div>
                      <div className="text-[10px] text-slate-500">{pay.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Récapitulatif Devis */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>
                    Location {vehicle.name} ({days} jours)
                  </span>
                  <span className="font-mono">{formatPrice(baseVehicleTotal, currency)}</span>
                </div>
                {withChauffeur && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Chauffeur Privé VIP ({days} j)</span>
                    <span className="font-mono">{formatPrice(chauffeurCost, currency)}</span>
                  </div>
                )}
                {vipInsurance && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Assurance Tous Risques VIP ({days} j)</span>
                    <span className="font-mono">{formatPrice(insuranceCost, currency)}</span>
                  </div>
                )}
                {airportFastTrack && (
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Accueil VIP Aéroport Félix-Houphouët-Boigny</span>
                    <span className="font-mono">{formatPrice(airportCost, currency)}</span>
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold border-t border-slate-800 pt-1">
                    <span>Remise promotionnelle ({appliedDiscount}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmountUSD, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white border-t border-slate-700 pt-2 font-display">
                  <span>Total Net Estimé :</span>
                  <span className="text-[#00AEEF] font-mono text-xl">
                    {formatPrice(totalUSD, currency)}
                  </span>
                </div>
              </div>
            </form>
          )}

          {/* ÉTAPE 4 : Écran de confirmation */}
          {step === 4 && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  Demande Enregistrée avec Succès
                </span>
                <h4 className="text-2xl font-black text-slate-950 mt-2 font-display">
                  Merci M/Mme {fullName || 'Cher Client'} !
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                  Votre demande de réservation pour le <strong>{vehicle.name}</strong> a bien été transmise à GSJ Location Abidjan.
                </p>
              </div>

              {/* Récapitulatif ticket */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Numéro de dossier :</span>
                  <span className="font-mono font-bold text-slate-900">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Lieu de prise en charge :</span>
                  <span className="font-semibold text-slate-900">{pickupLoc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Période :</span>
                  <span className="font-semibold text-slate-900">
                    {startDate} au {endDate} ({days} jours)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Formule chauffeur :</span>
                  <span className="font-semibold text-slate-900">
                    {withChauffeur ? 'Chauffeur VIP inclus' : 'Conduite autonome'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm">
                  <span>Montant Total Estimé :</span>
                  <span className="text-[#00AEEF] font-mono">{formatPrice(totalUSD, currency)}</span>
                </div>
              </div>

              {/* Redirection WhatsApp officielle */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto px-6 py-3 glass-btn-whatsapp text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Confirmer directement sur WhatsApp (+225 0502031717)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 glass-btn-light text-slate-800 font-semibold text-xs rounded-xl transition-all active:scale-95"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Boutons de navigation des étapes 1 à 3 */}
        {step < 4 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 glass-btn-light rounded-xl transition-all active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Précédent
              </button>
            ) : (
              <span className="text-xs text-slate-400">GSJ Location Abidjan · Service VIP</span>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 glass-btn-primary text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Continuer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="inline-flex items-center gap-1.5 px-7 py-2.5 glass-btn-cyan text-white text-xs font-extrabold rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Valider la Réservation</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
