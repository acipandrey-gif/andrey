import { FlowerPreset, AtmosphereConfig, AtmosphereTheme } from '../types';

export const FLOWER_PRESETS: FlowerPreset[] = [
  {
    id: 'ranunculus',
    name: 'Ranunculus Bloom',
    tagline: 'Multi-layered delicate crepe petals in rich sunset gradients',
    icon: '🪷',
    recommendedTheme: 'botanical-linen',
    defaultSpring: {
      stiffness: 55,
      damping: 14,
      mass: 0.9,
      staggerDelay: 0.08,
    },
    stem: {
      height: 180,
      curve: 12,
      color: '#8DA399',
      leafCount: 2,
    },
    center: {
      radius: 28,
      color: '#F9D423',
      accentColor: '#A67C52',
      type: 'stamen-ring',
      filamentCount: 24,
    },
    layers: [
      {
        id: 'ranun-outer',
        name: 'Outer Expansion Petals',
        count: 10,
        radiusRatio: 0.95,
        length: 155,
        width: 62,
        shape: 'pointed',
        baseAngleOffset: 0,
        colors: ['#FADADD', '#FFD1DC', '#A67C52'],
        opacity: 0.92,
        budScale: 0.25,
        budRotateX: 75,
        budRotateZ: -12,
        openRotateX: 10,
        openScale: 1.0,
        curve: 0.25,
      },
      {
        id: 'ranun-mid',
        name: 'Mid Tier Petals',
        count: 10,
        radiusRatio: 0.75,
        length: 130,
        width: 54,
        shape: 'pointed',
        baseAngleOffset: 18,
        colors: ['#FFD1DC', '#FFC0CB', '#881337'],
        opacity: 0.95,
        budScale: 0.2,
        budRotateX: 82,
        budRotateZ: -8,
        openRotateX: 25,
        openScale: 0.95,
        curve: 0.2,
      },
      {
        id: 'ranun-inner',
        name: 'Inner Guard Petals',
        count: 8,
        radiusRatio: 0.55,
        length: 100,
        width: 44,
        shape: 'cupped',
        baseAngleOffset: 9,
        colors: ['#FFC0CB', '#FFB7C5', '#A67C52'],
        opacity: 0.98,
        budScale: 0.15,
        budRotateX: 88,
        budRotateZ: -4,
        openRotateX: 40,
        openScale: 0.9,
        curve: 0.15,
      },
      {
        id: 'ranun-crown',
        name: 'Central Core',
        count: 6,
        radiusRatio: 0.38,
        length: 70,
        width: 32,
        shape: 'cupped',
        baseAngleOffset: 27,
        colors: ['#F6E05E', '#F9D423', '#A67C52'],
        opacity: 1.0,
        budScale: 0.1,
        budRotateX: 92,
        budRotateZ: 0,
        openRotateX: 55,
        openScale: 0.85,
        curve: 0.1,
      },
    ],
  },
  {
    id: 'sakura',
    name: 'Cherry Blossom',
    tagline: 'Delicate notched petals with silky spring kinetics',
    icon: '🌸',
    recommendedTheme: 'botanical-linen',
    defaultSpring: {
      stiffness: 75,
      damping: 11,
      mass: 0.7,
      staggerDelay: 0.06,
    },
    stem: {
      height: 190,
      curve: -18,
      color: '#A67C52',
      leafCount: 2,
    },
    center: {
      radius: 22,
      color: '#FAF9F6',
      accentColor: '#A67C52',
      type: 'filament-cluster',
      filamentCount: 30,
    },
    layers: [
      {
        id: 'sakura-main',
        name: 'Main Blossom',
        count: 5,
        radiusRatio: 0.9,
        length: 140,
        width: 85,
        shape: 'notched',
        baseAngleOffset: 0,
        colors: ['#FFFFFF', '#FFD1DC', '#A67C52'],
        opacity: 0.94,
        budScale: 0.22,
        budRotateX: 70,
        budRotateZ: -15,
        openRotateX: 12,
        openScale: 1.0,
        curve: 0.3,
      },
      {
        id: 'sakura-inner',
        name: 'Inner Accents',
        count: 5,
        radiusRatio: 0.65,
        length: 95,
        width: 58,
        shape: 'notched',
        baseAngleOffset: 36,
        colors: ['#FAF9F6', '#FFC0CB', '#A67C52'],
        opacity: 0.96,
        budScale: 0.18,
        budRotateX: 80,
        budRotateZ: -8,
        openRotateX: 30,
        openScale: 0.9,
        curve: 0.2,
      },
    ],
  },
  {
    id: 'rose',
    name: 'Velvet Rose',
    tagline: 'Lush spiral petals with deep ruby terracotta gradient tones',
    icon: '🌹',
    recommendedTheme: 'gallery-noir',
    defaultSpring: {
      stiffness: 45,
      damping: 16,
      mass: 1.1,
      staggerDelay: 0.1,
    },
    stem: {
      height: 180,
      curve: 15,
      color: '#8DA399',
      leafCount: 3,
    },
    center: {
      radius: 20,
      color: '#F9D423',
      accentColor: '#A67C52',
      type: 'glowing-orb',
    },
    layers: [
      {
        id: 'rose-layer-1',
        name: 'Outer Bloom',
        count: 8,
        radiusRatio: 1.0,
        length: 150,
        width: 90,
        shape: 'curved',
        baseAngleOffset: 0,
        colors: ['#F87171', '#DC2626', '#881337'],
        opacity: 0.95,
        budScale: 0.25,
        budRotateX: 82,
        budRotateZ: -20,
        openRotateX: 18,
        openScale: 1.0,
        curve: 0.4,
      },
      {
        id: 'rose-layer-2',
        name: 'Mid Petals',
        count: 7,
        radiusRatio: 0.8,
        length: 125,
        width: 78,
        shape: 'curved',
        baseAngleOffset: 22,
        colors: ['#EF4444', '#B91C1C', '#4C0519'],
        opacity: 0.96,
        budScale: 0.2,
        budRotateX: 86,
        budRotateZ: -14,
        openRotateX: 35,
        openScale: 0.92,
        curve: 0.35,
      },
      {
        id: 'rose-layer-3',
        name: 'Inner Spiral',
        count: 6,
        radiusRatio: 0.6,
        length: 98,
        width: 62,
        shape: 'cupped',
        baseAngleOffset: 45,
        colors: ['#DC2626', '#991B1B', '#2E020D'],
        opacity: 0.98,
        budScale: 0.15,
        budRotateX: 90,
        budRotateZ: -8,
        openRotateX: 50,
        openScale: 0.85,
        curve: 0.25,
      },
      {
        id: 'rose-bud-core',
        name: 'Rose Heart',
        count: 5,
        radiusRatio: 0.4,
        length: 70,
        width: 46,
        shape: 'cupped',
        baseAngleOffset: 65,
        colors: ['#B91C1C', '#7F1D1D', '#1F0108'],
        opacity: 1.0,
        budScale: 0.1,
        budRotateX: 94,
        budRotateZ: 0,
        openRotateX: 68,
        openScale: 0.75,
        curve: 0.15,
      },
    ],
  },
  {
    id: 'sunflower',
    name: 'Golden Sunflower',
    tagline: 'Ray petals surrounding a Fibonacci spiral disc core',
    icon: '🌻',
    recommendedTheme: 'golden-hour',
    defaultSpring: {
      stiffness: 85,
      damping: 12,
      mass: 0.8,
      staggerDelay: 0.04,
    },
    stem: {
      height: 190,
      curve: 8,
      color: '#8DA399',
      leafCount: 2,
    },
    center: {
      radius: 42,
      color: '#A67C52',
      accentColor: '#F9D423',
      type: 'seed-head',
    },
    layers: [
      {
        id: 'sunflower-back',
        name: 'Back Rays',
        count: 18,
        radiusRatio: 1.0,
        length: 160,
        width: 42,
        shape: 'teardrop',
        baseAngleOffset: 0,
        colors: ['#FEF08A', '#EAB308', '#A67C52'],
        opacity: 0.95,
        budScale: 0.22,
        budRotateX: 75,
        budRotateZ: -10,
        openRotateX: 8,
        openScale: 1.0,
        curve: 0.15,
      },
      {
        id: 'sunflower-front',
        name: 'Front Rays',
        count: 18,
        radiusRatio: 0.82,
        length: 135,
        width: 38,
        shape: 'teardrop',
        baseAngleOffset: 10,
        colors: ['#FEF9C3', '#FACC15', '#B45309'],
        opacity: 0.98,
        budScale: 0.18,
        budRotateX: 82,
        budRotateZ: -5,
        openRotateX: 18,
        openScale: 0.92,
        curve: 0.1,
      },
    ],
  },
  {
    id: 'dahlia',
    name: 'Celestial Dahlia',
    tagline: 'Symmetrical geometric petals with soft ivory and slate gradients',
    icon: '🌺',
    recommendedTheme: 'sage-herbarium',
    defaultSpring: {
      stiffness: 65,
      damping: 13,
      mass: 0.85,
      staggerDelay: 0.05,
    },
    stem: {
      height: 175,
      curve: -10,
      color: '#8DA399',
      leafCount: 2,
    },
    center: {
      radius: 24,
      color: '#A67C52',
      accentColor: '#FAF9F6',
      type: 'glowing-orb',
    },
    layers: [
      {
        id: 'dahlia-l1',
        name: 'Layer 1 (Outer)',
        count: 14,
        radiusRatio: 1.0,
        length: 155,
        width: 45,
        shape: 'cupped',
        baseAngleOffset: 0,
        colors: ['#E0E7FF', '#818CF8', '#A67C52'],
        opacity: 0.92,
        budScale: 0.22,
        budRotateX: 72,
        budRotateZ: -12,
        openRotateX: 12,
        openScale: 1.0,
        curve: 0.3,
      },
      {
        id: 'dahlia-l2',
        name: 'Layer 2',
        count: 14,
        radiusRatio: 0.82,
        length: 130,
        width: 40,
        shape: 'cupped',
        baseAngleOffset: 12,
        colors: ['#FAF9F6', '#38BDF8', '#1D4ED8'],
        opacity: 0.95,
        budScale: 0.18,
        budRotateX: 78,
        budRotateZ: -8,
        openRotateX: 28,
        openScale: 0.92,
        curve: 0.25,
      },
      {
        id: 'dahlia-l3',
        name: 'Layer 3',
        count: 12,
        radiusRatio: 0.64,
        length: 105,
        width: 35,
        shape: 'cupped',
        baseAngleOffset: 6,
        colors: ['#FAE8FF', '#C084FC', '#A67C52'],
        opacity: 0.97,
        budScale: 0.14,
        budRotateX: 84,
        budRotateZ: -4,
        openRotateX: 42,
        openScale: 0.85,
        curve: 0.2,
      },
      {
        id: 'dahlia-l4',
        name: 'Layer 4 (Inner)',
        count: 10,
        radiusRatio: 0.45,
        length: 75,
        width: 28,
        shape: 'cupped',
        baseAngleOffset: 18,
        colors: ['#FEF08A', '#FACC15', '#A21CAF'],
        opacity: 1.0,
        budScale: 0.1,
        budRotateX: 90,
        budRotateZ: 0,
        openRotateX: 58,
        openScale: 0.78,
        curve: 0.15,
      },
    ],
  },
];

