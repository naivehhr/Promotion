
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
        <Header />
        <Text>dadsf</Text>
      </View>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <View style={{
          position: 'absolute',
          height: 80,
          width: W,
          top:0,
          left:0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue',
        }}>
          <Text style={{color: 'white'}}>HEADER</Text>
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
    this.currentPosition = 0 //中间量
    this.endPosition = 0 // 手势结束时Y坐标
    this.startPosotion = 0 //手势开始时Y坐标
    this._dy = 0 // 上一个偏移量
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
    this.block = true
    console.log('start startPosotion', this.startPosotion);
    this.refs._scrollView.setNativeProps({
      style:{marginTop: this.startPosotion}
    })
  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  // 下面的方向性代码先不动
  onMove(e, g) {
    console.log('g.dy',g.dy);
    if(this.startPosotion >= 0) {
      let key = g.dy - this._dy
      console.log('key',key);
      if(key >= 0) {
        console.log('展开+');
        this.startPosotion = this.startPosotion + key
      } else {
        this.startPosotion = this.startPosotion + key
        console.log('展开-');
      }
      this.refs._scrollView.setNativeProps({
        style:{marginTop: this.startPosotion}
      })
      this._dy = g.dy
    } else {
      let key = g.dy - this._dy
      console.log('key',key);
      if(key >= 0) {
        console.log('收缩-');
        this.startPosotion = this.startPosotion + key
      } else {
        this.startPosotion = this.startPosotion + key
        console.log('收缩+');
      }
      this.refs._scrollView.setNativeProps({
        style:{marginTop: this.startPosotion}
      })
      this._dy = g.dy
    }

    console.log('move startPosotion', this.startPosotion);
  }
  onEnd(e, g) {
    this._dy = 0
  }


  render() {
    return (
      <View style={{
          flex: 1,
          width: W,
          height: 300
        }} >
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
          contentContainerStyle={{
            flex: 1,
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
