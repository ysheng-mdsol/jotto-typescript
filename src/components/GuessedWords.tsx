import React from 'react';

import TotalGuesses from './TotalGuesses';
import { RootState } from '../store/types';

const GuessedWords = (props: Partial<RootState>) => {
  let contents;

  if (props.guessedWords) {
    if (props.guessedWords.length === 0) {
      contents = (
        <span data-test="guess-instructions">
          Try to guess the secret word!
              </span>
      );
    } else {
      const rows = props.guessedWords.map((word, index) => {
        return (
          <tr key={index} data-test="guessed-word">
            <td>{index + 1}</td>
            <td>{word.guessedWord}</td>
            <td>{word.letterMatchCount}</td>
          </tr>
        );
      });
      contents = (
        <div data-test="guessed-words">
          <h3>Guessed Words</h3>
          <table className="table table-sm">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Guess</th>
                <th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      );
    }
  } 

  return (
    <div data-test="component-guessed-words">
      {contents}
      <TotalGuesses guessedWords={props.guessedWords} />
    </div>
  );
};

export default GuessedWords;