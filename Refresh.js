
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
  Alert,
  RefreshControl
} from 'react-native';
import Dk from './Dk'


const o = Dimensions.get("window")
const W = o.width
const H = o.height

class Refresh extends Component {
  constructor() {
    super()
    this.state = {
      isRefreshing: false
    }
  }


  _onRefresh() {

  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{
            height: 80,
            width: W,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'}}>
            <Text>HEADER</Text>
        </View>
        <MyScrollView />
      </View>
    );
  }
}

class MyScrollView extends Component {

  constructor() {
    super()
    this.state = {
      isRefreshing: false,
      lastPY: 0,
      dy: 0
    }
    this.currentPosition = 0
  }
  componentWillMount() {
    // this._opacityAnimationValue = new Animated.Value(1);
    // this._moveAnimationValue = new Animated.ValueXY();
    // this._animatedValue = new Animated.ValueXY()
    // this._value = {x: 0, y: 0}
    // this._animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => {
          this.onStart(event, gestureState);
      },
      onPanResponderMove: (event, gestureState) => {
          this.onMove(event, gestureState);
      },
      onPanResponderRelease: (event, gestureState) => {
          this.onEnd(event, gestureState);
      }
    })
  }

  onStart(e, g) {
    let dy = g.dy
    this.refs._scrollView.setNativeProps({
      style:{marginTop: this.lastPY}
    })
  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  onMove(e, g) {
    console.log('y',g.dy)
    console.log('currentPosition',this.currentPosition)

    let dy = g.dy

    console.log('newPoosition',this.currentPosition);


    if(this.currentPosition >= 0) {
      console.log('展开状态');
      if(dy <= this.currentPosition){
        console.log('展开-');
      } else {
        console.log('展开+');
        // this.currentPosition = this.currentPosition + dy
        // this.refs._scrollView.setNativeProps({
        //   style:{marginTop: newPoosition}
        // })
      }
    } else {
      console.log('收缩状态');
      if(dy >= this.currentPosition) {
        console.log('收缩-');
      } else {
        console.log('收缩+');
      }
    }
    // this.currentPosition = newPoosition
  }
  onEnd(e, g) {

    // this.refs._scrollView.setNativeProps({
    //   scrollEnabled: false
    // })
    // this.refs._scrollView.scrollTo({y: -g.dy})
    // console.log(this.refs);
  }


  render() {
    return (
      <View style={{flex: 1}} >
        <View style={{
            position: 'absolute',
            width: W,
            height: 100,
            backgroundColor: 'red'}}>
            <View>
              <Text>你看到的动画</Text>
            </View>
        </View>
        <ScrollView
           ref={'_scrollView'}
          {...this._panResponder.panHandlers}
          contentContainerStyle={{flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',}}
          bounces={false}
        >
            <Text>12312</Text>
        </ScrollView>
      </View>
    );
  }
}

module.exports = Refresh
