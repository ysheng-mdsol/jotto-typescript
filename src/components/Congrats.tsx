import React from 'react';

import { RootState } from '../store/types';

const Congrats = (props: Partial<RootState>) => {
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