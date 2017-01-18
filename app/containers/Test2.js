import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  PanResponder,
  UIManager,
  LayoutAnimation,
  Platform,
  Animated,
  Easing,
  TouchableOpacity,
  Alert,
  Navigator
} from 'react-native';


import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageTwo from './PageTwo'
import PageOne from './PageOne'
import Dk from './Dk'
import Dr from './Dr'
import Home from './Home'
import ThreePage from './ThreePage'
import { connect } from 'react-redux'
import {show, hide, change} from '../actions/tabbarActions'
class Test2 extends Component {
  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{ name: 'ThreePage', component: ThreePage }}
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.PushFromRight
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }}
      />
    );
  }
}
module.exports = connect()(Test2)
