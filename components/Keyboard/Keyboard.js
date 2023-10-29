import styles from "./keyboard.module.css";
import { Key } from "./Key";

const rows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export const Keyboard = ({ usedWords, targetWord, onKeyClick }) => {
  return (
    <div className={styles.keyboard}>
      {rows.map((row, i) => (
        <div key={i} className={`${styles.keyRow}`}>
          {row.map((key) => (
            <Key
              key={key}
              char={key}
              status={getKeyStatus(key, usedWords, targetWord)}
              onClick={() => onKeyClick(key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

function getKeyStatus(key, usedWords, targetWord) {
  for (const word of usedWords) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === targetWord[i] && word[i] === key) return "green";
    }
  }

  for (const word of usedWords) {
    if (word.includes(key)) {
      if (targetWord.includes(key)) {
        return "yellow";
      } else {
        return "used";
      }
    }
  }

  return "unused";
}
