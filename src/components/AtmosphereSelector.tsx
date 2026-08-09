import React from 'react';
import { AtmosphereTheme, AtmosphereConfig } from '../types';
import { ATMOSPHERE_THEMES } from '../utils/flowerPresets';
import { Sun, Moon, Sparkles, Feather } from 'lucide-react';

interface AtmosphereSelectorProps {
  currentTheme: AtmosphereConfig;
  onSelectTheme: (themeId: AtmosphereTheme) => void;
  pollenCount: number;
  setPollenCount: (val: number) => void;
}

export const AtmosphereSelector: React.FC<AtmosphereSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  pollenCount,
  setPollenCount,
}) => {
  return (
    <div className={`p-6 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.borderColor} shadow-xl space-y-5 font-sans`}>
      <div className="flex items-center justify-between pb-3 border-b border-current/15">
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#A67C52]" />
          <h2 className="text-base font-serif-editorial font-medium text-current">Gallery Atmosphere &amp; Canvas</h2>
        </div>
      </div>

      {/* Theme Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {(Object.keys(ATMOSPHERE_THEMES) as AtmosphereTheme[]).map((themeKey) => {
          const theme = ATMOSPHERE_THEMES[themeKey];
          const isSelected = currentTheme.id === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#A67C52]/20 border-[#A67C52] shadow text-current font-bold'
                  : 'bg-current/5 border-current/15 hover:bg-current/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif-editorial text-xs font-medium">{theme.name}</span>
                {themeKey === 'botanical-linen' && <Feather className="w-3.5 h-3.5 text-[#A67C52]" />}
                {themeKey === 'gallery-noir' && <Moon className="w-3.5 h-3.5 text-[#FAF9F6]" />}
                {themeKey === 'sage-herbarium' && <Sparkles className="w-3.5 h-3.5 text-[#8DA399]" />}
                {themeKey === 'golden-hour' && <Sun className="w-3.5 h-3.5 text-[#F9D423]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Pollen Dust Control */}
      <div className="space-y-1.5 pt-3 border-t border-current/15">
        <div className="flex justify-between items-center text-xs">
          <span className="uppercase text-[10px] font-bold tracking-wider opacity-70">Floating Botanical Spores</span>
          <span className="font-mono text-[#A67C52] font-bold">{pollenCount} particles</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={pollenCount}
          onChange={(e) => setPollenCount(parseInt(e.target.value))}
          className="w-full h-1.5 bg-current/15 rounded-lg appearance-none cursor-pointer accent-[#A67C52]"
        />
      </div>
    </div>
  );
};

