import { Row } from "./Row";
import { ROW_COUNT } from "../../lib/config";

export const Board = ({ words, guessWord }) => {
  const wordsReversed = words.slice().reverse();

  return (
    <div>
      {[...Array(ROW_COUNT)].map((_, i) => (
        <Row
          key={i}
          active={i === words.length - 1}
          word={wordsReversed[i]}
          guessWord={guessWord}
        />
      ))}
    </div>
  );
};
