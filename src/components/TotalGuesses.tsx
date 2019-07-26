import React from 'react';

import { JottoState } from '../store/reducers';

const TotalGuesses = (props: JottoState) => {
  return (
    <div>
      Total Guesses: {props.guessedWords? props.guessedWords.length : 0}
    </div>
  );
};

export default TotalGuesses;