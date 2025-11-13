
import React, { useState } from 'react';

interface AddMatchFormProps {
  onAddMatch: (homeTeam: string, awayTeam: string) => void;
  existingTeams: string[];
}

export const AddMatchForm: React.FC<AddMatchFormProps> = ({ onAddMatch, existingTeams }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeTeam || !awayTeam) {
      setError('Båda lagnamnen måste fyllas i.');
      return;
    }
    if (homeTeam.trim().toLowerCase() === awayTeam.trim().toLowerCase()) {
      setError('Ett lag kan inte spela mot sig själv.');
      return;
    }
    setError('');
    onAddMatch(homeTeam.trim(), awayTeam.trim());
    setHomeTeam('');
    setAwayTeam('');
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-4 sm:p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Lägg till ny match</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="homeTeam" className="block mb-2 text-sm font-medium text-slate-400">Hemmalag</label>
          <input
            type="text"
            id="homeTeam"
            list="teams"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="T.ex. AIK"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="awayTeam" className="block mb-2 text-sm font-medium text-slate-400">Bortalag</label>
          <input
            type="text"
            id="awayTeam"
            list="teams"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            className="bg-slate-700 border border-slate-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="T.ex. Hammarby"
          />
        </div>
        <datalist id="teams">
            {existingTeams.map(team => <option key={team} value={team} />)}
        </datalist>
        <button type="submit" className="w-full md:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200">
          Skapa match
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
};
