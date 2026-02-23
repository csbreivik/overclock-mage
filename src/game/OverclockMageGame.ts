import Phaser from "phaser";
import { GAME_SIZE, DEFAULT_PHYSICS } from "./config";
import { BootScene } from "./scenes/BootScene";
import { TitleScene } from "./scenes/TitleScene";
import { ArenaScene } from "./scenes/ArenaScene";

type CreateGameArgs = {
  parent: HTMLDivElement;
};

export function createOverclockMageGame({
  parent,
}: CreateGameArgs): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent,
    width: GAME_SIZE.width,
    height: GAME_SIZE.height,
    backgroundColor: "#0b0f1a",
    physics: DEFAULT_PHYSICS,
    scene: [BootScene, TitleScene, ArenaScene],
    pixelArt: true,
    // easy responsive styling with container
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_SIZE.width,
      height: GAME_SIZE.height,
    },
  };

  return new Phaser.Game(config);
}
