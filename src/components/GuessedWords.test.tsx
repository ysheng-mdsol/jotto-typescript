import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';
import GuessedWords from './GuessedWords';

const defaultProps = {
  guessedWords: [
    { guessedWord: 'train', letterMatchCount: 3 },
  ]
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

describe('if there are no words guessed', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders instructions to guess a word', () => {
    const component = findByTestAttr(wrapper, 'guess-instructions');
    expect(component.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper: ShallowWrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'agile', letterMatchCount: 1 },
    { guessedWord: 'party', letterMatchCount: 5 },
  ]
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders guessed words section', () => {
    const component = findByTestAttr(wrapper, 'guessed-words');
    expect(component.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const component = findByTestAttr(wrapper, 'guessed-word');
    expect(component.length).toBe(guessedWords.length);
  });
});