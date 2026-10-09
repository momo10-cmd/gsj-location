export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'Supercar' | 'Grand SUV' | 'Van & Minibus' | 'Berline' | 'Pick-Up';
  pricePerDayUSD: number; // base for currency conversion
  pricePerDayFCFA: number; // official local price in FCFA
  highlightCard?: boolean; // styled card in trend section
  image: string;
  tagline: string;
  specs: {
    power: string;
    acceleration: string;
    transmission: string;
    seats: number;
    fuel: 'Essence V8' | 'Essence Turbo' | 'Diesel Robuste' | 'Hybride' | 'Bi-Turbo';
  };
  rating: number;
  reviewCount: number;
  availableInAbidjan: boolean;
  withChauffeurRecommended?: boolean;
}

export interface CategoryInfo {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  count: number;
  categoryKey: string;
}

// Exactly the 10 vehicles requested by user
export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: 'lamborghini-urus',
    name: 'Lamborghini Urus à Abidjan',
    brand: 'Lamborghini',
    category: 'Supercar',
    pricePerDayUSD: 650,
    pricePerDayFCFA: 400000,
    highlightCard: true,
    image: '/src/assets/images/fleet_lamborghini_urus_1791504578957.jpg',
    tagline: 'Le Super SUV ultime par excellence : puissance bestiale de 650 ch et prestige absolu à Abidjan',
    specs: {
      power: '650 ch V8 Biturbo',
      acceleration: '3.6s (0-100)',
      transmission: 'Automatique 8 rapports',
      seats: 5,
      fuel: 'Bi-Turbo',
    },
    rating: 5.0,
    reviewCount: 42,
    availableInAbidjan: true,
    withChauffeurRecommended: true,
  },
  {
    id: 'chevrolet-tahoe-2025',
    name: 'Chevrolet Tahoe 2025',
    brand: 'Chevrolet',
    category: 'Grand SUV',
    pricePerDayUSD: 230,
    pricePerDayFCFA: 140000,
    image: '/src/assets/images/fleet_chevrolet_tahoe_2025_1791504691736.jpg',
    tagline: 'Le tout nouveau SUV américain 2025 grand confort 7 places avec prestance imposante',
    specs: {
      power: '420 ch V8',
      acceleration: '6.5s (0-100)',
      transmission: 'Automatique 10 rapports',
      seats: 7,
      fuel: 'Essence V8',
    },
    rating: 4.98,
    reviewCount: 56,
    availableInAbidjan: true,
  },
  {
    id: 'mercedes-classe-v',
    name: 'Mercedes Classe V',
    brand: 'Mercedes-Benz',
    category: 'Van & Minibus',
    pricePerDayUSD: 200,
    pricePerDayFCFA: 120000,
    image: '/src/assets/images/fleet_mercedes_classe_v_1791504683454.jpg',
    tagline: 'Van VIP grand luxe finition calandre Maybach avec salon intérieur cuir pour délégations',
    specs: {
      power: '237 ch 300d',
      acceleration: '7.8s (0-100)',
      transmission: '9G-TRONIC',
      seats: 7,
      fuel: 'Diesel Robuste',
    },
    rating: 4.99,
    reviewCount: 68,
    availableInAbidjan: true,
  },
  {
    id: 'toyota-prado',
    name: 'Toyota Land Cruiser Prado',
    brand: 'Toyota',
    category: 'Grand SUV',
    pricePerDayUSD: 180,
    pricePerDayFCFA: 110000,
    image: '/src/assets/images/fleet_toyota_prado_1791504598750.jpg',
    tagline: 'La référence incontournable de robustesse, de confort et de sécurité en Côte d’Ivoire',
    specs: {
      power: '204 ch D-4D',
      acceleration: '9.2s (0-100)',
      transmission: 'Automatique 6 rapports',
      seats: 7,
      fuel: 'Diesel Robuste',
    },
    rating: 4.97,
    reviewCount: 84,
    availableInAbidjan: true,
  },
  {
    id: 'bestune-t55',
    name: 'Bestune T55',
    brand: 'Bestune',
    category: 'Grand SUV',
    pricePerDayUSD: 90,
    pricePerDayFCFA: 55000,
    image: '/src/assets/images/fleet_bestune_t55_1791504673280.jpg',
    tagline: 'Crossover moderne et technologique au design racé pour vos déplacements urbains à Abidjan',
    specs: {
      power: '169 ch Turbo',
      acceleration: '8.5s (0-100)',
      transmission: 'Double embrayage 7',
      seats: 5,
      fuel: 'Essence Turbo',
    },
    rating: 4.9,
    reviewCount: 39,
    availableInAbidjan: true,
  },
  {
    id: 'kia-k5',
    name: 'Kia K5',
    brand: 'Kia',
    category: 'Berline',
    pricePerDayUSD: 110,
    pricePerDayFCFA: 65000,
    image: '/src/assets/images/fleet_kia_k5_1791504627151.jpg',
    tagline: 'Berline sportive et statutaire au look audacieux, idéale pour rendez-vous d’affaires et cérémonies',
    specs: {
      power: '180 ch Turbo',
      acceleration: '7.4s (0-100)',
      transmission: 'Automatique 8 rapports',
      seats: 5,
      fuel: 'Essence Turbo',
    },
    rating: 4.92,
    reviewCount: 33,
    availableInAbidjan: true,
  },
  {
    id: 'buick-encore-gx',
    name: 'Buick Encore GX',
    brand: 'Buick',
    category: 'Grand SUV',
    pricePerDayUSD: 100,
    pricePerDayFCFA: 60000,
    image: '/src/assets/images/fleet_buick_encore_gx_1791504589937.jpg',
    tagline: 'SUV compact américain élégant et silencieux, offrant une conduite souple et raffinée',
    specs: {
      power: '155 ch Turbo',
      acceleration: '8.8s (0-100)',
      transmission: 'Automatique 9 rapports',
      seats: 5,
      fuel: 'Essence Turbo',
    },
    rating: 4.88,
    reviewCount: 27,
    availableInAbidjan: true,
  },
  {
    id: 'changan-hunter',
    name: 'Double Cabine Pick-Up Changan Hunter',
    brand: 'Changan',
    category: 'Pick-Up',
    pricePerDayUSD: 120,
    pricePerDayFCFA: 75000,
    image: '/src/assets/images/fleet_changan_hunter_1791504608281.jpg',
    tagline: 'Pick-up double cabine 4x4 robuste et spacieux, prêt pour vos missions d’affaires et chantiers',
    specs: {
      power: '150 ch Turbo Diesel',
      acceleration: '10.1s (0-100)',
      transmission: 'Manuelle / 4x4',
      seats: 5,
      fuel: 'Diesel Robuste',
    },
    rating: 4.91,
    reviewCount: 45,
    availableInAbidjan: true,
  },
  {
    id: 'toyota-hiace',
    name: 'Toyota Hiace 15 places',
    brand: 'Toyota',
    category: 'Van & Minibus',
    pricePerDayUSD: 160,
    pricePerDayFCFA: 95000,
    image: '/src/assets/images/fleet_toyota_hiace_vip_1791504618449.jpg',
    tagline: 'Minibus VIP 15 places climatisé grand confort pour délégations, navettes et cérémonies',
    specs: {
      power: '177 ch 2.8 D-4D',
      acceleration: 'Navette VIP',
      transmission: 'Automatique',
      seats: 15,
      fuel: 'Diesel Robuste',
    },
    rating: 4.96,
    reviewCount: 61,
    availableInAbidjan: true,
  },
  {
    id: 'mercedes-sprinter',
    name: 'Mercedes Sprinter',
    brand: 'Mercedes-Benz',
    category: 'Van & Minibus',
    pricePerDayUSD: 240,
    pricePerDayFCFA: 150000,
    image: '/src/assets/images/fleet_mercedes_sprinter_1791504700321.jpg',
    tagline: 'Minibus VIP d’apparat haut de gamme pour délégations ministérielles et transferts de prestige',
    specs: {
      power: '190 ch CDI',
      acceleration: 'Confort Royal',
      transmission: '7G-TRONIC PLUS',
      seats: 19,
      fuel: 'Diesel Robuste',
    },
    rating: 5.0,
    reviewCount: 52,
    availableInAbidjan: true,
  },
];

