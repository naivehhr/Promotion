/**
 * 动画的使用
 */
// http://reactnative.cn/docs/0.39/animations.html#content
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
  Image
} from 'react-native';



// NOTE: https://facebook.github.io/react-native/docs/animated.html

// 试了半天没什么收获，我也是醉了
class ScrollViewAnimationTest extends Component{
  constructor() {
    super()
    this.state = {
      height: 100,
      marginTop: 0
    }
  }

  componentWillMount() {
    // Animated.spring(
    //   this.state.height,
    //   {
    //     toValue: 200,
    //     friction: 10
    //   }
    // ).start();
    this._panResponder = PanResponder.create({
        // 要求成为响应者：
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => true,
        onMoveShouldSetPanResponder: (event, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

        // 开始手势操作
        onPanResponderGrant: (event, gestureState) => {
            this.onStart(event, gestureState);
        },
        // 移动操作
        onPanResponderMove: (event, gestureState) => {
            this.onMove(event, gestureState);
        },
        // 释放手势
        onPanResponderRelease: (event, gestureState) => {
            this.onEnd(event, gestureState);
        }
    })
  }

  onStart(e, g) {
    // console.log(this.state.height);
  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  onMove(e, g) {
    // let y = e.nativeEvent.pageY
    let dy = g.dy
    // console.log('dy',dy);
    // console.log(this.state.height._value);
    let newHeight = this.state.height + dy
    let _marginTop = dy
    if(newHeight > 250) {
      return
    } else if(newHeight < 100) {
      return
    }
    this.setState({
      marginTop: _marginTop,
      height: newHeight
    })
    // console.log('newHeight',newHeight);
    // Animated.spring(
    //   this.state.height,
    //   {
    //     toValue: newHeight,
    //     friction: 10
    //   }
    // ).start();
  }
  onEnd(e, g) {
    // let dy = g.dy
    // // console.log(dy);
    // this.setState({
    //   height: 100 + dy
    // })
  }
  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
    LayoutAnimation.linear();
  }

  render() {
    console.log(this.state.marginTop);
    return (
      <View style={{flex: 1}}  >
        <View style={{height: this.state.height, backgroundColor: 'red'}}>
          <Image style={{height: this.state.height}} source={require('./1.jpg')} />
        </View>
        <View {...this._panResponder.panHandlers}
          style={{flex: 1, backgroundColor: 'yellow'}}>
          <Text>123</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    }
});

module.exports = ScrollViewAnimationTest
