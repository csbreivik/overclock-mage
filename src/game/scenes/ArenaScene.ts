import Phaser from "phaser";
import { GAME_SIZE } from "../config";

type Player = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

export class ArenaScene extends Phaser.Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("arena");
  }

  create() {
    const { width, height } = GAME_SIZE;

    // grid background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0b0f1a);
    this.drawGrid();

    // Player (placeholder: simple circle as texture)
    const texKey = "player-dot";
    if (!this.textures.exists(texKey)) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0x5ad7ff, 1);
      g.fillCircle(8, 8, 8);
      g.generateTexture(texKey, 16, 16);
      g.destroy();
    }

    this.player = this.physics.add.image(width / 2, height / 2, texKey);
    this.player.setDamping(true);
    this.player.setDrag(0.0005);
    this.player.setMaxVelocity(360);
    this.player.setCollideWorldBounds(true);

    // UI text
    this.add
      .text(16, 16, "Arena (placeholder)\nESC = Back to Title", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "14px",
        color: "#9bb3d6",
      })
      .setDepth(10);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as any;

    this.input.keyboard?.on("keydown-ESC", () => {
      this.scene.start("title");
    });

    // click to cast spell (placeholder particles)
    this.input.on("pointerdown", (p: Phaser.Input.Pointer) => {
      this.castPlaceholderSpell(p.worldX, p.worldY);
    });
  }

  update() {
    const speed = 220;

    let vx = 0;
    let vy = 0;

    const left = this.cursors.left?.isDown || this.wasd?.A.isDown;
    const right = this.cursors.right?.isDown || this.wasd?.D.isDown;
    const up = this.cursors.up?.isDown || this.wasd?.W.isDown;
    const down = this.cursors.down?.isDown || this.wasd?.S.isDown;

    if (left) vx -= speed;
    if (right) vx += speed;
    if (up) vy -= speed;
    if (down) vy += speed;

    // normalize diagonal
    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.sqrt(2);
      vx *= inv;
      vy *= inv;
    }

    this.player.setVelocity(vx, vy);
  }

  private drawGrid() {
    const { width, height } = GAME_SIZE;
    const g = this.add.graphics();
    g.lineStyle(1, 0x142033, 1);

    const step = 32;
    for (let x = 0; x <= width; x += step) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, height);
      g.strokePath();
    }
    for (let y = 0; y <= height; y += step) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(width, y);
      g.strokePath();
    }

    // some glowing lines
    g.lineStyle(1, 0x1c2f4f, 0.35);
    for (let x = 0; x <= width; x += step * 4) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, height);
      g.strokePath();
    }
    for (let y = 0; y <= height; y += step * 4) {
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(width, y);
      g.strokePath();
    }
  }

  private castPlaceholderSpell(x: number, y: number) {
    // small texture for spark
    const sparkKey = "spark";
    if (!this.textures.exists(sparkKey)) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1);
      g.fillCircle(4, 4, 4);
      g.generateTexture(sparkKey, 8, 8);
      g.destroy();
    }

    const particles = this.add.particles(0, 0, sparkKey, {
      x,
      y,
      speed: { min: 60, max: 240 },
      angle: { min: 0, max: 360 },
      lifespan: { min: 250, max: 550 },
      quantity: 18,
      scale: { start: 1, end: 0 },
      alpha: { start: 1, end: 0 },
    });

    // auto cleanup
    this.time.delayedCall(650, () => particles.destroy());
  }
}
