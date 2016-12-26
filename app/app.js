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
import Calendar from './containers/Calendar';
import MenuScreen from './containers/MenuScreen';
import LoadingView from './containers/LoadingView';
import Refresh from './containers/Refresh';
import ArtTest from './containers/ArtTest';
import Draw from './containers/Draw';
import MoveCircle from './containers/MoveCircle';
import Pageview from './containers/Pageview';
import SvgTest from './containers/SvgTest';
import PullView from './containers/PullView';
import PullViewCustomer from './containers/PullViewCustomer'
import PullViewCustomerAndroid from './containers/PullViewCustomerAndroid'

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
        <PullView />
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