export const ATMOSPHERE_THEMES: Record<AtmosphereTheme, AtmosphereConfig> = {
  'botanical-linen': {
    id: 'botanical-linen',
    name: 'Linen Studio',
    bgGradient: 'from-[#FAF9F6] via-[#F5F3ED] to-[#EAE6DD]',
    textColor: 'text-[#2D302E]',
    cardBg: 'bg-[#FAF9F6]/90 backdrop-blur-md',
    borderColor: 'border-[#2D302E]/20',
    particleColor: 'rgba(166, 124, 82, 0.4)',
    glowColor: 'rgba(166, 124, 82, 0.15)',
  },
  'gallery-noir': {
    id: 'gallery-noir',
    name: 'Gallery Noir',
    bgGradient: 'from-[#1A1C1B] via-[#242725] to-[#121312]',
    textColor: 'text-[#FAF9F6]',
    cardBg: 'bg-[#1A1C1B]/90 backdrop-blur-md',
    borderColor: 'border-[#A67C52]/30',
    particleColor: 'rgba(250, 218, 221, 0.5)',
    glowColor: 'rgba(166, 124, 82, 0.25)',
  },
  'sage-herbarium': {
    id: 'sage-herbarium',
    name: 'Sage Herbarium',
    bgGradient: 'from-[#F2F5F3] via-[#E6EBE8] to-[#D5DED9]',
    textColor: 'text-[#2D302E]',
    cardBg: 'bg-[#F2F5F3]/90 backdrop-blur-md',
    borderColor: 'border-[#8DA399]/40',
    particleColor: 'rgba(141, 163, 153, 0.5)',
    glowColor: 'rgba(141, 163, 153, 0.2)',
  },
  'golden-hour': {
    id: 'golden-hour',
    name: 'Terracotta Sun',
    bgGradient: 'from-[#FDFBF7] via-[#F6EFE5] to-[#EADECB]',
    textColor: 'text-[#2D302E]',
    cardBg: 'bg-[#FDFBF7]/90 backdrop-blur-md',
    borderColor: 'border-[#A67C52]/30',
    particleColor: 'rgba(166, 124, 82, 0.5)',
    glowColor: 'rgba(249, 212, 35, 0.2)',
  },
};

