import { classy } from "../../lib/util/css";

import styles from "./tile.module.css";

export const Tile = ({ char, color }) => {
  const className = classy({
    [styles.tile]: true,
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
