import { classy } from "../../lib/util/css";
import styles from "./tile.module.css";

export const Tile = ({ char, matchState, active }) => {
  const className = classy({
    [styles.tile]: true,
    [styles.matchDirect]: matchState === "direct",
    [styles.matchIndirect]: matchState === "indirect",
    [styles.matchNone]: matchState === "none",
    [styles.tileActive]: active,
  });

  return <div className={className}>{char}</div>;
};
