import React, { useState } from 'react';
import type { Match } from './types';
import { useLeagueTable } from './hooks/useLeagueTable';
import { Header } from './components/Header';
import { LeagueTable } from './components/LeagueTable';
import { AddMatchForm } from './components/AddMatchForm';
import { MatchCard } from './components/MatchCard';

const TOURNAMENT_TEAMS = [
  'Nawdeh 1', 'Nawdeh 2', 'Nadri', 'Kabul bank', 'Javanan Gudol Khal Mohammad',
  'Family group', 'Azai', 'Shahid Nawab', 'Javanan Lali', 'Shahin Talab',
  'Dala', 'Etehad', 'Shahid Mazari', 'Dewalag City', 'FC kusiner',
  'Kutesangi Star', 'FC Kutesangi', 'Javanan Kotesangi', 'Ghaznawian', 'Tahmas FC'
].sort();

const initialMatches: Match[] = [
  // Finished
  { id: 1, homeTeam: 'Nawdeh 1', awayTeam: 'Nawdeh 2', homeScore: 3, awayScore: 1, status: 'finished' },
  { id: 2, homeTeam: 'Kabul bank', awayTeam: 'Nadri', homeScore: 2, awayScore: 2, status: 'finished' },
  { id: 3, homeTeam: 'Javanan Lali', awayTeam: 'Family group', homeScore: 0, awayScore: 1, status: 'finished' },
  { id: 4, homeTeam: 'Etehad', awayTeam: 'Dala', homeScore: 4, awayScore: 2, status: 'finished' },
  { id: 5, homeTeam: 'Ghaznawian', awayTeam: 'Tahmas FC', homeScore: 1, awayScore: 1, status: 'finished' },
  
  // Upcoming
  { id: 6, homeTeam: 'FC kusiner', awayTeam: 'Kutesangi Star', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 7, homeTeam: 'Shahid Mazari', awayTeam: 'Dewalag City', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 8, homeTeam: 'FC Kutesangi', awayTeam: 'Javanan Kotesangi', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 9, homeTeam: 'Azai', awayTeam: 'Shahid Nawab', homeScore: null, awayScore: null, status: 'upcoming' },
  { id: 10, homeTeam: 'Shahin Talab', awayTeam: 'Javanan Gudol Khal Mohammad', homeScore: null, awayScore: null, status: 'upcoming' },
];


const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const leagueStats = useLeagueTable(matches, TOURNAMENT_TEAMS);

  const handleAddMatch = (homeTeam: string, awayTeam: string) => {
    const newMatch: Match = {
      id: Date.now(),
      homeTeam,
      awayTeam,
      homeScore: null,
      awayScore: null,
      status: 'upcoming',
    };
    setMatches(prevMatches => [...prevMatches, newMatch]);
  };

  const handleUpdateScore = (matchId: number, homeScore: number, awayScore: number) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId
          ? { ...match, homeScore, awayScore, status: 'finished' }
          : match
      )
    );
  };
  
  const finishedMatches = matches.filter(m => m.status === 'finished').sort((a,b) => b.id - a.id);
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').sort((a,b) => a.id - b.id);


  return (
    <>
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <AddMatchForm onAddMatch={handleAddMatch} existingTeams={TOURNAMENT_TEAMS}/>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">Matcher</h2>
               {upcomingMatches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-400 mb-3">Kommande</h3>
                  <div className="space-y-4">
                    {upcomingMatches.map(match => (
                      <MatchCard key={match.id} match={match} onUpdateScore={handleUpdateScore} />
                    ))}
                  </div>
                </div>
               )}
               {finishedMatches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-400 mb-3">Spelade</h3>
                  <div className="space-y-4">
                    {finishedMatches.map(match => (
                      <MatchCard key={match.id} match={match} onUpdateScore={handleUpdateScore} />
                    ))}
                  </div>
                </div>
               )}
               {matches.length === 0 && (
                   <div className="text-center py-10 bg-slate-800 rounded-lg">
                       <p className="text-slate-400">Inga matcher har skapats än.</p>
                   </div>
               )}
            </div>

          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <LeagueTable stats={leagueStats} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
