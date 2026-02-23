import type Phaser from "phaser";

export const GAME_SIZE = {
  width: 960,
  height: 540,
} as const;

export const DEFAULT_PHYSICS: Phaser.Types.Core.PhysicsConfig = {
  default: "arcade",
  arcade: {
    gravity: { x: 0, y: 0 },
    debug: false,
  },
};
