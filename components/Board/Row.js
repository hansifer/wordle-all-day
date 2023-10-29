import styles from "./row.module.css";
import { Tile } from "./Tile";
import { isValidWord } from "../../lib/util";
import { classy } from "../../lib/util/css";

export const Row = ({ active, word = "", targetWord }) => {
  const paddedWord = word.padEnd(5, " ");

  const nonGreenChars = [];

  for (let i = 0; i < targetWord.length; i++) {
    if (targetWord[i] !== word[i]) nonGreenChars.push(targetWord[i]);
  }

  const getMatchState = (char, position, targetWord, nonGreenChars) => {
    if (targetWord[position] === char) return "direct";

    if (nonGreenChars.includes(char)) {
      nonGreenChars.splice(nonGreenChars.indexOf(char), 1);
      return "indirect";
    }

    return "none";
  };

  const wordCommitted = !active && word.length === 5;

  const className = classy({
    [styles.row]: true,
    [styles.rowError]: active && word.length === 5 && !isValidWord(word),
  });

  return (
    <div className={className}>
      {paddedWord.split("").map((char, i) => (
        <Tile
          key={i}
          char={char}
          matchState={
            wordCommitted
              ? getMatchState(char, i, targetWord, nonGreenChars)
              : null
          }
          active={active && i === word.length - 1}
        />
      ))}
    </div>
  );
};
