import React, { useEffect, useState } from "react";
import { MatchCard } from "./MatchCard";

export const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:9091/matches/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMatches(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch matches:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">
          Loading Matches...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Failed to load data
          </h2>
          <p className="text-red-600">
            Could not fetch match data from the service. Please ensure the
            backend service is running on port 9091.
          </p>
          <p className="text-sm text-gray-500 mt-4">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading
        ? [...Array(6)].map((_, i) => <MatchCard key={i} />)
        : matches.map((match, index) => <MatchCard key={index} match={match} />)}
    </div>
  );
};  
