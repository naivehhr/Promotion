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
import App from './App';
import MyApp from './MyApp';
import Pageview from './Pageview';
import Animation from './Animation';
import PanResponder from './PanResponder';
import ComponentInteraction from './ComponentInteraction';
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
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>'index=='{this.state.index}</Text>
        <ComponentInteraction {...this.state}/>
      </View>
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

AppRegistry.registerComponent('MyCalendar', () => MyCalendar);
