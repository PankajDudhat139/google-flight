export interface SearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: string;
  adults: string;
  sortBy: string;
  currency: string;
  market: string;
  countryCode: string;
}

export interface Airport {
  skyId: string;
  entityId: string;
  name: string;
  iata: string;
  city: string;
  country: string;
  type: string;
}

export interface FlightLeg {
  id: string;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  carriers: {
    marketing: Array<{
      name: string;
      logoUrl: string;
    }>;
  };
  segments: Array<any>;
  origin: {
    displayCode: string;
    city: string;
  };
  destination: {
    displayCode: string;
    city: string;
  };
  stopCount: number;
}

export interface FarePolicy {
  // Define properties as needed, for example:
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface Flight {
  price: {
    amount: number;
    formatted: string;
    raw: string;
    
  };
  legs: FlightLeg[];
  farePolicy: FarePolicy;
  tags?: string[];
}

export interface CabinOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}