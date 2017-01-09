import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Provider } from 'react-redux';

import SplashScreen from 'react-native-smart-splash-screen'

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
import PullNoFooter from './containers/PullNoFooter'
import DemoClass from './containers/DemoClass'
import PullViewIOS from './containers/PullViewIOS'
import ListViewTest from './containers/ListViewTest'
import PullToRefreshListViewDemo from './containers/PullToRefreshListViewDemo'
import AnimationNumber from './containers/AnimationNumber'
import SvgExample from './containers/SvgExample'



import PllToRefreshScrollView from './containers/refreshlistview/react-native-smart-pull-to-refresh-listview-demo'
import PllToRefreshScrollViewAutoLoad from './containers/refreshlistview/react-native-smart-pull-to-refresh-listview-demo3'
import PullToRefreshListView from './containers/refreshlistview/react-native-smart-pull-to-refresh-listview-demo2'
import PullToRefreshListViewAutoLoad from './containers/refreshlistview/react-native-smart-pull-to-refresh-listview-demo4'
import PullToRefreshListViewNodata from './containers/refreshlistview/react-native-smart-pull-to-refresh-listview-demo8'
import StickyHeaderAndroidPullToRefreshDemo from './containers/refreshlistview/sticky-header-android'
import ScrollableTabViewPullToRefreshDemo from './containers/refreshlistview/use-with-react-native-scrollable-tab-view'

import ConfigureStore from './store/configureStore'
const store = ConfigureStore()


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      index: 1
    }
  }
  componentDidMount() {
    SplashScreen.close(SplashScreen.animationType.scale, 850, 2000)
  }
  render() {
    return (
      <Provider store={store}>
        <SvgExample />
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
