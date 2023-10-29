import styles from "./tile.module.css";

export const Tile = ({ char, color, active }) => {
  return (
    <div
      className={styles.tile}
      style={{
        background: color,
        ...(active ? {} : {}),
      }}
    >
      {char}
    </div>
  );
};
