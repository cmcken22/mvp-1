import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './../reducers';

export default function configureStore(initialState) {

  let middlewares = [thunk];

  const composeEnhancers = 
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  middlewares.push(createLogger({collapsed:true}));
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware( ...middlewares)));

}