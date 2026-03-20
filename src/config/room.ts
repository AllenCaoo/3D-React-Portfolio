import type { LampLightType } from './lighting';

export type Triplet = [number, number, number];

export interface RoomDimensions {
  width: number;
  height: number;
  depth: number;
  floorY: number;
  ceilingY: number;
  wallCenterY: number;
  wallThickness: number;
}

export interface ModelPlacement {
  position: Triplet;
  rotation: Triplet;
  scale: number;
}

export interface LampPlacement {
  position: Triplet;
  height?: number;
  baseRadius?: number;
  lightType?: LampLightType;
  shadeRadiusTop?: number;
  shadeRadiusBottom?: number;
  color?: string;
  intensity?: number;
  distance?: number;
}

export const roomDimensions: RoomDimensions = {
  width: 25,
  height: 16,
  depth: 40,
  floorY: -6,
  ceilingY: 10,
  wallCenterY: 2,
  wallThickness: 0.1,
};

const backWallZ = -roomDimensions.depth / 2;
const bookshelfDepth = 1.8;
const bookshelfZ = backWallZ + roomDimensions.wallThickness / 2 + bookshelfDepth / 2;
const rearSectionShiftZ = -5.5;

export const roomAnchors = {
  backWallZ,
  bookshelfZ,
  rearSectionShiftZ,
};

export const roomFurniture = {
  couch: {
    position: [-10, -6, -6 + rearSectionShiftZ],
    rotation: [0, Math.PI / 2, 0],
    scale: 0.015,
  } satisfies ModelPlacement,
  coffeeTable: {
    position: [-7.3, -5, -4.3 + rearSectionShiftZ],
    rotation: [0, Math.PI / 2, 0],
    scale: 3,
  } satisfies ModelPlacement,
  guitar: {
    position: [-10, -5.95, -11 + rearSectionShiftZ],
    rotation: [0, Math.PI / 4, 0],
    scale: 0.1,
  } satisfies ModelPlacement,
  bookshelf: {
    position: [0, 0, bookshelfZ] as Triplet,
  },
};

export const roomLamps = {
  floorLamp: {
    position: [-10, -6, 5 + rearSectionShiftZ],
    height: 6,
    baseRadius: 0.4,
    color: '#ffaa33',
    intensity: 15,
    distance: 60,
  } satisfies LampPlacement,
  tableLamp: {
    position: [-8, -4.4, -4 + rearSectionShiftZ],
    height: 1.5,
    baseRadius: 0.15,
    shadeRadiusTop: 0.2,
    shadeRadiusBottom: 0.3,
    color: '#ffffff',
    intensity: 10,
    distance: 40,
  } satisfies LampPlacement,
  bookshelfLamp: {
    position: [8.75, -6, bookshelfZ],
    height: 8,
    baseRadius: 0.5,
    color: '#ffeebb',
    intensity: 20,
    distance: 80,
  } satisfies LampPlacement,
};
