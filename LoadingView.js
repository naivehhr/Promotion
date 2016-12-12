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
var TIMES = 400;
var LoadingView = React.createClass({

  getInitialState() {
    return {
      angle: new Animated.Value(0),
    };
  },

  componentDidMount() {
    this._animate();
  },

  _animate() {
    this.state.angle.setValue(0);
    this._anim = Animated.timing(this.state.angle, {
      toValue: 360*TIMES,
      duration: 800*TIMES,
      easing: Easing.linear
    }).start(this._animate);
  },


  render() {
    return (
      <View style={styles.container}>
          <Animated.Image
            source={require('./1.jpg')}
            style={[
              styles.rotateCard,
              {transform: [
                {rotate: this.state.angle.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg']
                })},
              ]}]}>
          </Animated.Image>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotateCard: {
    width:35,
    height:35,
    justifyContent:'center',
    backgroundColor:'transparent'
  }
});


module.exports = LoadingView;
