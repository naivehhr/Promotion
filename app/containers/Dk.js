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
  Alert
} from 'react-native';
class Dk extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('加载','dk');
  }

  componentWillUnmount() {
    console.log('卸载','dk');
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}/>
    );
  }
}

module.exports = Dk
