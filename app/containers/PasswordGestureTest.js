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

import PasswordGesture from 'react-native-gesture-password'

const Password1 = '';
class PasswordGestureTest extends Component {
  constructor() {
    super()
    this.state = {
      status: 'right',
      message: 'Password is right, success.'
    }
  }

  onEnd(password) {
    if (password == '123') {
       this.setState({
           status: 'right',
           message: 'Password is right, success.'
       });
         // your codes to close this view
     } else {
       this.setState({
         status: 'wrong',
         message: 'Password is wrong, try again.'
       });
     }
  }


  onStart() {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }

  onReset () {
    this.setState({
      status: 'normal',
      message: 'Please input your password (again).'
    });
  }

  render() {
    return (
      <PasswordGesture
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

module.exports = PasswordGestureTest