/**
 * Generates smooth SVG path string for a petal centered at (0, 0) pointing upwards (-Y direction)
 */
export function generatePetalPath(length: number, width: number, shape: string, curveFactor: number = 0.2): string {
  const halfW = width / 2;
  
  switch (shape) {
    case 'pointed':
      // Lotus-style pointed tip with curved sides
      return `
        M 0,0
        C ${-halfW * 0.8},${-length * 0.25} ${-halfW * 1.1},${-length * 0.65} 0,${-length}
        C ${halfW * 1.1},${-length * 0.65} ${halfW * 0.8},${-length * 0.25} 0,0
        Z
      `;
    
    case 'notched':
      // Sakura-style rounded tip with a delicate V-notch at the apex
      const notchDepth = length * 0.1;
      return `
        M 0,0
        C ${-halfW * 0.9},${-length * 0.2} ${-halfW * 1.1},${-length * 0.8} ${-halfW * 0.35},${-length}
        L 0,${-length + notchDepth}
        L ${halfW * 0.35},${-length}
        C ${halfW * 1.1},${-length * 0.8} ${halfW * 0.9},${-length * 0.2} 0,0
        Z
      `;

    case 'cupped':
      // Dahlia/cup-style soft rounded petal
      return `
        M 0,0
        C ${-halfW},${-length * 0.15} ${-halfW * 1.25},${-length * 0.5} ${-halfW * 0.7},${-length * 0.9}
        Q 0,${-length * 1.06} ${halfW * 0.7},${-length * 0.9}
        C ${halfW * 1.25},${-length * 0.5} ${halfW},${-length * 0.15} 0,0
        Z
      `;

    case 'teardrop':
      // Sunflower ray petal
      return `
        M 0,0
        C ${-halfW * 0.5},${-length * 0.1} ${-halfW * 1.1},${-length * 0.5} 0,${-length}
        C ${halfW * 1.1},${-length * 0.5} ${halfW * 0.5},${-length * 0.1} 0,0
        Z
      `;

    case 'curved':
      // Rose petal with wavy organic flare
      return `
        M 0,0
        C ${-halfW * 1.2},${-length * 0.2} ${-halfW * 1.4},${-length * 0.7} ${-halfW * 0.8},${-length * 0.95}
        C ${-halfW * 0.3},${-length * 1.05} ${halfW * 0.3},${-length * 1.05} ${halfW * 0.8},${-length * 0.95}
        C ${halfW * 1.4},${-length * 0.7} ${halfW * 1.2},${-length * 0.2} 0,0
        Z
      `;

    case 'rounded':
    default:
      // Smooth oval petal
      return `
        M 0,0
        C ${-halfW * 1.1},${-length * 0.3} ${-halfW * 1.1},${-length * 0.8} 0,${-length}
        C ${halfW * 1.1},${-length * 0.8} ${halfW * 1.1},${-length * 0.3} 0,0
        Z
      `;
  }
}
