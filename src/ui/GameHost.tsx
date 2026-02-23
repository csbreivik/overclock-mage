import { useEffect, useRef } from "react";
import type Phaser from "phaser";
import { createOverclockMageGame } from "../game/OverclockMageGame";
import styles from "../styles/app.module.css";

export function GameHost() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Hindre dobbelt init (StrictMode i dev kjører effect 2x)
    if (gameRef.current) return;

    gameRef.current = createOverclockMageGame({ parent: host });

    return () => {
      // Viktig: destroy ved unmount
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.frame}>
        <div ref={hostRef} className={styles.game} />
      </div>
    </div>
  );
}
