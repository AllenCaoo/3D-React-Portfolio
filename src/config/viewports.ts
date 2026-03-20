import type { CSSProperties } from 'react';
import { Vector3 } from 'three';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export interface OrbitControlsProfile {
  enablePan?: boolean;
  enableZoom?: boolean;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  rotateSpeed?: number;
  zoomSpeed?: number;
}

export interface ViewportProfile {
  canvas: {
    dpr: [number, number];
    fov: number;
    shadows: boolean;
  };
  camera: {
    initialPosition: Vector3;
    libraryPosition: Vector3;
    lookAt: Vector3;
  };
  controls: OrbitControlsProfile;
  hud: {
    viewShelfButtonStyle: CSSProperties;
  };
}

export const viewportProfiles: Record<ViewportMode, ViewportProfile> = {
  desktop: {
    canvas: {
      dpr: [1, 2],
      fov: 50,
      shadows: true,
    },
    camera: {
      initialPosition: new Vector3(10, 0, 12),
      libraryPosition: new Vector3(0, -0.5, -5),
      lookAt: new Vector3(0, 0, -40),
    },
    controls: {
      enableZoom: true,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
    },
    hud: {
      viewShelfButtonStyle: {
        top: '1rem',
        left: '1rem',
      },
    },
  },
  mobile: {
    canvas: {
      dpr: [1, 1.5],
      fov: 58,
      shadows: false,
    },
    camera: {
      initialPosition: new Vector3(8, 0, 12),
      libraryPosition: new Vector3(0, -0.25, -6),
      lookAt: new Vector3(0, 0, -40),
    },
    controls: {
      enablePan: false,
      enableZoom: false,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
      minPolarAngle: Math.PI / 2.15,
      maxPolarAngle: Math.PI / 1.95,
      rotateSpeed: 0.65,
      zoomSpeed: 0.8,
    },
    hud: {
      viewShelfButtonStyle: {
        top: 'auto',
        bottom: '1rem',
        left: '50%',
        width: 'min(calc(100vw - 2rem), 18rem)',
        minHeight: '48px',
        transform: 'translateX(-50%)',
      },
    },
  },
  tablet: {
    canvas: {
      dpr: [1, 1.75],
      fov: 54,
      shadows: true,
    },
    camera: {
      initialPosition: new Vector3(9, 0, 12),
      libraryPosition: new Vector3(0, -0.4, -5.5),
      lookAt: new Vector3(0, 0, -40),
    },
    controls: {
      enablePan: false,
      enableZoom: true,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
      minPolarAngle: Math.PI / 3.5,
      maxPolarAngle: Math.PI / 1.35,
      rotateSpeed: 0.9,
      zoomSpeed: 0.9,
    },
    hud: {
      viewShelfButtonStyle: {
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
};
