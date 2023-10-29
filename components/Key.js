import styles from "./key.module.css";

export const Key = ({ status, char }) => {
  return (
    <div className={`${styles.key} ${getStatusClass(status)}`}>{char}</div>
  );
};

function getStatusClass(status) {
  if (status === "green") return styles.keyUsedGreen;
  if (status === "yellow") return styles.keyUsedYellow;
  if (status === "used") return styles.keyUsed;
}
