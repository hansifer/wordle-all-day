import { validWords } from "./valid-words";
import { victoryMessages } from "./victory-messages";

export function isValidWord(word) {
  return word.length === 5 && validWords.includes(word);
}

export function selectTargetWord() {
  return validWords[Math.floor(Math.random() * validWords.length)];
}

export function selectVictoryMessage() {
  return victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
}
