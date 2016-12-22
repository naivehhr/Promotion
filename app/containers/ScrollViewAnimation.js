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
//http://browniefed.com/react-native-animation-book/events/SCROLL.html
// TODO: 这里可以定义一个可以拉动的个人中心效果
var ScrollViewAnimation = React.createClass({
  componentWillMount: function() {
    this._animatedValue = new Animated.Value(0);
  },
  render: function() {
    var interpolatedColor = this._animatedValue.interpolate({
      inputRange: [0, 5000],
      outputRange: ['rgba(255,255,255,1)', 'rgba(51,156,177, 1)'],
      extrapolate: 'clamp'
    });

    var event = Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this._animatedValue
          }
        }
      }
    ])

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}} onScroll={event} scrollEventThrottle={16}>
          <Animated.View style={{height: 5000, backgroundColor: interpolatedColor}} />
        </ScrollView>
      </View>
    );
  }
});

module.exports = ScrollViewAnimation
