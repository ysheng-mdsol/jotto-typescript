import React from 'react';

import { RootState } from '../store/types';

const TotalGuesses = (props: Partial<RootState>) => {
  return (
    <div>
      Total Guesses: {props.guessedWords? props.guessedWords.length : 0}
    </div>
  );
};

export default TotalGuesses;