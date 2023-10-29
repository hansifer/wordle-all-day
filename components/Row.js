import styles from "./row.module.css";
import { Cell } from "./Cell";
import { isValidWord } from "../lib/util";

export const Row = ({ active, word = "", guessWord }) => {
  const paddedWord = word.padEnd(5, " ");

  const nonGreenChars = [];

  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] !== word[i]) nonGreenChars.push(guessWord[i]);
  }

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
              ? getColor(char, i, guessWord, nonGreenChars)
              : "transparent"
          }
          active={active && i === word.length}
        />
      ))}
    </div>
  );
};

function getColor(char, position, guessWord, nonGreenChars) {
  if (guessWord[position] === char) return "#538d4e"; // green
  if (nonGreenChars.includes(char)) return "#b69f3c"; // yellow
  return "rgb(39 39 42 / 56%)";
}
