import React, { useState, useEffect } from 'react';
import { Volume2, Radio as RadioIcon, Pause, Play } from 'lucide-react';
import { Match } from '../types';

interface RadioProps {
  matches: Match[];
  onMatchSelect: (match: Match) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const Radio: React.FC<RadioProps> = ({
  matches,
  onMatchSelect,
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
}) => {
  const [frequency, setFrequency] = useState(88.0);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);

  useEffect(() => {
    if (matches.length > 0) {
      onMatchSelect(matches[selectedMatchIndex]);
    }
  }, [selectedMatchIndex, matches]);

  const handleFrequencyChange = (newFreq: number) => {
    setFrequency(newFreq);
    const index = Math.floor((newFreq - 88.0) / 0.5) % matches.length;
    setSelectedMatchIndex(index);
  };

  return (
    <div className="w-[400px] h-[600px] bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg shadow-2xl p-8">
      {/* Radio Display */}
      <div className="bg-emerald-900 h-32 rounded-lg mb-8 p-4 text-emerald-400 font-mono">
        <div className="text-xs mb-2">FREQUENCY: {frequency.toFixed(1)} MHz</div>
        <div className="text-sm mb-1">
          {matches[selectedMatchIndex]?.teams.team1} vs {matches[selectedMatchIndex]?.teams.team2}
        </div>
        <div className="text-xs">
          {matches[selectedMatchIndex]?.score?.team1} | {matches[selectedMatchIndex]?.score?.team2}
        </div>
      </div>

      {/* Frequency Dial */}
      <div className="flex justify-center mb-8">
        <input
          type="range"
          min="88.0"
          max="108.0"
          step="0.5"
          value={frequency}
          onChange={(e) => handleFrequencyChange(parseFloat(e.target.value))}
          className="w-64 h-64 appearance-none rounded-full bg-amber-700 relative cursor-pointer"
          style={{
            WebkitAppearance: 'none',
            transform: 'rotate(270deg)',
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center mt-8">
        <button
          onClick={onPlayPause}
          className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center text-amber-100 hover:bg-amber-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <div className="flex items-center space-x-2">
          <Volume2 size={20} className="text-amber-100" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-24"
          />
        </div>
      </div>

      {/* Radio Speaker */}
      <div className="mt-8 grid grid-cols-3 gap-2 p-4 bg-amber-950 rounded-lg">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-full pt-[100%] bg-amber-900 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default Radio;