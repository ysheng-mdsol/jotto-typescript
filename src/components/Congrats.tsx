import React from 'react';

import { JottoState } from '../store/reducers';

const Congrats = (props: JottoState) => {
  if (!props.success) {
    return (
      <div data-test="component-congrats" />
    );
  }

  return (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        Congrats
            </span>
    </div>
  );
};

export default Congrats;