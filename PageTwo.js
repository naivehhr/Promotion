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
    this.props.navigator.push({
      name: 'PageOne',
      component: PageOne,
    })
  }
  render() {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text>
          two
        </Text>
        <TouchableOpacity onPress={this._pressButton.bind(this)}>
                     <Text>点我跳转</Text>
                 </TouchableOpacity>
      </View>
    );
  }
}
