import { useState, useEffect, useRef, useCallback } from "react";
import { Board } from "./Board/Board";
import { Notification } from "./Notification/Notification";
import { Keyboard } from "./Keyboard/Keyboard";
import { isValidWord, selectGuessWord } from "../lib/util";
import styles from "./game.module.css";
import Image from "next/image";
import refreshIcon from "../public/refresh.svg";
import { ROW_COUNT } from "../lib/config";

export const Game = () => {
  const [words, setWords] = useState([""]);
  const [guessWord, setGuessWord] = useState(selectGuessWord());

  // console.log(words);
  // console.log(guessWord);

  const restartButtonRef = useRef();

  const processKey = useCallback(
    (key) => {
      if (key === "Enter") {
        setWords((words) =>
          words.length < ROW_COUNT + 1 &&
          words[0].length === 5 &&
          isValidWord(words[0])
            ? ["", ...words]
            : words
        );
      } else if (key === "Backspace") {
        setWords((words) => {
          const [currentWord, ...restWords] = words;
          return [
            `${currentWord.slice(0, currentWord.length - 1)}`,
            ...restWords,
          ];
        });
      } else if (key >= "a" && key <= "z") {
        setWords((words) => {
          const [currentWord, ...restWords] = words;

          if (
            currentWord.length === 5 ||
            (words.includes(guessWord) && currentWord === "")
          ) {
            return words;
          }

          return [`${currentWord}${key}`, ...restWords];
        });
      }
    },
    [guessWord]
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
    setGuessWord(selectGuessWord());
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
      <Board words={words} guessWord={guessWord} />
      <Keyboard
        usedWords={words.slice(1)}
        guessWord={guessWord}
        onKeyClick={processKey}
      />
      {words.length > 1 ? (
        <Notification
          visible={
            (words.includes(guessWord) && words[0] === "") || words.length === 7
          }
          guessWord={
            words.length === 7 && !words.includes(guessWord) ? guessWord : ""
          }
          onClick={handleRestart}
        />
      ) : null}
    </>
  );
};
