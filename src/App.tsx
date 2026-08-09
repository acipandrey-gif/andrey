import React, { useState, useEffect, useRef } from 'react';
import { FlowerPreset, SpringConfig, AtmosphereConfig, AtmosphereTheme } from './types';
import { FLOWER_PRESETS, ATMOSPHERE_THEMES } from './utils/flowerPresets';
import { playBloomSound } from './utils/audio';
import { FlowerCanvas } from './components/FlowerCanvas';
import { SpringControls } from './components/SpringControls';
import { FlowerPresets } from './components/FlowerPresets';
import { AtmosphereSelector } from './components/AtmosphereSelector';
import { ColorCustomizer } from './components/ColorCustomizer';
import { Sparkles, Sliders, Palette, Moon, Info, Compass } from 'lucide-react';

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState<FlowerPreset>(FLOWER_PRESETS[0]);
  const [springConfig, setSpringConfig] = useState<SpringConfig>(FLOWER_PRESETS[0].defaultSpring);
  const [bloomProgress, setBloomProgress] = useState<number>(0.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [loopMode, setLoopMode] = useState<'hold' | 'cycle' | 'breathe'>('hold');
  const [windEnabled, setWindEnabled] = useState<boolean>(true);
  const [windAngle, setWindAngle] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [theme, setTheme] = useState<AtmosphereConfig>(
    ATMOSPHERE_THEMES[FLOWER_PRESETS[0].recommendedTheme]
  );
  const [customColors, setCustomColors] = useState<Record<string, [string, string, string]> | null>(null);
  const [pollenCount, setPollenCount] = useState<number>(20);
  const [activeTab, setActiveTab] = useState<'physics' | 'species' | 'palette' | 'atmosphere'>('physics');

  // Direction flag for cycle mode (1 = opening, -1 = closing)
  const directionRef = useRef<number>(1);
  const breathePhaseRef = useRef<number>(0);

  // Total petals count across layers
  const totalPetals = selectedPreset.layers.reduce((acc, layer) => acc + layer.count, 0);

  // Switch species preset and update defaults
  const handleSelectPreset = (preset: FlowerPreset) => {
    setSelectedPreset(preset);
    setSpringConfig(preset.defaultSpring);
    setTheme(ATMOSPHERE_THEMES[preset.recommendedTheme]);
    setCustomColors(null);
    setBloomProgress(0);
    setIsPlaying(true);
    directionRef.current = 1;
  };

  // Reset spring configuration to selected species defaults
  const handleResetSpring = () => {
    setSpringConfig(selectedPreset.defaultSpring);
  };

  // Gentle wind breeze animation ticker
  useEffect(() => {
    if (!windEnabled) return;
    const interval = setInterval(() => {
      setWindAngle((prev) => (prev + 1.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [windEnabled]);

  // Auto-bloom animation playback loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBloomProgress((prev) => {
        if (loopMode === 'hold') {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          const next = Math.min(1, prev + 0.008);
          if (Math.abs(next - prev) > 0.05) playBloomSound(next, soundEnabled);
          return next;
        }

        if (loopMode === 'cycle') {
          if (prev >= 1 && directionRef.current === 1) {
            directionRef.current = -1;
          } else if (prev <= 0 && directionRef.current === -1) {
            directionRef.current = 1;
          }
          const next = Math.max(0, Math.min(1, prev + directionRef.current * 0.007));
          return next;
        }

        if (loopMode === 'breathe') {
          breathePhaseRef.current += 0.03;
          const sinVal = (Math.sin(breathePhaseRef.current) + 1) / 2;
          return 0.65 + sinVal * 0.35;
        }

        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, loopMode, soundEnabled]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} ${theme.textColor} transition-colors duration-700 flex flex-col font-sans selection:bg-[#A67C52] selection:text-white relative overflow-hidden`}
    >
      {/* Editorial Giant Watermark */}
      <div className="absolute top-[-4%] left-[-2%] text-[180px] sm:text-[240px] font-black text-[#A67C52]/10 leading-none select-none uppercase tracking-tighter pointer-events-none font-serif-editorial">
        Petal
      </div>

      {/* Editorial Header Section */}
      <header className="border-b border-current/15 backdrop-blur-md sticky top-0 z-50 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-serif-editorial font-normal leading-[0.95] text-current">
              The Architecture <br />
              <span className="italic text-[#A67C52]">of Bloom</span>
            </h1>
            <p className="text-xs uppercase tracking-wider opacity-75 mt-2 font-sans font-medium max-w-md">
              A study in botanical kinetics. Simulating the gentle unfurling of {selectedPreset.name} petals using a dampened spring mechanical model.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 self-end md:self-auto">
            <div className="inline-block border border-current px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-sans font-bold">
              Phase 04: {bloomProgress >= 0.95 ? 'Full Expansion' : bloomProgress <= 0.05 ? 'Closed Bud' : 'Unfurling'}
            </div>
            <div className="text-[11px] text-right opacity-70 font-mono">
              Spring Constant: {(springConfig.stiffness / 500).toFixed(2)} <br />
              Damping Ratio: {(springConfig.damping / 20).toFixed(2)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left / Center: Interactive Blooming Flower Canvas */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className={`relative p-4 sm:p-6 rounded-2xl border ${theme.cardBg} ${theme.borderColor} shadow-xl backdrop-blur-lg`}>
            {/* Top Info Badge */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedPreset.icon}</span>
                <div>
                  <div className="font-serif-editorial text-lg font-medium">{selectedPreset.name}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 font-mono">
                    {totalPetals} Petals · {selectedPreset.layers.length} Concentric Layers
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBloomProgress(0);
                  setIsPlaying(true);
                  directionRef.current = 1;
                }}
                className="px-3 py-1.5 text-xs font-sans font-semibold uppercase tracking-wider bg-[#A67C52] hover:bg-[#8C643E] text-white rounded-md transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Re-Bloom
              </button>
            </div>

            {/* Canvas Container */}
            <FlowerCanvas
              preset={selectedPreset}
              bloomProgress={bloomProgress}
              springConfig={springConfig}
              windAngle={windAngle}
              theme={theme}
              soundEnabled={soundEnabled}
              customColors={customColors}
              pollenCount={pollenCount}
            />

            {/* Interactive Hint */}
            <div className="mt-3 text-center text-xs opacity-60 flex items-center justify-center gap-1.5 font-sans">
              <Info className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Hover or click individual petals to observe spring physics elasticity</span>
            </div>
          </div>

          {/* Species Selection Carousel */}
          <FlowerPresets
            selectedPreset={selectedPreset}
            onSelectPreset={handleSelectPreset}
            theme={theme}
          />
        </section>

        {/* Right Panel: Physics & Customization Controls */}
        <section className="lg:col-span-5 space-y-6">
          {/* Tab Navigation */}
          <div className="flex border border-current/20 bg-current/5 p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab('physics')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'physics'
                  ? 'bg-[#A67C52] text-white shadow font-semibold'
                  : 'opacity-70 hover:opacity-100 hover:bg-current/10'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Kinetics</span>
            </button>

            <button
              onClick={() => setActiveTab('palette')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'palette'
                  ? 'bg-[#A67C52] text-white shadow font-semibold'
                  : 'opacity-70 hover:opacity-100 hover:bg-current/10'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Palette</span>
            </button>

            <button
              onClick={() => setActiveTab('atmosphere')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                activeTab === 'atmosphere'
                  ? 'bg-[#A67C52] text-white shadow font-semibold'
                  : 'opacity-70 hover:opacity-100 hover:bg-current/10'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Theme</span>
            </button>
          </div>

          {/* Active Control Panel */}
          {activeTab === 'physics' && (
            <SpringControls
              springConfig={springConfig}
              setSpringConfig={setSpringConfig}
              bloomProgress={bloomProgress}
              setBloomProgress={setBloomProgress}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              loopMode={loopMode}
              setLoopMode={setLoopMode}
              windEnabled={windEnabled}
              setWindEnabled={setWindEnabled}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              theme={theme}
              onResetSpring={handleResetSpring}
            />
          )}

          {activeTab === 'palette' && (
            <ColorCustomizer
              preset={selectedPreset}
              customColors={customColors}
              setCustomColors={setCustomColors}
              theme={theme}
            />
          )}

          {activeTab === 'atmosphere' && (
            <AtmosphereSelector
              currentTheme={theme}
              onSelectTheme={(themeId: AtmosphereTheme) => setTheme(ATMOSPHERE_THEMES[themeId])}
              pollenCount={pollenCount}
              setPollenCount={setPollenCount}
            />
          )}
        </section>
      </main>

      {/* Editorial Footer Statistics Strip */}
      <footer className="border-t border-current/15 mt-8 py-6 px-4 sm:px-8 bg-current/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-sans uppercase tracking-[0.3em] opacity-60 font-bold">
            Botanical Kinetics Simulation v2.4
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#A67C52] tracking-widest">Petal Count</div>
              <div className="text-2xl font-serif-editorial font-normal tracking-tight">{totalPetals}</div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#A67C52] tracking-widest">Cycle Period</div>
              <div className="text-2xl font-serif-editorial font-normal tracking-tight">
                {Math.round(1000 / (springConfig.staggerDelay * 10))}ms
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#A67C52] tracking-widest">Ease Mode</div>
              <div className="text-2xl font-serif-editorial font-normal tracking-tight">Spring</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

