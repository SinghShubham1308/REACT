import React, { useState, useEffect } from "react";

export const SeriesDropdown = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("http://localhost:8081/matches/series");
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error("Failed to fetch series:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-4xl">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {loading ? (
            <p>Loading series...</p>
          ) : (
            series.map((seriesName, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 text-center cursor-pointer group"
              >
                <div className="bg-slate-200 dark:bg-slate-700 h-24 rounded-md flex items-center justify-center group-hover:opacity-80 transition-opacity">
                  {/* Placeholder for series image */}
                  <span className="text-3xl">🏆</span>
                </div>
                <p className="text-xs font-semibold mt-2 truncate">
                  {seriesName}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
