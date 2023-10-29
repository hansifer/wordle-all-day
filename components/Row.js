import styles from "./row.module.css";
import { Cell } from "./Cell";
import { isValidWord } from "../lib/util";

export const Row = ({ active, word = "", guessWord }) => {
  const paddedWord = word.padEnd(5, " ");

  return (
    <div
      className={`${styles.row} ${
        active && word.length === 5 && !isValidWord(word) ? styles.rowError : ""
      }`}
    >
      {paddedWord.split("").map((char, i) => (
        <Cell
          key={i}
          char={char}
          color={
            !active && word.length === 5
              ? getColor(char, i, guessWord)
              : "transparent"
          }
          active={active && i === word.length}
        />
      ))}
    </div>
  );
};

function getColor(char, position, guessWord) {
  if (guessWord[position] === char) return "#538d4e"; // green
  if (guessWord.includes(char)) return "#b69f3c"; // yellow
  return "rgb(39 39 42 / 56%)";
}
