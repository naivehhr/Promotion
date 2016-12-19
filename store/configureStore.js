import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
const reducer = combineReducers(reducers);


export default function ConfigureStore() {
  const store = createStoreWithMiddleware(reducer);
  return store;
}
