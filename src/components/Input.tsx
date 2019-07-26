import React, { SyntheticEvent, RefObject } from 'react';
import { connect } from 'react-redux';

import { guessWord } from '../store/actions';
import { JottoState } from '../store/reducers';

interface Props extends JottoState {
  guessWord: (x: string) => void;
};

export class UnconnectedInput extends React.Component<Props, {}> {
  inputBox: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);    

    this.inputBox = React.createRef<HTMLInputElement>();
  }

  submitGuessedWord = (event: SyntheticEvent) => {
    event.preventDefault();
    const node = this.inputBox.current;
    if (node) {
      const guessedWord = node.value;

      if (guessedWord && guessedWord.length > 0) {
        this.props.guessWord(guessedWord);
      }

      node.value = '';
    }
  }

  render() {
    const contents = this.props.success
      ? null
      : (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            ref={this.inputBox}
            id="word-guess"
            type="text"
            placeholder="enter guess" />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            type="submit"
            onClick={this.submitGuessedWord}>
            Submit
          </button>
        </form>
      );

    return (
      <div data-test="component-input">
        {contents}
      </div>
    );
  }
}

const mapStateToProps = (state: JottoState) => {
  return { success: state.success };
};

export default connect(
  mapStateToProps, 
  { guessWord }
)(UnconnectedInput);