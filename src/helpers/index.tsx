export function getLetterMatchCount(guessedWord: string, secretWord: string) {
  const secretLetterArray: Array<string> = Array.from(new Set(secretWord.split('')));
  const guessedLetterArray: Array<string> = Array.from(new Set(guessedWord.split('')));
  return [...secretLetterArray].filter(letter => guessedLetterArray.includes(letter)).length;
};