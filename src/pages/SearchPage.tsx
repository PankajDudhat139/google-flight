import React from "react";
import SearchForm from "../components/SearchForm";
import FlightResults from "../components/FlightResults";
import { useFlightSearch } from "../hooks/useFlightSearch";

const App: React.FC = () => {
  const {
    searchParams,
    flights,
    loading,
    error,
    originDisplay,
    destinationDisplay,
    searchFlights,
    handleInputChange,
    handleAirportChange,
    searchAirports,
  } = useFlightSearch();

  return (
    <>
      <SearchForm
        searchParams={searchParams}
        loading={loading}
        originDisplay={originDisplay}
        destinationDisplay={destinationDisplay}
        onInputChange={handleInputChange}
        onAirportChange={handleAirportChange}
        onSearch={searchFlights}
        onAirportSearch={searchAirports}
      />

      <FlightResults flights={flights} loading={loading} error={error} />
    </>
  );
};

export default App;
