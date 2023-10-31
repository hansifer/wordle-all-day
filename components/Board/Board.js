import { useRef, forwardRef, useImperativeHandle } from "react";

import { Row } from "./Row";
import { ROW_COUNT } from "../../lib/config";

export const Board = forwardRef(({ words, targetWord }, ref) => {
  const activeRowApi = useRef();

  useImperativeHandle(
    ref,
    () => ({
      shakeActiveRow: () => {
        activeRowApi.current.shake();
      },
    }),
    []
  );

  // reverse list of words for display
  const displayWords = words.slice().reverse();

  return (
    <div>
      {[...Array(ROW_COUNT)].map((_, i) => {
        const active = i === words.length - 1;

        return (
          <Row
            key={i}
            ref={active ? activeRowApi : null}
            active={active}
            word={displayWords[i]}
            targetWord={targetWord}
          />
        );
      })}
    </div>
  );
});
