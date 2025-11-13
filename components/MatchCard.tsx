
import React, { useState, useEffect } from 'react';
import type { Match } from '../types';

interface MatchCardProps {
  match: Match;
  onUpdateScore: (matchId: number, homeScore: number, awayScore: number) => void;
}

const TeamDisplay: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
      <span className="text-lg font-bold text-white">{name.substring(0, 2).toUpperCase()}</span>
    </div>
    <span className="font-semibold text-sm sm:text-base text-white">{name}</span>
  </div>
);

export const MatchCard: React.FC<MatchCardProps> = ({ match, onUpdateScore }) => {
  const [homeScore, setHomeScore] = useState<string>(match.homeScore?.toString() ?? '');
  const [awayScore, setAwayScore] = useState<string>(match.awayScore?.toString() ?? '');

  useEffect(() => {
    setHomeScore(match.homeScore?.toString() ?? '');
    setAwayScore(match.awayScore?.toString() ?? '');
  }, [match]);

  const handleUpdate = () => {
    const home = parseInt(homeScore, 10);
    const away = parseInt(awayScore, 10);
    if (!isNaN(home) && !isNaN(away) && home >= 0 && away >= 0) {
      onUpdateScore(match.id, home, away);
    }
  };

  const hasChanged = 
    (homeScore !== (match.homeScore?.toString() ?? '')) || 
    (awayScore !== (match.awayScore?.toString() ?? ''));

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-around">
        <TeamDisplay name={match.homeTeam} />

        <div className="flex items-center gap-2 sm:gap-4 text-center">
          <input
            type="number"
            min="0"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="w-12 sm:w-16 bg-slate-700/80 text-white text-2xl sm:text-3xl font-bold text-center rounded-md p-1 border-2 border-transparent focus:border-blue-500 focus:outline-none"
          />
          <span className="text-2xl font-light text-slate-400">-</span>
          <input
            type="number"
            min="0"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-12 sm:w-16 bg-slate-700/80 text-white text-2xl sm:text-3xl font-bold text-center rounded-md p-1 border-2 border-transparent focus:border-blue-500 focus:outline-none"
          />
        </div>

        <TeamDisplay name={match.awayTeam} />
      </div>

      {hasChanged && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpdate}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center transition-colors duration-200"
          >
            Spara resultat
          </button>
        </div>
      )}
    </div>
  );
};
