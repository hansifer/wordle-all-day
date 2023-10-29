import { validWords } from "./valid-words";

export function isValidWord(word) {
  return validWords.includes(word);
}

export function selectGuessWord() {
  return validWords[Math.floor(Math.random() * validWords.length)];
}
