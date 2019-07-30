import { createStore, applyMiddleware } from 'redux';
import { ShallowWrapper } from 'enzyme';

import { middlewares } from '../src/configureStore';
import { RootState } from '../src/store/types';
import rootReducer from '../src/store/reducers';

export const storeFactory = (initialState: Partial<RootState>) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
  return wrapper.find(`[data-test="${val}"]`);
};
