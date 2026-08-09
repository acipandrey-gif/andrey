export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  staggerDelay: number;
}

export type PetalShape = 'pointed' | 'rounded' | 'notched' | 'cupped' | 'teardrop' | 'curved';

export interface PetalLayerConfig {
  id: string;
  name: string;
  count: number;
  radiusRatio: number; // 0.2 to 1.0
  length: number;      // px length
  width: number;       // px width
  shape: PetalShape;
  baseAngleOffset: number; // rotation offset in deg
  colors: [string, string, string]; // [base/tip, mid, core]
  opacity: number;
  budScale: number;        // scale when bloom = 0
  budRotateX: number;     // 3D rotation angle in bud state
  budRotateZ: number;     // Z angle twist in bud state
  openRotateX: number;    // 3D rotation angle in full bloom
  openScale: number;      // scale in full bloom
  curve: number;          // petal curve factor
}

export interface CenterConfig {
  radius: number;
  color: string;
  accentColor: string;
  type: 'stamen-ring' | 'seed-head' | 'glowing-orb' | 'filament-cluster';
  filamentCount?: number;
}

export interface StemConfig {
  height: number;
  curve: number;
  color: string;
  leafCount: number;
}

export interface FlowerPreset {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  layers: PetalLayerConfig[];
  center: CenterConfig;
  stem: StemConfig;
  defaultSpring: SpringConfig;
  recommendedTheme: AtmosphereTheme;
}

export type AtmosphereTheme = 'botanical-linen' | 'gallery-noir' | 'sage-herbarium' | 'golden-hour';

export interface AtmosphereConfig {
  id: AtmosphereTheme;
  name: string;
  bgGradient: string;
  textColor: string;
  cardBg: string;
  borderColor: string;
  particleColor: string;
  glowColor: string;
}
