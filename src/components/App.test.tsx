import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { storeFactory } from '../../test/testUtils';
import App, { UnconnectedApp } from './App';

const setup = (initState = {}): ShallowWrapper => {
  const store = storeFactory(initState);
  const wrapper = shallow<UnconnectedApp>(<App store={store} />).dive().dive();
  return wrapper;
};

describe('redux properties', () => {
  test('has access to `success` state', () => {
    const success = true;
    const wrapper = setup({ success });
    const instance = wrapper.instance() as UnconnectedApp;
    const successProp = instance.props.success;
    expect(successProp).toBe(success);
  });

  test('has access to `secretWord` state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const instance = wrapper.instance() as UnconnectedApp;
    const secretWordProp = instance.props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test('has access to `guessedWords` state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const instance = wrapper.instance() as UnconnectedApp;
    const guessedWordsProp = instance.props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });

  test('`getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const instance = wrapper.instance() as UnconnectedApp;
    const getSecretWordProp = instance.props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test('`getSecretWord` runs on App mount', () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  }

  // set up app component with getSecretWorkMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);
  const instance = wrapper.instance() as UnconnectedApp;

  // run lifecycle method 
  instance.componentDidMount();

  // check to see if mock ran
  const getSecretWordCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCount).toBe(1);
});
