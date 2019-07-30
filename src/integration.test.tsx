import { Store } from 'redux';

import { storeFactory } from '../test/testUtils';
import { guessWord } from './store/actions';
import { RootState, RootAction } from './store/types';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';

  describe('no guessed words', () => {
    let store: Store<Partial<RootState>, RootAction>;
    const initState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initState);
    });

    test('updates state correctly for unsuccessful guess', () => {      
      store.dispatch<any>(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initState,
        success: false,
        guessedWords: [{
          guessedWord: unsuccessfulGuess,
          letterMatchCount: 3
        }]
      };
      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch<any>(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initState,
        success: true,
        guessedWords: [{
          guessedWord: secretWord,
          letterMatchCount: 5
        }]
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
    const initState = { guessedWords, secretWord };
    let store: Store<Partial<RootState>, RootAction>;
    beforeEach(() => {
      store = storeFactory(initState);
    });

    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch<any>(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        ...initState,
        success: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3
          }]
      };
      expect(newState).toEqual(expectedState);
    });

    test('updates state correctly for successful guess', () => {
      store.dispatch<any>(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        ...initState,
        success: true,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: secretWord,
            letterMatchCount: 5
          }]
      };
      expect(newState).toEqual(expectedState);
    });
  });
});