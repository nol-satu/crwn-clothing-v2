import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = store => next => action => {
  if (!action.type)
    return next(action)

  console.log('#store.js type: ', action.type)
  console.log('#store.js payload: ', action.payload)
  console.log('#store.js currentState: ', store.getState())

  next(action)
  console.log('#store.js nextState: ', store.getState())

}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)