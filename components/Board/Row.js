import styles from "./row.module.css";
import { Tile } from "./Tile";
import { isValidWord } from "../../lib/util";

export const Row = ({ active, word = "", guessWord }) => {
  const paddedWord = word.padEnd(5, " ");

  const nonGreenChars = [];

  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] !== word[i]) nonGreenChars.push(guessWord[i]);
  }

  const getMatchState = (char, position, guessWord, nonGreenChars) => {
    if (guessWord[position] === char) return "direct";

    if (nonGreenChars.includes(char)) {
      nonGreenChars.splice(nonGreenChars.indexOf(char), 1);
      return "indirect";
    }

    return "none";
  };

  const wordCommitted = !active && word.length === 5;

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
          matchState={
            wordCommitted
              ? getMatchState(char, i, guessWord, nonGreenChars)
              : null
          }
          active={active && i === word.length - 1}
        />
      ))}
    </div>
  );
};
