export interface User {
  id: string;
  name: string;
  email: string;
  onboardingComplete: boolean;
  preferences?: {
    travelStyle: string;
    riskTolerance: string;
    preferredDestinations: string[];
  };
  createdAt?: string;
}

export interface Destination {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  distance: string;
  travelTime: string;
  price: number;
  gravity: string;
  temperature: string;
  atmosphere: string;
  image: string;
  gallery: string[];
  rating: number;
  featured: boolean;
  highlights: string[];
  dangerLevel: 'Low' | 'Moderate' | 'High' | 'Extreme';
  oxygenLevel: string;
}

export interface Booking {
  _id: string;
  user: string;
  destination: Pick<Destination, '_id' | 'name' | 'tagline' | 'image' | 'travelTime'>;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  seatClass: 'economy' | 'business' | 'first' | 'luxury';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
