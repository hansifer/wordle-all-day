import { classy } from "../../lib/util/css";
import styles from "./tile.module.css";

export const Tile = ({ char, color, active }) => {
  const className = classy({
    [styles.tile]: true,
    [styles.tileActive]: active,
  });

  return (
    <div
      className={className}
      style={{
        background: color,
      }}
    >
      {char}
    </div>
  );
};
