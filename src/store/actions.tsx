import axios from 'axios';

import { ActionTypes, ThunkResult } from './types';
import { getLetterMatchCount } from '../helpers';

export const guessWord = ( guessedWord: string): ThunkResult<void> => {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    if (secretWord && secretWord.length > 0 ) {
      const letterMatchCount = getLetterMatchCount(
        guessedWord, secretWord);
      dispatch({
        type: ActionTypes.GUESS_WORD,
        payload: { guessedWord, letterMatchCount }
      });
  
      if (guessedWord === secretWord) {
        dispatch({
          type: ActionTypes.CORRECT_GUESS
        });
      }
    }
  };
};

export const getSecretWord = (): ThunkResult<void> => {
  return (dispatch) => {
    return axios.get('http://localhost:3030')
      .then(response => {
        dispatch({
          type: ActionTypes.SET_SECRET_WORD,
          payload: response.data
        });
      });
  };
};