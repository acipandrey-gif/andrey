import React from 'react';
import { FlowerPreset, AtmosphereConfig } from '../types';
import { FLOWER_PRESETS } from '../utils/flowerPresets';
import { Flower2, Sparkles } from 'lucide-react';

interface FlowerPresetsProps {
  selectedPreset: FlowerPreset;
  onSelectPreset: (preset: FlowerPreset) => void;
  theme: AtmosphereConfig;
}

export const FlowerPresets: React.FC<FlowerPresetsProps> = ({
  selectedPreset,
  onSelectPreset,
  theme,
}) => {
  return (
    <div className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.borderColor} shadow-xl space-y-4 font-sans`}>
      <div className="flex items-center gap-2 pb-3 border-b border-current/15">
        <Flower2 className="w-4 h-4 text-[#A67C52]" />
        <h2 className="text-base font-serif-editorial font-medium text-current">Botanical Species Index</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {FLOWER_PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`group relative p-3.5 rounded-xl border text-left transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#A67C52]/20 border-[#A67C52] shadow text-current font-bold'
                  : 'bg-current/5 border-current/15 hover:bg-current/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {preset.icon}
                </span>
                {isSelected && (
                  <Sparkles className="w-4 h-4 text-[#A67C52]" />
                )}
              </div>
              <div className="font-serif-editorial text-sm font-medium">{preset.name}</div>
              <div className="text-[11px] opacity-75 leading-snug mt-1 line-clamp-2 font-normal">
                {preset.tagline}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

