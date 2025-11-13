
import React from 'react';
import type { TeamStats } from '../types';

interface LeagueTableProps {
  stats: TeamStats[];
}

export const LeagueTable: React.FC<LeagueTableProps> = ({ stats }) => {
  const columns = [
    { label: '#', key: 'rank' },
    { label: 'Lag', key: 'name' },
    { label: 'S', key: 'played', title: 'Spelade' },
    { label: 'V', key: 'wins', title: 'Vunna' },
    { label: 'O', key: 'draws', title: 'Oavgjorda' },
    { label: 'F', key: 'losses', title: 'Förlorade' },
    { label: 'GM', key: 'goalsFor', title: 'Gjorda Mål' },
    { label: 'IM', key: 'goalsAgainst', title: 'Insläppta Mål' },
    { label: 'MS', key: 'goalDifference', title: 'Målskillnad' },
    { label: 'P', key: 'points', title: 'Poäng' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Tabell</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-slate-400 uppercase bg-slate-700/50">
            <tr>
              {columns.map(col => (
                <th key={col.key} scope="col" className="px-3 py-3" title={col.title || col.label}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((team, index) => (
              <tr key={team.name} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-200">
                <td className="px-3 py-4 font-medium text-white">{index + 1}</td>
                <td className="px-3 py-4 font-bold text-white whitespace-nowrap">{team.name}</td>
                <td className="px-3 py-4">{team.played}</td>
                <td className="px-3 py-4">{team.wins}</td>
                <td className="px-3 py-4">{team.draws}</td>
                <td className="px-3 py-4">{team.losses}</td>
                <td className="px-3 py-4">{team.goalsFor}</td>
                <td className="px-3 py-4">{team.goalsAgainst}</td>
                <td className="px-3 py-4">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                <td className="px-3 py-4 font-bold text-white">{team.points}</td>
              </tr>
            ))}
             {stats.length === 0 && (
                <tr>
                    <td colSpan={columns.length} className="text-center py-8 text-slate-400">
                        Inga matcher spelade än.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
