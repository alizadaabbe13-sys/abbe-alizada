import { useMemo } from 'react';
import type { Match, TeamStats } from '../types';

export const useLeagueTable = (matches: Match[], initialTeams: string[]): TeamStats[] => {
  const stats = useMemo(() => {
    const teamStatsMap = new Map<string, TeamStats>();

    const getInitialStats = (name: string): TeamStats => ({
      name,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
    
    const allTeamNames = new Set(initialTeams);
    matches.forEach(match => {
        allTeamNames.add(match.homeTeam);
        allTeamNames.add(match.awayTeam);
    });

    // Initialize stats for all teams
    allTeamNames.forEach(teamName => {
        teamStatsMap.set(teamName, getInitialStats(teamName));
    });


    matches.forEach((match) => {
      if (match.status !== 'finished' || match.homeScore === null || match.awayScore === null) {
        return;
      }

      const home = teamStatsMap.get(match.homeTeam);
      const away = teamStatsMap.get(match.awayTeam);
      
      if (!home || !away) {
        return;
      }


      home.played += 1;
      away.played += 1;

      home.goalsFor += match.homeScore;
      away.goalsFor += match.awayScore;

      home.goalsAgainst += match.awayScore;
      away.goalsAgainst += match.homeScore;

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;

      if (match.homeScore > match.awayScore) {
        home.wins += 1;
        home.points += 3;
        away.losses += 1;
      } else if (match.awayScore > match.homeScore) {
        away.wins += 1;
        away.points += 3;
        home.losses += 1;
      } else {
        home.draws += 1;
        home.points += 1;
        away.draws += 1;
        away.points += 1;
      }
    });

    const sortedStats = Array.from(teamStatsMap.values()).sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
      if (a.goalsFor !== b.goalsFor) return b.goalsFor - a.goalsFor;
      return a.name.localeCompare(b.name);
    });

    return sortedStats;
  }, [matches, initialTeams]);

  return stats;
};