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
  departure: string;
  arrival: string;
  durationInMinutes: number;
  carriers: {
    marketing: Array<{
      name: string;
    }>;
  };
  segments: Array<any>;
  origin: {
    displayCode: string;
  };
  destination: {
    displayCode: string;
  };
}

export interface Flight {
  legs: FlightLeg[];
  price: {
    formatted?: string;
    raw?: string;
  };
}

export interface CabinOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}