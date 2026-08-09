import React from 'react';
import { motion } from 'motion/react';
import { PetalLayerConfig, SpringConfig } from '../types';
import { generatePetalPath } from '../utils/flowerPresets';
import { playPetalRustle } from '../utils/audio';

interface PetalProps {
  petalIndex: number;
  totalInLayer: number;
  layerIndex: number;
  layerConfig: PetalLayerConfig;
  bloomProgress: number; // 0 (bud) to 1 (full bloom)
  springConfig: SpringConfig;
  windAngle: number;
  soundEnabled: boolean;
  customColors?: [string, string, string] | null;
}

export const Petal: React.FC<PetalProps> = ({
  petalIndex,
  totalInLayer,
  layerIndex,
  layerConfig,
  bloomProgress,
  springConfig,
  windAngle,
  soundEnabled,
  customColors,
}) => {
  // Base angle around the flower center (0° is pointing up)
  const baseAngle = (360 / totalInLayer) * petalIndex + layerConfig.baseAngleOffset;

  // Stagger delay calculation: Outer layers open first, followed by inner layers
  // Individual petals within a layer stagger slightly in a spiral pattern
  const layerStagger = layerIndex * (springConfig.staggerDelay * 1.5);
  const petalStagger = (petalIndex / totalInLayer) * springConfig.staggerDelay;
  const totalDelay = layerStagger + petalStagger;

  // Compute animated properties based on bloomProgress (0 = bud, 1 = open)
  // Interpolate 3D rotation, scale, and curl angle
  const currentScale = layerConfig.budScale + (layerConfig.openScale - layerConfig.budScale) * bloomProgress;
  const currentRotateX = layerConfig.budRotateX - (layerConfig.budRotateX - layerConfig.openRotateX) * bloomProgress;
  const currentRotateZ = layerConfig.budRotateZ * (1 - bloomProgress);

  // Wind sway effect applies slightly more to outer petals
  const sway = Math.sin((windAngle * Math.PI) / 180 + petalIndex) * (3 + layerIndex * 1.5) * bloomProgress;
  const finalAngle = baseAngle + sway;

  const gradientId = `petal-grad-${layerConfig.id}-${layerIndex}-${petalIndex}`;
  const pathData = generatePetalPath(layerConfig.length, layerConfig.width, layerConfig.shape, layerConfig.curve);

  const colors = customColors || layerConfig.colors;

  return (
    <g transform={`rotate(${finalAngle})`}>
      <defs>
        {/* Rich linear gradient from tip to base */}
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={colors[2]} stopOpacity={layerConfig.opacity} />
          <stop offset="50%" stopColor={colors[1]} stopOpacity={layerConfig.opacity} />
          <stop offset="100%" stopColor={colors[0]} stopOpacity={layerConfig.opacity} />
        </linearGradient>

        {/* Soft specular highlight overlay */}
        <linearGradient id={`${gradientId}-highlight`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <motion.g
        style={{
          transformOrigin: '0px 0px',
        }}
        initial={{
          scale: layerConfig.budScale,
          rotateX: layerConfig.budRotateX,
          rotateZ: layerConfig.budRotateZ,
        }}
        animate={{
          scale: currentScale,
          rotateX: currentRotateX,
          rotateZ: currentRotateZ,
        }}
        transition={{
          type: 'spring',
          stiffness: springConfig.stiffness,
          damping: springConfig.damping,
          mass: springConfig.mass,
          delay: totalDelay,
        }}
        whileHover={{
          scale: currentScale * 1.08,
          rotateZ: currentRotateZ + 4,
          transition: { type: 'spring', stiffness: 350, damping: 14 },
        }}
        onMouseEnter={() => playPetalRustle(soundEnabled)}
        className="cursor-pointer select-none"
      >
        {/* Drop shadow for layer depth */}
        <path
          d={pathData}
          fill="rgba(0,0,0,0.18)"
          transform="translate(1, 3) scale(0.98)"
          style={{ filter: 'blur(3px)' }}
        />

        {/* Main Petal Shape */}
        <path
          d={pathData}
          fill={`url(#${gradientId})`}
          stroke={colors[0]}
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />

        {/* Highlight overlay */}
        <path
          d={pathData}
          fill={`url(#${gradientId}-highlight)`}
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* Central Vein Line */}
        <path
          d={`M 0,0 C 0,${-layerConfig.length * 0.3} 0,${-layerConfig.length * 0.7} 0,${-layerConfig.length * 0.88}`}
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity={0.25 * bloomProgress}
          strokeDasharray="2 2"
          fill="none"
        />
      </motion.g>
    </g>
  );
};
