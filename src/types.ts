export interface MenuItem {
  id: string;
  name: string;
  nameTh?: string;
  price: number; // in THB ฿
  description: string;
  category: 'tea' | 'coffee' | 'pastry' | 'brunch' | 'vegan' | 'sets';
  priceCategory?: string; // "฿200–400 per person range"
  dietary?: ('Vegan' | 'Vegetarian' | 'Signature' | 'Popular' | 'Gluten-Free')[];
  image?: string;
  featured?: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface BookingRequest {
  type: 'dine-in-table' | 'garden-afternoon-tea' | 'takeout-pickup' | 'custom-cake';
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  seatingPreference: 'garden-fairytale' | 'indoor-botanical-ac' | 'any';
  specialRequests: string;
  preOrderItems: CartItem[];
  totalAmount: number;
}

export interface BookingConfirmation {
  referenceId: string;
  booking: BookingRequest;
  timestamp: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  badge: string;
  rating: number;
  dateAgo: string;
  content: string;
  isVerbatim: boolean;
  avatarText: string;
}

export interface CafeSchedule {
  day: string;
  hours: string;
  isOpenDay: boolean;
  dayIndex: number; // 0 for Sun, 1 for Mon, etc.
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  country: string;
  plusCode: string;
  googleMapsUrl: string;
  linktreeUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  menuPdfUrl: string;
  isWomenOwned: boolean;
  transitBts: string[];
  parkingInfo: string;
}
