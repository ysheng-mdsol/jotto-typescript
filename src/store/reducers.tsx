import { combineReducers } from 'redux';

import { RootState, ActionTypes, RootAction } from './types';

export default combineReducers<Partial<RootState>, RootAction>({
  guessedWords: (state = [], action) => {
    switch (action.type) {
      case ActionTypes.GUESS_WORD:
        return [...state, action.payload];
      default:
        return state;
    }
  },
  secretWord: (state = '', action) => {
    switch (action.type) {
      case ActionTypes.SET_SECRET_WORD:
        return action.payload;
      default:
        return state;
    }
  },
  success: (state = false, action) => {
    switch (action.type) {
      case ActionTypes.CORRECT_GUESS:
        return true;
      default:
        return state;
    }
  }
});

