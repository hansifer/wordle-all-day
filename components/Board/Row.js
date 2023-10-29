import styles from "./row.module.css";
import { Tile } from "./Tile";
import { isValidWord } from "../../lib/util";

export const Row = ({ active, word = "", guessWord }) => {
  const paddedWord = word.padEnd(5, " ");

  const nonGreenChars = [];

  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] !== word[i]) nonGreenChars.push(guessWord[i]);
  }

  const getColor = (char, position, guessWord, nonGreenChars) => {
    if (guessWord[position] === char) return "#538d4e"; // green
    if (nonGreenChars.includes(char)) {
      nonGreenChars.splice(nonGreenChars.indexOf(char), 1);
      return "#b69f3c"; // yellow
    }
    return "#3a3a3c";
  };

  return (
    <div
      className={`${styles.row} ${
        active && word.length === 5 && !isValidWord(word) ? styles.rowError : ""
      }`}
    >
      {paddedWord.split("").map((char, i) => (
        <Tile
          key={i}
          char={char}
          color={
            !active && word.length === 5
              ? getColor(char, i, guessWord, nonGreenChars)
              : "transparent"
          }
          active={active && i === word.length - 1}
        />
      ))}
    </div>
  );
};
