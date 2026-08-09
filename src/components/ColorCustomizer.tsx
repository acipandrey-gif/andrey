import React from 'react';
import { FlowerPreset, AtmosphereConfig } from '../types';
import { Palette, RefreshCw } from 'lucide-react';

interface ColorCustomizerProps {
  preset: FlowerPreset;
  customColors: Record<string, [string, string, string]> | null;
  setCustomColors: React.Dispatch<React.SetStateAction<Record<string, [string, string, string]> | null>>;
  theme: AtmosphereConfig;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  preset,
  customColors,
  setCustomColors,
  theme,
}) => {
  const handleColorChange = (layerId: string, colorIndex: number, newColor: string) => {
    setCustomColors((prev) => {
      const currentMap = prev || {};
      const layerColors = currentMap[layerId]
        ? [...currentMap[layerId]]
        : [...preset.layers.find((l) => l.id === layerId)!.colors];
      
      layerColors[colorIndex] = newColor;
      return {
        ...currentMap,
        [layerId]: layerColors as [string, string, string],
      };
    });
  };

  const handleResetColors = () => {
    setCustomColors(null);
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.cardBg} ${theme.borderColor} shadow-xl space-y-5 font-sans`}>
      <div className="flex items-center justify-between pb-3 border-b border-current/15">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#A67C52]" />
          <h2 className="text-base font-serif-editorial font-medium text-current">Petal Layer Color Palette</h2>
        </div>
        {customColors && (
          <button
            onClick={handleResetColors}
            className="flex items-center gap-1.5 text-xs text-[#A67C52] hover:underline transition-colors uppercase font-mono font-bold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="space-y-3">
        {preset.layers.map((layer) => {
          const activeColors = customColors?.[layer.id] || layer.colors;
          return (
            <div key={layer.id} className="p-3 bg-current/5 rounded-xl border border-current/15 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="font-serif-editorial">{layer.name} ({layer.count} petals)</span>
                <span className="text-[10px] font-mono uppercase opacity-60">{layer.shape} shape</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono opacity-60 block">Tip Highlight</span>
                  <div className="flex items-center gap-2 bg-current/5 p-1 rounded border border-current/10">
                    <input
                      type="color"
                      value={activeColors[0]}
                      onChange={(e) => handleColorChange(layer.id, 0, e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[10px] font-mono uppercase opacity-80 font-bold">
                      {activeColors[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono opacity-60 block">Mid Gradient</span>
                  <div className="flex items-center gap-2 bg-current/5 p-1 rounded border border-current/10">
                    <input
                      type="color"
                      value={activeColors[1]}
                      onChange={(e) => handleColorChange(layer.id, 1, e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[10px] font-mono uppercase opacity-80 font-bold">
                      {activeColors[1]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono opacity-60 block">Base Core</span>
                  <div className="flex items-center gap-2 bg-current/5 p-1 rounded border border-current/10">
                    <input
                      type="color"
                      value={activeColors[2]}
                      onChange={(e) => handleColorChange(layer.id, 2, e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[10px] font-mono uppercase opacity-80 font-bold">
                      {activeColors[2]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

