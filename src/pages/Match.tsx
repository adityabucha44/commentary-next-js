import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Volume2, ArrowLeft } from 'lucide-react';

function Match() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [frequency, setFrequency] = useState(88.5);
  const [currentCommentary, setCurrentCommentary] = useState("Cummins to Kohli, short leg is up, and Kohli defends on backfoot.");

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
    ],
    commentary: [
      "Cummins to Kohli, short leg is up, and Kohli defends on backfoot.",
      "Cummins to Rahul, good length delivery outside off, left alone.",
      "Cummins bowls a bouncer, Kohli ducks under it."
    ]
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentCommentary(matchData.commentary[index]);
      index = (index + 1) % matchData.commentary.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to adjust frequency
  const handleFrequencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFrequency = Math.min(108, Math.max(88, parseFloat(event.target.value)));
    setFrequency(newFrequency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-8">
      <Link to="/" className="text-white mb-8 flex items-center gap-2 hover:text-yellow-400">
        <ArrowLeft size={20} /> Back to Matches
      </Link>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vintage Radio UI */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="bg-[#3b2f2f] rounded-3xl shadow-2xl p-8 border-t-4 border-[#f4a261]">
            {/* Top Panel with Display and Frequency */}
            <div className="bg-[#2c2c2c] rounded-md p-6 mb-6">
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
              <div className="bg-[#1a1a1a] p-4 rounded text-[#ffd700] font-mono">
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

            {/* Frequency Knob */}
            <div className="flex justify-center mt-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#3d3d3d] to-[#2c2c2c] border-2 border-[#f4a261] shadow-lg flex items-center justify-center">
                <input
                  type="range"
                  min="88"
                  max="108"
                  step="0.1"
                  value={frequency}
                  onChange={handleFrequencyChange}
                  className="w-24 absolute top-0 left-0 opacity-0"
                />
                <div className="text-[#ffd700] font-bold text-lg">{frequency.toFixed(1)} MHz</div>
              </div>
            </div>
          </div>
        </div>

        {/* Match Screen */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl shadow-2xl p-8 border-t-4 border-[#f4a261]">
            <div className="text-center text-[#ff0000] text-2xl mt-6" style={{
              fontFamily: '"Press Start 2P", cursive',
              letterSpacing: '2px',
              textShadow: '0 0 8px #ff0000, 0 0 16px #ff0000'
            }}>
              {currentCommentary}
            </div>
          </div>

          {/* Match Info */}
          <div className="mt-8 space-y-8">
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
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Current Bowler</h2>
              <div className="text-white">
                <div className="font-semibold">{matchData.currentBowler.name}</div>
                <div className="text-[#ffd700]">
                  {matchData.currentBowler.overs} - {matchData.currentBowler.wickets}/{matchData.currentBowler.runs}
                </div>
              </div>
            </div>
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
    </div>
  );
}

export default Match;
