import { useState, useEffect, useRef } from "react";
import { Row } from "./Row";
import { Keyboard } from "./Keyboard";
import { isValidWord, selectGuessWord } from "../lib/util";
import styles from "./board.module.css";
import Image from "next/image";
import refreshIcon from "../public/refresh.svg";

const ROW_COUNT = 6;

export const Board = ({}) => {
  const [words, setWords] = useState([""]);
  const [guessWord, setGuessWord] = useState(selectGuessWord());

  console.log(words);
  console.log(guessWord);

  const restartButtonRef = useRef();

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
      // console.log(e);

      restartButtonRef.current.blur();

      if (e.code === "Enter") {
        setWords((words) =>
          words.length < 7 && words[0].length === 5 && isValidWord(words[0])
            ? ["", ...words]
            : words
        );
      } else if (e.code === "Backspace") {
        setWords((words) => {
          const [currentWord, ...restWords] = words;
          return [
            `${currentWord.slice(0, currentWord.length - 1)}`,
            ...restWords,
          ];
        });
      } else if (e.key >= "a" && e.key <= "z") {
        setWords((words) => {
          if (words[0].length === 5) return words;

          const [currentWord, ...restWords] = words;
          return [`${currentWord}${e.key}`, ...restWords];
        });
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handleRestart = () => {
    setWords([""]);
    setGuessWord(selectGuessWord());
  };

  const wordsReversed = words.slice().reverse();

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
      <div className={styles.board}>
        {[...Array(ROW_COUNT)].map((e, i) => (
          <Row
            key={i}
            active={i === words.length - 1}
            word={wordsReversed[i]}
            guessWord={guessWord}
          />
        ))}
      </div>
      <Keyboard usedWords={words.slice(1)} guessWord={guessWord} />
    </>
  );
};
