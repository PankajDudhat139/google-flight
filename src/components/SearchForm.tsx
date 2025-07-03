import React from "react";
import { Search, Calendar, Users } from "lucide-react";
import type { SearchParams, CabinOption, SortOption, Airport } from "../types";
import AirportSearch from "./AirportSearch";

interface SearchFormProps {
  searchParams: SearchParams;
  loading: boolean;
  originDisplay: string;
  destinationDisplay: string;
  onInputChange: (field: keyof SearchParams, value: string) => void;
  onAirportChange: (type: "origin" | "destination", airport: Airport) => void;
  onSearch: () => void;
  onAirportSearch: (query: string) => Promise<Airport[]>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchParams,
  loading,
  originDisplay,
  destinationDisplay,
  onInputChange,
  onAirportChange,
  onSearch,
  onAirportSearch,
}) => {
  const cabinOptions: CabinOption[] = [
    { value: "economy", label: "Economy" },
    { value: "premium_economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First" },
  ];

  const sortOptions: SortOption[] = [
    { value: "best", label: "Best" },
    { value: "price_high", label: "Price (High to Low)" },
    { value: "price_low", label: "Price (Low to High)" },
    { value: "duration", label: "Duration" },
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center tracking-tight">
        Find Your Flight
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AirportSearch
          label="From"
          placeholder="Departure city or airport"
          value={searchParams.originSkyId}
          displayValue={originDisplay}
          onChange={(airport) => onAirportChange("origin", airport)}
          onSearch={onAirportSearch}
        />
        <AirportSearch
          label="To"
          placeholder="Destination city or airport"
          value={searchParams.destinationSkyId}
          displayValue={destinationDisplay}
          onChange={(airport) => onAirportChange("destination", airport)}
          onSearch={onAirportSearch}
        />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Departure
          </label>
          <input
            type="date"
            value={searchParams.date}
            min={today}
            onChange={(e) => onInputChange("date", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <Users className="w-4 h-4" />
            Passengers
          </label>
          <div className="relative">
            <select
              value={searchParams.adults}
              onChange={(e) => onInputChange("adults", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none pr-10"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num}>
                  {num} Adult{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-start">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Class
          </label>
          <div className="relative">
            <select
              value={searchParams.cabinClass}
              onChange={(e) => onInputChange("cabinClass", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none pr-10"
            >
              {cabinOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Currency
          </label>
          <div className="relative">
            <select
              value={searchParams.currency}
              onChange={(e) => onInputChange("currency", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none pr-10"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort by
          </label>
          <div className="relative">
            <select
              value={searchParams.sortBy}
              onChange={(e) => onInputChange("sortBy", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition appearance-none pr-10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onSearch}
        disabled={
          loading || !searchParams.originSkyId || !searchParams.destinationSkyId
        }
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-lg shadow transition"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Searching...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Search Flights
          </>
        )}
      </button>
    </div>
  );
};

export default SearchForm;
