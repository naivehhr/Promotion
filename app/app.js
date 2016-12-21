import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';


import Index from './containers/Index';
import Go from './containers/Go';


import ConfigureStore from './store/configureStore'
const store = ConfigureStore()


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      index: 1
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Go />
      </Provider>
    )
  }
}

class AA extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <View>

      </View>
    );
  }
}
