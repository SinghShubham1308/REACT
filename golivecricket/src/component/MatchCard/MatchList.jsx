import React from "react";
import MatchCard from "./MatchCard";

export const MatchList = ({ title, matches, loading }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
        {title}
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
        {loading
          ? // Show skeleton loaders while data is fetching
            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
          : matches.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>
    </section>
  );
};
// A skeleton loader component to improve user experience
const SkeletonCard = () => (
  <div className="w-72 p-4 border rounded-lg shadow bg-white dark:bg-gray-800 animate-pulse">
    {/* Tournament Name */}
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-40 mb-2"></div>

    {/* Venue & Date */}
    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-56 mb-4"></div>

    {/* Team 1 */}
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
    </div>

    {/* Team 2 */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      </div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
    </div>

    {/* Match result */}
    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
  </div>
);
