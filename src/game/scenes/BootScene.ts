import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("boot");
  }

  preload() {
    //add sprites and sound here
    //as for now: no assets
  }

  create() {
    this.scene.start("title");
  }
}
