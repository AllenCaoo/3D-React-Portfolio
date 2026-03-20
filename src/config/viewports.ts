import type { CSSProperties } from 'react';
import { Vector3 } from 'three';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export interface OrbitControlsProfile {
  enablePan?: boolean;
  enableZoom?: boolean;
  minDistance?: number;
  maxDistance?: number;
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
    shadows: boolean;
  };
  camera: {
    states: {
      library: {
        fov: number;
        lookAt: Vector3;
        position: Vector3;
      };
      room: {
        fov: number;
        lookAt: Vector3;
        position: Vector3;
      };
    };
    transitionLerp: number;
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
      shadows: true,
    },
    camera: {
      states: {
        room: {
          position: new Vector3(0, -0.75, 18.5),
          lookAt: new Vector3(0, -1, -19),
          fov: 64,
        },
        library: {
          position: new Vector3(0, -0.5, -10.5),
          lookAt: new Vector3(0, -1, -19),
          fov: 30,
        },
      },
      transitionLerp: 0.03,
    },
    controls: {
      enablePan: false,
      enableZoom: true,
      minDistance: 16,
      maxDistance: 22,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
      minPolarAngle: Math.PI / 2.15,
      maxPolarAngle: Math.PI / 1.85,
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
      shadows: false,
    },
    camera: {
      states: {
        room: {
          position: new Vector3(0, -0.75, 19),
          lookAt: new Vector3(0, -1, -19),
          fov: 100,
        },
        library: {
          position: new Vector3(0, -0.25, -11),
          lookAt: new Vector3(0, -1, -19),
          fov: 45,
        },
      },
      transitionLerp: 0.03,
    },
    controls: {
      enablePan: false,
      enableZoom: false,
      minDistance: 18,
      maxDistance: 22,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
      minPolarAngle: Math.PI / 2.15,
      maxPolarAngle: Math.PI / 1.85,
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
      shadows: true,
    },
    camera: {
      states: {
        room: {
          position: new Vector3(0, -0.75, 18.75),
          lookAt: new Vector3(0, -1, -19),
          fov: 68,
        },
        library: {
          position: new Vector3(0, -0.4, -10.75),
          lookAt: new Vector3(0, -1, -19),
          fov: 54,
        },
      },
      transitionLerp: 0.03,
    },
    controls: {
      enablePan: false,
      enableZoom: true,
      minDistance: 17,
      maxDistance: 22,
      minAzimuthAngle: -Math.PI / 4,
      maxAzimuthAngle: Math.PI / 4,
      minPolarAngle: Math.PI / 2.1,
      maxPolarAngle: Math.PI / 1.8,
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
