import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: {} ) => {
  const enhancers = [applyMiddleware(sagaMiddleware, logger)];

  const compostEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    rootReducer,
    initialState,
    compostEnhancers,
  );

  sagaMiddleware.run(rootSaga);
  
  return store;
}

export default configureStore;