import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search } from "lucide-react";
import type { Airport } from "../types";

interface AirportSearchProps {
  label: string;
  placeholder: string;
  value: string;
  displayValue: string;
  onChange: (airport: Airport) => void;
  onSearch: (query: string) => Promise<Airport[]>;
}

const AirportSearch: React.FC<AirportSearchProps> = ({
  label,
  placeholder,
  value,
  displayValue,
  onChange,
  onSearch,
}) => {
  const [query, setQuery] = useState(displayValue);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(displayValue);
  }, [displayValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (newQuery.length >= 2) {
      debounceRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await onSearch(newQuery);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Airport search error:", error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectAirport = (airport: Airport) => {
    setQuery(`${airport.name} (${airport.iata})`);
    setShowSuggestions(false);
    onChange(airport);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <label className="block mb-2 text-gray-700 font-semibold text-base flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-500" />
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full px-5 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900 text-base shadow-sm transition"
        />
        {loading ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-30 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto animate-fade-in">
          {suggestions.map((airport, index) => (
            <button
              key={`${airport.skyId}-${index}`}
              type="button"
              onClick={() => handleSelectAirport(airport)}
              className="w-full px-5 py-3 text-left hover:bg-blue-50 focus:bg-blue-100 focus:outline-none border-b border-gray-100 last:border-b-0 transition flex items-center gap-4"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{airport.name}</div>
                <div className="text-sm text-gray-500">
                  {airport.city}, {airport.country}
                </div>
              </div>
              <div className="text-base font-bold text-blue-600 bg-blue-50 rounded px-2 py-1">
                {airport.iata}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
