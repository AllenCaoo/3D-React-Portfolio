export type LampLightType = 'point' | 'spot';

export interface LampVisualDefaults {
  baseColor: string;
  bulbColor: string;
  bulbEmissiveIntensity: number;
  bulbRadius: number;
  shadeHeight: number;
  shadeOpacity: number;
  stemColor: string;
  stemRadius: number;
}

export interface LampLightDefaults {
  bounceDecay: number;
  bounceDistanceMultiplier: number;
  bounceIntensityMultiplier: number;
  decay: number;
  lightType: LampLightType;
  penumbra: number;
  shadowBias: number;
  spotAngle: number;
}

export const lampVisualDefaults: LampVisualDefaults = {
  baseColor: '#333',
  bulbColor: '#fff',
  bulbEmissiveIntensity: 2,
  bulbRadius: 0.15,
  shadeHeight: 1,
  shadeOpacity: 0.9,
  stemColor: '#555',
  stemRadius: 0.05,
};

export const lampLightDefaults: LampLightDefaults = {
  bounceDecay: 1,
  bounceDistanceMultiplier: 1.5,
  bounceIntensityMultiplier: 0.3,
  decay: 2,
  lightType: 'point',
  penumbra: 0.5,
  shadowBias: -0.001,
  spotAngle: Math.PI / 4,
};