// 4 Category Cards matching layout of Image 1
export const CAR_CATEGORIES: CategoryInfo[] = [
  {
    id: 'supercar',
    name: 'Prestige &\nSupercar',
    subtitle: 'Lamborghini Urus à Abidjan',
    image: '/src/assets/images/fleet_lamborghini_urus_1791504578957.jpg',
    count: 1,
    categoryKey: 'Supercar',
  },
  {
    id: 'grand-suv',
    name: 'Grands SUV\n& 4x4 Luxe',
    subtitle: 'Chevrolet Tahoe 2025, Prado, Bestune, Buick',
    image: '/src/assets/images/fleet_chevrolet_tahoe_2025_1791504691736.jpg',
    count: 4,
    categoryKey: 'Grand SUV',
  },
  {
    id: 'van-minibus',
    name: 'Vans & Minibus\nVIP Exécutif',
    subtitle: 'Mercedes Classe V Maybach, Sprinter, Hiace 15 pl.',
    image: '/src/assets/images/fleet_mercedes_classe_v_1791504683454.jpg',
    count: 3,
    categoryKey: 'Van & Minibus',
  },
  {
    id: 'berlines-pickup',
    name: 'Berline &\nPick-Up 4x4',
    subtitle: 'Kia K5 Sport & Double Cabine Changan Hunter',
    image: '/src/assets/images/fleet_changan_hunter_1791504608281.jpg',
    count: 2,
    categoryKey: 'Berline_PickUp',
  },
];

export const POPULAR_LOCATIONS = [
  'Aéroport International Félix-Houphouët-Boigny (ABJ)',
  'Sofitel Abidjan Hôtel Ivoire, Cocody',
  'Plateau - Boulevard de la République & Cité Administrative',
  'Marcory Zone 4 - Rue Pierre & Marie Curie',
  'Deux-Plateaux Vallon, Cocody',
  'Riviera Golf & Ambassades',
  'Assinie-Mafia (Villas & Km 10)',
  'San-Pédro Port & Cité',
];

export const OFFICIAL_PHONE = '+225 05 02 03 17 17';
export const OFFICIAL_PHONE_RAW = '+2250502031717';

export type Currency = 'XOF' | 'EUR' | 'USD';

export const formatPrice = (usdAmount: number, currency: Currency): string => {
  switch (currency) {
    case 'XOF':
      return `${(Math.round(usdAmount * 600 / 1000) * 1000).toLocaleString('fr-FR')} FCFA`;
    case 'EUR':
      return `${Math.round(usdAmount * 0.92).toLocaleString('fr-FR')} €`;
    case 'USD':
      return `$${Math.round(usdAmount).toLocaleString('en-US')}`;
  }
};

export const formatPricePerDay = (usdAmount: number, currency: Currency): string => {
  switch (currency) {
    case 'XOF':
      return `${(Math.round(usdAmount * 600 / 1000) * 1000).toLocaleString('fr-FR')} FCFA / jour`;
    case 'EUR':
      return `${Math.round(usdAmount * 0.92).toLocaleString('fr-FR')} € / jour`;
    case 'USD':
      return `$${Math.round(usdAmount).toLocaleString('en-US')} / jour`;
  }
};
