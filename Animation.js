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
  Easing
} from 'react-native';



// NOTE: https://facebook.github.io/react-native/docs/animated.html

class Animation extends Component{
  constructor() {
    super()
    this.state = {
      x: 10,
      y: 10,
      bounceValue: new Animated.Value(0),
      fadeInOpacity: new Animated.Value(0)
    }
  }

  componentWillMount() {
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

  }

  onMove(e, g) {
    let x = e.nativeEvent.pageX /10;
    let y = e.nativeEvent.pageY /10;
    this.setState({
      x: x,
      y: y
    })
  }
  onEnd(e, g) {

  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);
    // Animated.spring(
    //   this.state.bounceValue,
    //   {
    //     toValue: 0.8,
    //     friction: 1
    //   }
    // ).start();
    //
    // Animated.timing(this.state.fadeInOpacity, {
    //   toValue: 1,
    //   duration: 500,
    //   easing: Easing.linear,
    // }).start((r) => {
    //   // console.log('rrr', r);
    // })

    //队列操作了
    let aa = Animated.parallel([
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: 0.8,
          friction: 1
        }
      ),

      Animated.timing(this.state.fadeInOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
      }),
    ]).start()
    setTimeout(() => {
      // console.log(this.aa);
    },3000)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}} {...this._panResponder.panHandlers}>
        <Animated.Image
         source={require('./1.jpg')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            transform: [
              {scale: this.state.bounceValue},
            ]
          }}
        />
        <Animated.Image
         source={require('./1.jpg')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            transform: [{translateX: this.state.x}, {translateY: this.state.y}, {rotateZ: '1rad'}]
          }}
        />
        <Animated.View style={[styles.demo, {
                opacity: this.state.fadeInOpacity
            }]}>
            <Text style={styles.text}>悄悄的，我出现了</Text>
        </Animated.View>
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

module.exports = Animation
