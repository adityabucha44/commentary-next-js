import React from 'react';
import { Radio as RadioIcon, Bell, Heart, Play, Calendar } from 'lucide-react';
import { Match } from '../types';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">Cricket Radio</h1>
              <p className="text-xl text-blue-100 mb-8">Experience cricket like never before with our live ball-by-ball radio commentary. Relive the golden era of cricket radio with modern technology.</p>
              <button className="bg-amber-500 hover:bg-amber-600 text-blue-900 font-bold py-3 px-8 rounded-full flex items-center gap-2">
                <Play size={20} /> Listen Now
              </button>
            </div>
            <div className="hidden lg:block">
              <RadioIcon size={280} className="text-blue-100 opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Matches */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          Live Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveMatches.map(match => (
            <MatchCard 
              key={match.id} 
              match={match} 
              onListen={() => navigate(`/match/${match.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map(match => (
            <MatchCard 
              key={match.id} 
              match={match}
              onListen={() => navigate(`/match/${match.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Latest News */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map(news => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const MatchCard = ({ match, onListen }: { match: Match, onListen: () => void }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{match.status === 'live' ? 'LIVE' : match.date}</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-red-500">
            <Heart size={18} />
          </button>
          <button className="text-gray-400 hover:text-blue-500">
            <Bell size={18} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold">{match.teams.team1}</div>
          {match.score?.team1 && (
            <div className="text-sm font-mono">{match.score.team1}</div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="font-semibold">{match.teams.team2}</div>
          {match.score?.team2 && (
            <div className="text-sm font-mono">{match.score.team2}</div>
          )}
        </div>
      </div>
      <button 
        onClick={onListen}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
      >
        <Play size={16} /> Listen Live
      </button>
    </div>
  </div>
);

const NewsCard = ({ title, excerpt, image }: { title: string, excerpt: string, image: string }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{excerpt}</p>
    </div>
  </div>
);

// Mock data
const liveMatches: Match[] = [
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

const upcomingMatches: Match[] = [
  {
    id: '3',
    title: 'SA vs PAK - 3rd T20',
    status: 'upcoming',
    date: 'Tomorrow, 14:30',
    teams: {
      team1: 'South Africa',
      team2: 'Pakistan'
    }
  }
];

const latestNews = [
  {
    id: 1,
    title: "Kohli's Masterclass: A Century to Remember",
    excerpt: "Virat Kohli's brilliant innings helps India secure a historic win at Lords...",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "The Evolution of Cricket Commentary",
    excerpt: "From radio to digital streaming: How cricket commentary has transformed...",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Rising Stars: Next Generation of Cricket",
    excerpt: "Meet the young talents who are set to take the cricket world by storm...",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&auto=format&fit=crop&q=60"
  }
];

export default Home;