import { useState } from 'react';
import type { SearchParams, Flight, Airport } from '../types';



export const useFlightSearch = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    originSkyId: '',
    destinationSkyId: '',
    originEntityId: '',
    destinationEntityId: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    cabinClass: 'economy',
    adults: '1',
    sortBy: 'best',
    currency: 'USD',
    market: 'en-US',
    countryCode: 'US'
  });
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [originDisplay, setOriginDisplay] = useState<string>('');
  const [destinationDisplay, setDestinationDisplay] = useState<string>('');

  const searchAirports = async (query: string): Promise<Airport[]> => {
    try {
      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}&locale=en-US`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '28a1667b06msh50e3a1fce794fd5p160731jsne6a25eeba7f0',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        return data.data.map((item: any) => ({
          skyId: item.skyId,
          entityId: item.entityId,
          name: item.presentation?.suggestionTitle || item.name,
          iata: item.iata || item.skyId,
          city: item.presentation?.subtitle || item.city,
          country: item.country || '',
          type: item.type || 'airport'
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Airport search error:', error);
      return [];
    }
  };

  const searchFlights = async (): Promise<void> => {
    if (!searchParams.originSkyId || !searchParams.destinationSkyId) {
      setError('Please select both origin and destination airports');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams({
        originSkyId: searchParams.originSkyId,
        destinationSkyId: searchParams.destinationSkyId,
        originEntityId: searchParams.originEntityId,
        destinationEntityId: searchParams.destinationEntityId,
        date: searchParams.date,
        cabinClass: searchParams.cabinClass,
        adults: searchParams.adults,
        sortBy: searchParams.sortBy,
        currency: searchParams.currency,
        market: searchParams.market,
        countryCode: searchParams.countryCode
      });

      const response = await fetch(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '28a1667b06msh50e3a1fce794fd5p160731jsne6a25eeba7f0',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data && data.data.itineraries) {
        setFlights(data.data.itineraries); // Use flightData as fallback
      } else {
        setFlights([]);
        setError('No flights found for the selected criteria.');
      }
    } catch (err) {
      setError(`Error fetching flights: ${(err as Error).message}`);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SearchParams, value: string): void => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAirportChange = (type: 'origin' | 'destination', airport: Airport): void => {
    if (type === 'origin') {
      setSearchParams(prev => ({
        ...prev,
        originSkyId: airport.skyId,
        originEntityId: airport.entityId
      }));
      setOriginDisplay(`${airport.name} (${airport.iata})`);
    } else {
      setSearchParams(prev => ({
        ...prev,
        destinationSkyId: airport.skyId,
        destinationEntityId: airport.entityId
      }));
      setDestinationDisplay(`${airport.name} (${airport.iata})`);
    }
  };

  return {
    searchParams,
    flights,
    loading,
    error,
    originDisplay,
    destinationDisplay,
    searchFlights,
    handleInputChange,
    handleAirportChange,
    searchAirports
  };
};