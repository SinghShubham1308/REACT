import React from "react";

export const MatchCard = ({ match }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {match.matchNumberVenue}
        </p>
        <p className="text-sm font-bold text-gray-800 dark:text-white truncate mt-1">
          {match.teamHeading}
        </p>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <img
                src={match.battingTeamImg}
                alt={match.battingTeam}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="font-medium">{match.battingTeam}</span>
            </div>
            <span className="font-bold text-base">
              {match.battingTeamScore}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <img
                src={match.bowlTeamImg}
                alt={match.bowlTeam}
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="font-medium">{match.bowlTeam}</span>
            </div>
            <span className="font-bold text-base">{match.bowlTeamScore}</span>
          </div>
        </div>
      </div>
      <div className="bg-green-50 text-green-700 dark:text-green-400 text-center text-xs font-semibold py-2 px-4 rounded-b-lg">
        {match.status}
      </div>
    </div>
  );
};
