import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Volume2, ArrowLeft } from 'lucide-react';

function Match() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [frequency, setFrequency] = useState(88.5);

  // Mock match data
  const matchData = {
    title: "IND vs AUS - 1st Test",
    status: "live",
    teams: {
      team1: "India",
      team2: "Australia",
      score1: "245/4",
      score2: "Yet to bat"
    },
    currentBatsmen: [
      { name: "Virat Kohli", runs: "86", balls: "142" },
      { name: "KL Rahul", runs: "34", balls: "67" }
    ],
    currentBowler: {
      name: "Pat Cummins",
      overs: "12.4",
      wickets: "2",
      runs: "45"
    },
    commentators: ["Harsha Bhogle", "Ricky Ponting"],
    recentHighlights: [
      "FOUR! Beautiful cover drive by Kohli",
      "Close call! Nearly caught at slip",
      "Strategic field change by Australia"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <Link to="/" className="text-white mb-8 flex items-center gap-2 hover:text-yellow-400">
        <ArrowLeft size={20} /> Back to Matches
      </Link>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vintage Radio UI */}
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Radio Body */}
          <div className="bg-[#3b2f2f] rounded-3xl shadow-2xl p-8 border-t-4 border-[#f4a261]">
            {/* Top Panel with Display and Frequency */}
            <div className="bg-[#2c2c2c] rounded-md p-6 mb-6">
              {/* Frequency Scale */}
              <div className="h-12 bg-[#3d3d3d] rounded-sm mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-0.5 bg-[#ffd700]"></div>
                  <div className="absolute h-full w-0.5 bg-[#ffd700] left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div className="absolute inset-0 flex justify-between px-4 items-center text-[#ffd700] text-xs font-mono">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <span key={i}>{(88 + i * 2).toString()}</span>
                  ))}
                </div>
              </div>
              
              {/* Digital Display */}
              <div className="bg-[#1a1a1a] p-4 rounded text-[#ffd700] font-mono">
                <div className="text-xs opacity-75">NOW PLAYING</div>
                <div className="text-lg">{matchData.title}</div>
                <div className="text-sm">{matchData.teams.score1} | {matchData.teams.score2}</div>
              </div>
            </div>

            {/* Control Knobs */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {['VOLUME', 'TUNE', 'MODE', 'PRESET'].map((label, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#3d3d3d] to-[#2c2c2c] border-2 border-[#f4a261] shadow-xl flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform">
                    <div className="w-1 h-8 bg-[#ffd700] rounded-full transform -rotate-45"></div>
                  </div>
                  <span className="text-[#ffd700] text-xs mt-2">{label}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row Controls */}
            <div className="grid grid-cols-3 gap-4">
              {/* Mode Buttons */}
              <button 
                className={`px-4 py-2 rounded bg-[#2c2c2c] text-[#ffd700] text-sm font-medium border border-[#f4a261] ${isPlaying ? 'bg-[#f4a261]' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button className="px-4 py-2 rounded bg-[#2c2c2c] text-[#ffd700] text-sm font-medium border border-[#f4a261]">
                AM/FM
              </button>
              <button className="px-4 py-2 rounded bg-[#2c2c2c] text-[#ffd700] text-sm font-medium border border-[#f4a261]">
                MEMORY
              </button>
            </div>

            {/* Speaker Grille */}
            <div className="mt-6 grid grid-cols-6 gap-1 bg-[#2c2c2c] p-4 rounded-lg">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-full pt-[100%] bg-[#1a1a1a] rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="space-y-8">
          {/* Current Batsmen */}
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">At the Crease</h2>
            <div className="grid grid-cols-2 gap-4">
              {matchData.currentBatsmen.map((batsman, index) => (
                <div key={index} className="text-white">
                  <div className="font-semibold">{batsman.name}</div>
                  <div className="text-[#ffd700]">{batsman.runs} ({batsman.balls})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Bowler */}
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Current Bowler</h2>
            <div className="text-white">
              <div className="font-semibold">{matchData.currentBowler.name}</div>
              <div className="text-[#ffd700]">
                {matchData.currentBowler.overs} - {matchData.currentBowler.wickets}/{matchData.currentBowler.runs}
              </div>
            </div>
          </div>

          {/* Commentators */}
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">On Air</h2>
            <div className="flex gap-4">
              {matchData.commentators.map((commentator, index) => (
                <div key={index} className="text-white">
                  <Volume2 size={16} className="inline mr-2 text-[#ffd700]" />
                  {commentator}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Highlights */}
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Highlights</h2>
            <div className="space-y-2">
              {matchData.recentHighlights.map((highlight, index) => (
                <div key={index} className="text-white flex items-start gap-2">
                  <span className="text-[#ffd700]">•</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Match;
