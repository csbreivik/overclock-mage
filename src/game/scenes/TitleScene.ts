import Phaser from "phaser";
import { GAME_SIZE } from "../config";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super("title");
  }

  create() {
    const { width, height } = GAME_SIZE;

    const title = this.add
      .text(width / 2, height / 2 - 60, "OVERCLOCK MAGE", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "48px",
        fontStyle: "800",
        color: "#e6f0ff",
      })
      .setOrigin(0.5);

    const subtitle = this.add
      .text(width / 2, height / 2 + 4, "Press [SPACE] to begin", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "18px",
        color: "#9bb3d6",
      })
      .setOrigin(0.5);

    // A little "arcade glow"
    title.setShadow(0, 0, "#5ad7ff", 12, true, true);

    const hint = this.add
      .text(width / 2, height - 40, "WASD/Arrows - RMB to cast spells", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "14px",
        color: "#6f86aa",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: subtitle,
      alpha: 0.2,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });

    this.input.keyboard?.once("keydown-SPACE", () => {
      this.scene.start("arena");
    });

    // Bonus: click for start
    this.input.once("pointerdown", () => {
      this.scene.start("arena");
    });
  }
}
