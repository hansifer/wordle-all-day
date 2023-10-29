import styles from "./cell.module.css";

export const Cell = ({ char, color, active }) => {
  return (
    <div
      className={styles.cell}
      style={{
        background: color,
        ...(active ? {} : {}),
      }}
    >
      {char}
    </div>
  );
};
