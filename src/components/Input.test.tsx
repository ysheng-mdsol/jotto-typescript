import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Jest } from '@jest/environment';

import Input, { UnconnectedInput } from './Input';
import { findByTestAttr, storeFactory } from '../../test/testUtils';

const setup = (props = {}): ShallowWrapper => {
  const store = storeFactory(props);
  const wrapper = shallow(<Input store={store} />).dive().dive();
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const initState = { success: false };
      wrapper = setup(initState);
    });

    test('renders component without error', () => {      
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('renders input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(1);
    });

    test('renders submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      const initState = { success: true };
      wrapper = setup(initState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('does not render input box', () => {
      const component = findByTestAttr(wrapper, 'input-box');
      expect(component.length).toBe(0);
    });

    test('does not render submit button', () => {
      const component = findByTestAttr(wrapper, 'submit-button');
      expect(component.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator call', () => {
  let guessWordMock: jest.Mock;
  let wrapper: ShallowWrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    guessWordMock = jest.fn();

    const props = {
      guessWord: guessWordMock
    };

    // set up app component with guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    // add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord };

    // simulate click
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() { } });
  });

  test('calss `guessWord` when button is clicked', () => {        
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessWord` with input value as argument', () => {
    const guessWordArgs = guessWordMock.mock.calls[0];
    expect(guessWordArgs).toEqual([guessedWord]);
  });

  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});