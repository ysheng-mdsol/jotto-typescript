import React from 'react';
import { Store } from 'redux';
import { connect } from 'react-redux';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import { getSecretWord } from '../store/actions';
import { RootState, RootAction } from '../store/types';

interface Props extends Partial<RootState> {
  getSecretWord: () => void;
  store?: Store<Partial<RootState>, RootAction>;
};

export class UnconnectedApp extends React.Component<Props, RootState> {

  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <button
          className="btn btn-primary mb-2"
          onClick={() => this.props.getSecretWord()}>
          New Word
        </button>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(
  mapStateToProps,
  { getSecretWord }
)(UnconnectedApp);
