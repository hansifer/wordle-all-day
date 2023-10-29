import { useState, useEffect } from "react";
import styles from "./notification.module.css";
import { selectVictoryMessage } from "../lib/util";

export const Notification = ({ visible, guessWord, onClick }) => {
  const [message, setMessage] = useState("");

  // set state in useEffect to avoid next.js error "Text content does not match server-rendered HTML"
  useEffect(() => {
    setMessage(selectVictoryMessage());
  }, [visible]);

  return (
    <div
      className={`${styles.notification} ${
        guessWord ? styles.notificationFailed : ""
      }`}
      style={
        visible
          ? {
              top: 200,
              opacity: 1,
            }
          : {
              top: -100,
              opacity: 0,
            }
      }
      onClick={onClick}
    >
      {guessWord ? `The word was: "${guessWord}"` : message}
    </div>
  );
};
