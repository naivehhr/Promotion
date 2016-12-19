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
class Dr extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('加载','Dr');
    
  }

  componentWillUnmount() {
    console.log('卸载','Dr');
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'yellow'}}/>
    );
  }
}

module.exports = Dr
