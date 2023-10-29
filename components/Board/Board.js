import { Row } from "./Row";
import { ROW_COUNT } from "../../lib/config";

export const Board = ({ words, targetWord }) => {
  // reverse list of words for display
  const displayWords = words.slice().reverse();

  return (
    <div>
      {[...Array(ROW_COUNT)].map((_, i) => (
        <Row
          key={i}
          active={i === words.length - 1}
          word={displayWords[i]}
          targetWord={targetWord}
        />
      ))}
    </div>
  );
};
