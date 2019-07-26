import { combineReducers } from 'redux';

import { actionTypes } from './actions';
import { GuessedWord } from './models';

export type JottoState = {
  readonly guessedWords?: GuessedWord[];
  readonly secretWord?: string;
  readonly success?: boolean;
};

export default combineReducers<JottoState>({
  guessedWords: (state = [], action) => {
    switch (action.type) {
      case actionTypes.GUESS_WORD:
        return [...state, action.payload];
      default:
        return state;
    }
  },
  secretWord: (state = '', action) => {
    switch (action.type) {
      case actionTypes.SET_SECRET_WORD:
        return action.payload;
      default:
        return state;
    }
  },
  success: (state = false, action) => {
    switch (action.type) {
      case actionTypes.CORRECT_GUESS:
        return true;
      default:
        return state;
    }
  }
});

