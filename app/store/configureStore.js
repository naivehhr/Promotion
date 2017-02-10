import React, { Component, AsyncStorage} from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import devTools from 'remote-redux-devtools';
import reducer from '../reducers';
import { Platform } from 'react-native';

// const reducer = combineReducers(reducers);
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)(reducer);


// export default function ConfigureStore() {
//   if (!__DEV__) {
//     global.console = {
//       info: () => {},
//       log: () => {},
//       warn: () => {},
//       error: () => {},
//     };
//   }
//   // const store = createStoreWithMiddleware(reducer);
//   const store = (createStoreWithMiddleware);
//   return store;
// }
//
const enhancer = compose(
  autoRehydrate(),
  applyMiddleware(
    thunk
  ),
  devTools()
)

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    enhancer
  )
  persistStore(store, {storage: AsyncStorage, blacklist : ['nav', 'tabbar']}, () => {
    console.log('persistStore complete');
  })
  return store;
}
