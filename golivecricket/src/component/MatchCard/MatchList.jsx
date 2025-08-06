import React from 'react';
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
  <div className="flex-shrink-0 w-80 h-48 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-slate-700"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mt-4"></div>
  </div>
);
