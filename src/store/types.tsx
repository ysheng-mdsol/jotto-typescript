import { ThunkAction } from "redux-thunk";

export const ActionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD'
};

export interface GuessedWord {
  guessedWord: string;
  letterMatchCount: number;
}

export type RootState = {
  readonly guessedWords: GuessedWord[];
  readonly secretWord: string;
  readonly success: boolean;
};

interface GuessedWordAction {
  readonly type: typeof ActionTypes.GUESS_WORD;
  readonly payload: GuessedWord;
}

interface CorrectGuessAction {
  readonly type: typeof ActionTypes.CORRECT_GUESS;
  readonly payload: any;
}

interface SetSecretWordAction {
  readonly type: typeof ActionTypes.SET_SECRET_WORD;
  readonly payload: string;
}

export type RootAction = GuessedWordAction | CorrectGuessAction | SetSecretWordAction;

export type ThunkResult<R> = ThunkAction<R, Partial<RootState>, undefined, RootAction>;