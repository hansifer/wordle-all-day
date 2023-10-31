import styles from "./key.module.css";
import Image from "next/image";

export const Key = ({ status, char, onClick }) => {
  return (
    <div
      className={`${styles.key} ${getStatusClass(status)}`}
      onClick={onClick}
      style={char === "Enter" ? { minWidth: 44, fontSize: 10 } : {}}
    >
      {char === "Backspace" ? (
        <Image src="/delete.svg" height="16" width="16" alt="backspace" />
      ) : (
        char
      )}
    </div>
  );
};

function getStatusClass(status) {
  if (status === "green") return styles.keyUsedGreen;
  if (status === "yellow") return styles.keyUsedYellow;
  if (status === "used") return styles.keyUsed;
}
