import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { FlowerPreset, SpringConfig, AtmosphereConfig } from '../types';
import { Petal } from './Petal';

interface FlowerCanvasProps {
  preset: FlowerPreset;
  bloomProgress: number; // 0 to 1
  springConfig: SpringConfig;
  windAngle: number;
  theme: AtmosphereConfig;
  soundEnabled: boolean;
  customColors?: Record<string, [string, string, string]> | null;
  pollenCount?: number;
}

export const FlowerCanvas: React.FC<FlowerCanvasProps> = ({
  preset,
  bloomProgress,
  springConfig,
  windAngle,
  theme,
  soundEnabled,
  customColors,
  pollenCount = 20,
}) => {
  // Generate floating pollen particles
  const pollenParticles = useMemo(() => {
    return Array.from({ length: pollenCount }).map((_, i) => ({
      id: i,
      x: (Math.sin(i * 12.3) * 0.5 + 0.5) * 440 - 220,
      y: (Math.cos(i * 7.8) * 0.5 + 0.5) * 360 - 240,
      size: 2 + (i % 4) * 1.2,
      duration: 3 + (i % 5) * 1.5,
      delay: (i % 7) * 0.4,
    }));
  }, [pollenCount]);

  // Stem curve points affected by gentle wind angle
  const stemSway = Math.sin((windAngle * Math.PI) / 180) * 14;
  const stemPath = `M 0,0 Q ${preset.stem.curve + stemSway},${preset.stem.height * 0.5} ${stemSway * 0.5},${preset.stem.height}`;

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl select-none">
      {/* Radial Ambient Glow Aura behind flower */}
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
        }}
        animate={{
          scale: 0.8 + bloomProgress * 0.6,
          opacity: 0.3 + bloomProgress * 0.6,
        }}
        transition={{
          type: 'spring',
          stiffness: springConfig.stiffness * 0.5,
          damping: springConfig.damping,
        }}
      />

      {/* Floating Pollen Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {pollenParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '42%',
              width: particle.size,
              height: particle.size,
              backgroundColor: theme.particleColor,
              boxShadow: `0 0 6px ${theme.particleColor}`,
            }}
            animate={{
              x: [particle.x - 20, particle.x + 20, particle.x - 20],
              y: [particle.y, particle.y - 80, particle.y - 160],
              opacity: [0, 0.8 * bloomProgress, 0],
              scale: [0.5, 1.2, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main SVG Scene */}
      <svg
        viewBox="-250 -280 500 520"
        className="w-full h-full max-w-[620px] max-h-[620px] drop-shadow-2xl overflow-visible"
      >
        <defs>
          {/* Stem gradient */}
          <linearGradient id="stem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor={preset.stem.color} />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Sepal gradient */}
          <linearGradient id="sepal-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          {/* Center Stamen Radial Glow */}
          <radialGradient id="stamen-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor={preset.center.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={preset.center.accentColor} stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* --- STEM & LEAVES --- */}
        <g id="flower-stem-group">
          {/* Stem Path */}
          <path
            d={stemPath}
            fill="none"
            stroke="url(#stem-grad)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Leaves */}
          <g transform={`translate(${stemSway * 0.3}, ${preset.stem.height * 0.45})`}>
            {/* Left Leaf */}
            <motion.path
              d="M 0,0 C -35,-15 -55,-5 -65,15 C -45,30 -20,20 0,0 Z"
              fill="url(#leaf-grad)"
              stroke="#15803d"
              strokeWidth="0.8"
              animate={{
                rotate: [0, 4 + Math.sin(windAngle * 0.05) * 3, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Right Leaf */}
            <motion.path
              d="M 0,0 C 35,-18 58,-10 68,10 C 48,28 22,18 0,0 Z"
              fill="url(#leaf-grad)"
              stroke="#15803d"
              strokeWidth="0.8"
              animate={{
                rotate: [0, -4 - Math.cos(windAngle * 0.05) * 3, 0],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </g>
        </g>

        {/* --- SEPALS (Outer green base leaves) --- */}
        <g id="sepal-group">
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <path
              key={`sepal-${idx}`}
              d="M 0,0 C -12,10 -18,35 0,55 C 18,35 12,10 0,0 Z"
              fill="url(#sepal-grad)"
              transform={`rotate(${angle + stemSway * 0.2}) scale(${0.8 + (1 - bloomProgress) * 0.3})`}
              opacity={0.85}
            />
          ))}
        </g>

        {/* --- PETALS (Rendered from outer layers to inner layers) --- */}
        <g id="petals-group">
          {preset.layers.map((layer, layerIdx) => (
            <g key={layer.id} id={`layer-${layer.id}`}>
              {Array.from({ length: layer.count }).map((_, petalIdx) => (
                <Petal
                  key={`${layer.id}-petal-${petalIdx}`}
                  petalIndex={petalIdx}
                  totalInLayer={layer.count}
                  layerIndex={layerIdx}
                  layerConfig={layer}
                  bloomProgress={bloomProgress}
                  springConfig={springConfig}
                  windAngle={windAngle}
                  soundEnabled={soundEnabled}
                  customColors={customColors?.[layer.id] || null}
                />
              ))}
            </g>
          ))}
        </g>

        {/* --- FLOWER CENTER / STAMEN / PISTIL --- */}
        <motion.g
          id="flower-center-group"
          animate={{
            scale: 0.2 + bloomProgress * 0.8,
            opacity: bloomProgress > 0.05 ? 1 : bloomProgress * 20,
          }}
          transition={{
            type: 'spring',
            stiffness: springConfig.stiffness * 1.2,
            damping: springConfig.damping,
            delay: springConfig.staggerDelay * preset.layers.length,
          }}
        >
          {/* Filaments / Stamen Ring */}
          {(preset.center.type === 'stamen-ring' || preset.center.type === 'filament-cluster') && (
            <g id="filaments">
              {Array.from({ length: preset.center.filamentCount || 20 }).map((_, fIdx) => {
                const fAngle = (360 / (preset.center.filamentCount || 20)) * fIdx;
                const fLen = preset.center.radius * 0.85;
                return (
                  <g key={`filament-${fIdx}`} transform={`rotate(${fAngle})`}>
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2={-fLen}
                      stroke="#fef08a"
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                    />
                    <circle
                      cx="0"
                      cy={-fLen}
                      r="2.8"
                      fill={preset.center.accentColor}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Seed-head disk pattern for Sunflower */}
          {preset.center.type === 'seed-head' && (
            <g id="sunflower-disc">
              <circle cx="0" cy="0" r={preset.center.radius} fill={preset.center.color} />
              {Array.from({ length: 48 }).map((_, sIdx) => {
                const r = Math.sqrt(sIdx) * 5.2;
                const theta = sIdx * 137.5 * (Math.PI / 180);
                return (
                  <circle
                    key={`seed-${sIdx}`}
                    cx={r * Math.cos(theta)}
                    cy={r * Math.sin(theta)}
                    r="2.2"
                    fill={preset.center.accentColor}
                  />
                );
              })}
            </g>
          )}

          {/* Glowing central disc */}
          <circle
            cx="0"
            cy="0"
            r={preset.center.radius * 0.65}
            fill="url(#stamen-glow)"
            stroke="#ffffff"
            strokeWidth="1"
            className="drop-shadow-md"
          />

          {/* Center core highlight point */}
          <circle cx="0" cy="0" r={preset.center.radius * 0.2} fill="#ffffff" opacity="0.8" />
        </motion.g>
      </svg>
    </div>
  );
};
