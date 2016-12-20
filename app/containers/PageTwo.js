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
import PageOne from './PageOne'
export default class PageTwo extends Component {
  _pressButton() {
    const { navigator } = this.props;
    if(navigator) {
        navigator.pop();
    }
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor: 'red'}}>
        <View style={{flex: 1, backgroundColor: 'yellow',alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this._pressButton.bind(this)}>
            <Text>PageTwo 点我返回</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
