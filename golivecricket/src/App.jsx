import { useEffect, useState } from "react";
import { MatchCard } from "./component/MatchCard";
import "./App.css";

function App() {
  // State to store the list of matches
  const [matches, setMatches] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors during API call
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:9091/matches/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data = await response.json();
        // Update the matches state
        setMatches(data);
      } catch {
        setError(e.message);
        console.error("Failed to fetch matches:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);
  // Display a loading message while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">
          Loading Matches...
        </div>
      </div>
    );
  }
  // Display an error message if the API call failed
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Failed to load data
          </h2>
          <p className="text-red-600">
            Could not fetch match data from the service. Please ensure the
            backend service is running on port 8081.
          </p>
          <p className="text-sm text-gray-500 mt-4">Error: {error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-gray-50 min-h-screen font-sans">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Live Cricket Scores
            </h1>
            <p className="text-gray-600">
              Real-time updates from around the world
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Map over the matches array and render a MatchCard for each match */}
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
