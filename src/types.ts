export interface Match {
  id: string;
  title: string;
  status: 'live' | 'completed' | 'upcoming';
  teams: {
    team1: string;
    team2: string;
  };
  score?: {
    team1: string;
    team2: string;
  };
  date?: string;
}

export interface Commentary {
  id: string;
  text: string;
  timestamp: string;
  over: string;
  type: 'ball' | 'over' | 'wicket' | 'boundary';
}