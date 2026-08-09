import React from 'react';
import { SpringConfig, AtmosphereConfig } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Wind, Sparkles, Sliders } from 'lucide-react';

interface SpringControlsProps {
  springConfig: SpringConfig;
  setSpringConfig: React.Dispatch<React.SetStateAction<SpringConfig>>;
  bloomProgress: number;
  setBloomProgress: (val: number) => void;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  loopMode: 'hold' | 'cycle' | 'breathe';
  setLoopMode: (mode: 'hold' | 'cycle' | 'breathe') => void;
  windEnabled: boolean;
  setWindEnabled: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  theme: AtmosphereConfig;
  onResetSpring: () => void;
}

export const SpringControls: React.FC<SpringControlsProps> = ({
  springConfig,
  setSpringConfig,
  bloomProgress,
  setBloomProgress,
  isPlaying,
  setIsPlaying,
  loopMode,
  setLoopMode,
  windEnabled,
  setWindEnabled,
  soundEnabled,
  setSoundEnabled,
  theme,
  onResetSpring,
}) => {
  const updateSpring = (key: keyof SpringConfig, value: number) => {
    setSpringConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.borderColor} shadow-xl space-y-6 transition-all font-sans`}>
      {/* Header & Main Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-current/15">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#A67C52]" />
          <h2 className="text-base font-serif-editorial font-medium text-current">Kinetics &amp; Spring Physics</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Play / Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A67C52] hover:bg-[#8C643E] rounded-md shadow transition-all active:scale-95"
            title={isPlaying ? 'Pause Animation' : 'Auto Bloom Animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto Bloom'}</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              setBloomProgress(0);
              setIsPlaying(false);
            }}
            className="p-1.5 opacity-70 hover:opacity-100 bg-current/5 hover:bg-current/10 rounded-md border border-current/20 transition-all active:scale-95"
            title="Reset Bud State"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Wind Toggle */}
          <button
            onClick={() => setWindEnabled(!windEnabled)}
            className={`p-1.5 rounded-md border transition-all active:scale-95 ${
              windEnabled
                ? 'bg-[#8DA399]/30 text-[#2D302E] border-[#8DA399] font-bold shadow-sm'
                : 'opacity-60 bg-current/5 border-current/20 hover:opacity-100'
            }`}
            title={windEnabled ? 'Gentle Breeze: On' : 'Gentle Breeze: Off'}
          >
            <Wind className="w-4 h-4" />
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-md border transition-all active:scale-95 ${
              soundEnabled
                ? 'bg-[#A67C52]/30 text-[#2D302E] border-[#A67C52] font-bold shadow-sm'
                : 'opacity-60 bg-current/5 border-current/20 hover:opacity-100'
            }`}
            title={soundEnabled ? 'Bloom Chime: On' : 'Bloom Chime: Off'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Bloom Progress Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
            Bloom Opening Progress
          </span>
          <span className="font-mono text-[#A67C52] font-bold">{Math.round(bloomProgress * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.005"
          value={bloomProgress}
          onChange={(e) => {
            setIsPlaying(false);
            setBloomProgress(parseFloat(e.target.value));
          }}
          className="w-full h-2 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52] focus:outline-none"
        />
        <div className="flex justify-between text-[10px] uppercase font-mono opacity-60">
          <span>01 · Bud</span>
          <span>02 · Unfurling</span>
          <span>03 · Expanded</span>
        </div>
      </div>

      {/* Animation Playback Mode Pills */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="uppercase text-[10px] font-bold tracking-wider opacity-70">Loop Mode:</span>
        <div className="flex gap-1.5 bg-current/5 p-1 rounded-lg border border-current/15">
          {(['hold', 'cycle', 'breathe'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setLoopMode(mode)}
              className={`px-3 py-1 rounded text-[11px] font-medium uppercase tracking-wider transition-all ${
                loopMode === mode
                  ? 'bg-[#A67C52] text-white font-bold shadow-sm'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {mode === 'hold' ? 'Hold' : mode === 'cycle' ? 'Cycle' : 'Pulse'}
            </button>
          ))}
        </div>
      </div>

      {/* Spring Easing Sliders */}
      <div className="space-y-4 pt-3 border-t border-current/15">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#A67C52]">
            Spring Mechanical Easing
          </span>
          <button
            onClick={onResetSpring}
            className="text-[11px] text-[#A67C52] hover:underline transition-colors uppercase font-mono"
          >
            Reset Defaults
          </button>
        </div>

        {/* Stiffness */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Stiffness (Tension)</span>
            <span className="font-mono text-[#A67C52] font-bold">{springConfig.stiffness}</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="1"
            value={springConfig.stiffness}
            onChange={(e) => updateSpring('stiffness', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52]"
          />
          <div className="flex justify-between text-[10px] opacity-60 font-mono">
            <span>Silky / Gentle</span>
            <span>Rigid / Snappy</span>
          </div>
        </div>

        {/* Damping */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Damping (Friction)</span>
            <span className="font-mono text-[#A67C52] font-bold">{springConfig.damping}</span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="0.5"
            value={springConfig.damping}
            onChange={(e) => updateSpring('damping', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52]"
          />
          <div className="flex justify-between text-[10px] opacity-60 font-mono">
            <span>Oscillating Bounce</span>
            <span>Smooth Settle</span>
          </div>
        </div>

        {/* Mass */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Mass (Petal Weight)</span>
            <span className="font-mono text-[#A67C52] font-bold">{springConfig.mass}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={springConfig.mass}
            onChange={(e) => updateSpring('mass', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52]"
          />
          <div className="flex justify-between text-[10px] opacity-60 font-mono">
            <span>Featherlight</span>
            <span>Heavy Velvet</span>
          </div>
        </div>

        {/* Stagger Delay */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Petal Stagger Delay</span>
            <span className="font-mono text-[#A67C52] font-bold">{springConfig.staggerDelay.toFixed(2)}s</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.25"
            step="0.01"
            value={springConfig.staggerDelay}
            onChange={(e) => updateSpring('staggerDelay', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52]"
          />
          <div className="flex justify-between text-[10px] opacity-60 font-mono">
            <span>Simultaneous</span>
            <span>Cascading Waves</span>
          </div>
        </div>
      </div>
    </div>
  );
};

