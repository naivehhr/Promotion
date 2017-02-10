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
  Easing
} from 'react-native';
import { CreateStyleSheet } from '../util/MyStyleSheet'

export default class TransprentView extends Component {

  constructor(){
    super()
    this.state = {
      backgroundColor: new Animated.Value(0),
    }
  }

  componentDidMount() {

    Animated.timing(
      this.state.backgroundColor,
      {
       toValue: 300,
       duration: 1000,
       easing: Easing.linear
     }).start()
  }

  render() {
    const { marTop } = this.state
    const color = this.state.backgroundColor.interpolate({
      inputRange: [0, 300],
      outputRange: ['rgba(255, 0, 0, 1)', 'rgba(255, 255,255, 0)']
    })
    return (
      <View style={styles.container}>
        <Animated.View style={{width: 200, height: 200, backgroundColor: color}} />
      </View>
    );
  }
}

const styles = CreateStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ios: {
      backgroundColor: 'yellow'
    },
    android: {
      backgroundColor: 'blue'
    }
  },
});
