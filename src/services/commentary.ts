import axios from 'axios';
import { Match, Commentary } from '../types';

// This is a mock service - in production, you would integrate with a real cricket API
export const getMatches = async (): Promise<Match[]> => {
  // Simulated API call
  return [
    {
      id: '1',
      title: 'IND vs AUS - 1st Test',
      status: 'live',
      teams: {
        team1: 'India',
        team2: 'Australia'
      },
      score: {
        team1: '245/4',
        team2: 'Yet to bat'
      }
    },
    {
      id: '2',
      title: 'ENG vs NZ - 2nd ODI',
      status: 'live',
      teams: {
        team1: 'England',
        team2: 'New Zealand'
      },
      score: {
        team1: '189/3',
        team2: 'Yet to bat'
      }
    }
  ];
};

export const getCommentary = async (matchId: string): Promise<Commentary[]> => {
  // Simulated API call
  return [
    {
      id: '1',
      text: 'Bumrah steams in, delivers a perfect yorker, and Root manages to dig it out.',
      timestamp: new Date().toISOString(),
      over: '12.4',
      type: 'ball'
    },
    {
      id: '2',
      text: 'FOUR! Brilliant cover drive by Root, finds the gap perfectly.',
      timestamp: new Date().toISOString(),
      over: '12.5',
      type: 'boundary'
    }
  ];
};