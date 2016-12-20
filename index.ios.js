/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import App from './App';
import MyApp from './MyApp';
import Pageview from './Pageview';
import Animation from './Animation';
import PanResponder from './PanResponder';
import ComponentInteraction from './ComponentInteraction';
import AnimatedSquare from './AnimatedSquare';
import Calendar, {Item} from './Calendar';
import Chart from './Chart';
import MenuScreen from './MenuScreen';
import Draw from './Draw';
import ArtTest from './ArtTest';
import SvgTest from './SvgTest';
import MoveCircle from './MoveCircle';
import QTest from './QTest';
import root from './root';

import App from './app/app';
export default class MyCalendar extends Component {
  constructor(){
    super()
    this.state = {
      index: 1
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({index: 2})
    }, 2000)

    // console.log('--',Item);
  }
  render() {
    return (
      <QTest />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyCalendar', () => App);
