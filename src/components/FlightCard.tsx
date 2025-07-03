import React from "react";
import { Plane, Clock, DollarSign, ArrowRight } from "lucide-react";
import type { Flight } from "../types";
import { useNavigate } from "react-router-dom";

interface FlightCardProps {
  flight: Flight;
  index: number;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, index }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    // You can use a unique flight ID if available instead of index
    navigate(`/flights/${index}`, { state: { flight } });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateTime: string): string => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (dateTime: string): string => {
    return new Date(dateTime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {flight.legs?.[0]?.carriers?.marketing?.[0]?.name || "Airline"}
              </p>
              <p className="text-sm text-gray-500">
                {flight.legs?.[0]?.segments?.length || 0} stop
                {flight.legs?.[0]?.segments?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Departure</span>
              </div>
              <p className="text-lg font-semibold">
                {flight.legs?.[0]?.departure
                  ? formatTime(flight.legs[0].departure)
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                {flight.legs?.[0]?.departure
                  ? formatDate(flight.legs[0].departure)
                  : ""}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <ArrowRight className="w-4 h-4" />
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Arrival</span>
              </div>
              <p className="text-lg font-semibold">
                {flight.legs?.[0]?.arrival
                  ? formatTime(flight.legs[0].arrival)
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                {flight.legs?.[0]?.arrival
                  ? formatDate(flight.legs[0].arrival)
                  : ""}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <span>
              Duration:{" "}
              {flight.legs?.[0]?.durationInMinutes
                ? formatDuration(flight.legs[0].durationInMinutes)
                : "N/A"}
            </span>
            <span>•</span>
            <span>
              {flight.legs?.[0]?.origin?.displayCode || "N/A"} →{" "}
              {flight.legs?.[0]?.destination?.displayCode || "N/A"}
            </span>
          </div>
        </div>

        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-end">
          <div className="flex items-center gap-1 mb-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {flight.price?.formatted || flight.price?.raw || "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-3">per person</p>
          <button onClick={handleSelect} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
