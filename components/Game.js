import { useState, useEffect, useRef, useCallback } from "react";
import { Board } from "./Board/Board";
import { Notification } from "./Notification/Notification";
import { Keyboard } from "./Keyboard/Keyboard";
import { isValidWord, selectTargetWord } from "../lib/util";
import styles from "./game.module.css";
import Image from "next/image";
import refreshIcon from "../public/refresh.svg";
import { ROW_COUNT } from "../lib/config";

export const Game = () => {
  const [words, setWords] = useState([""]);
  const [targetWord, setTargetWord] = useState(selectTargetWord());

  // console.log(words);
  // console.log(targetWord);

  const restartButtonRef = useRef();
  const boardApi = useRef();

  const processKey = useCallback(
    (key) => {
      if (key === "Escape") {
        setWords((words) => {
          if (gameOver(words, targetWord)) {
            // reset game
            setTargetWord(selectTargetWord()); // todo: ok to call inside setter callback?
            return [""];
          }

          const [currentWord, ...restWords] = words;

          if (!currentWord.length) return words;

          return ["", ...restWords];
        });
      } else if (key === "Enter") {
        setWords((words) => {
          if (gameOver(words, targetWord)) {
            // reset game
            setTargetWord(selectTargetWord()); // todo: ok to call inside setter callback?
            return [""];
          }

          if (isValidWord(words[0])) {
            return ["", ...words];
          }

          boardApi.current.shakeActiveRow();

          return words;
        });
      } else if (key === "Backspace") {
        setWords((words) => {
          const [currentWord, ...restWords] = words;

          if (!currentWord.length) return words;

          return [
            `${currentWord.slice(0, currentWord.length - 1)}`,
            ...restWords,
          ];
        });
      } else if (key >= "a" && key <= "z") {
        setWords((words) => {
          const [currentWord, ...restWords] = words;

          if (currentWord.length === 5 || gameOver(words, targetWord)) {
            return words;
          }

          return [`${currentWord}${key}`, ...restWords];
        });
      }
    },
    [targetWord]
  );

  useEffect(() => {
    const handleKeydown = ({ key, shiftKey, ctrlKey, altKey, metaKey }) => {
      // ignore use of keyboard shortcuts
      if (shiftKey || ctrlKey || altKey || metaKey) return;

      // once user types a key, ensure Enter key commits word instead of resetting game
      restartButtonRef.current.blur();

      processKey(key);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [processKey]);

  const handleRestart = () => {
    setWords([""]);
    setTargetWord(selectTargetWord());
  };

  return (
    <>
      <div className={styles.boardHeader}>
        <div>Wordle</div>
        <button
          className={styles.refreshButton}
          ref={restartButtonRef}
          onClick={handleRestart}
        >
          <Image alt="Refresh" src={refreshIcon} width="20" height="20" />
        </button>
      </div>
      <Board words={words} targetWord={targetWord} ref={boardApi} />
      <Keyboard
        usedWords={words.slice(1)}
        targetWord={targetWord}
        onKeyClick={processKey}
      />
      {words.length > 1 ? (
        <Notification
          visible={
            (words.includes(targetWord) && words[0] === "") ||
            words.length === 7
          }
          targetWord={
            words.length === 7 && !words.includes(targetWord) ? targetWord : ""
          }
          onClick={handleRestart}
        />
      ) : null}
    </>
  );
};

function gameOver(words, targetWord) {
  return (
    words.length > ROW_COUNT || (words.includes(targetWord) && words[0] === "")
  );
}
