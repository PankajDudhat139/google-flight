import React from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Flight } from "../types";
import Image from "../assets/flights_dark.svg";

function formatDateTime(dt: string) {
  const d = new Date(dt);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

const FlightDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const flight: Flight = location.state?.flight;

  if (!flight) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No flight data available
      </p>
    );
  }

  return (
    <div className="mx-auto p-6">
      <div className="gap-4 mb-6">
        <img src={Image} alt={flight.legs[0].carriers.marketing[0].name} />
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Flight #{id}</h1>
          <div className="text-lg text-blue-600 font-semibold">
            {flight.price.formatted}
          </div>
          <div className="flex gap-2 mt-1">
            {flight.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {flight.legs.map((leg, idx) => (
          <div
            key={leg.id}
            className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row gap-6"
          >
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src={leg.carriers.marketing[0].logoUrl}
                alt={leg.carriers.marketing[0].name}
                className="w-12 h-12 rounded mb-2"
              />
              <span className="text-xs text-gray-500">
                {leg.carriers.marketing[0].name}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {leg.origin.displayCode}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-semibold">
                      {leg.destination.displayCode}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 text-start">
                    {leg.origin.city} &rarr; {leg.destination.city}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">Departure:</span>{" "}
                    {formatDateTime(leg.departure)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Arrival:</span>{" "}
                    {formatDateTime(leg.arrival)}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm">
                    <span className="font-medium">Duration:</span>{" "}
                    {formatDuration(leg.durationInMinutes)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Stops:</span>{" "}
                    {leg.stopCount === 0
                      ? "Direct"
                      : `${leg.stopCount} stop(s)`}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Flight #:</span>{" "}
                    {leg.segments[0].flightNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Fare Policy</h2>
        <ul className="text-sm text-gray-700 grid grid-cols-2 gap-2">
          <li>
            Change Allowed:{" "}
            <span
              className={
                flight.farePolicy.isChangeAllowed
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {flight.farePolicy.isChangeAllowed ? "Yes" : "No"}
            </span>
          </li>
          <li>
            Partially Changeable:{" "}
            <span
              className={
                flight.farePolicy.isPartiallyChangeable
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {flight.farePolicy.isPartiallyChangeable ? "Yes" : "No"}
            </span>
          </li>
          <li>
            Cancellation Allowed:{" "}
            <span
              className={
                flight.farePolicy.isCancellationAllowed
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {flight.farePolicy.isCancellationAllowed ? "Yes" : "No"}
            </span>
          </li>
          <li>
            Partially Refundable:{" "}
            <span
              className={
                flight.farePolicy.isPartiallyRefundable
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {flight.farePolicy.isPartiallyRefundable ? "Yes" : "No"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FlightDetail;
