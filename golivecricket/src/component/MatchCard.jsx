import React from "react";

export const MatchCard = ({ match }) => {
  // Helper to format the date
  const formattedDate = new Date(match.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-5">
        <p className="text-sm text-gray-500">{match.matchNumberVenue}</p>
        <h2 className="text-xl font-bold text-gray-800 mt-1">
          {match.teamHeading}
        </h2>
        <p className="text-xs text-gray-400">{formattedDate}</p>

        <div className="mt-4 space-y-2">
          {/* Batting Team Score */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span className="font-semibold text-gray-700">
              {match.battingTeam}
            </span>
            <span className="font-bold text-lg text-gray-900">
              {match.battingTeamScore}
            </span>
          </div>
          {/* Bowling Team Score */}
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span className="font-semibold text-gray-700">
              {match.bowlTeam}
            </span>
            <span className="font-bold text-lg text-gray-900">
              {match.bowlTeamScore}
            </span>
          </div>
        </div>
      </div>

      {/* Footer of the card with match status */}
      <div className="bg-green-100 text-green-800 text-center font-semibold py-3 px-5">
        {match.liveText}
      </div>
    </div>
  );
};

