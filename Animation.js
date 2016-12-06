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
      bounceValue: new Animated.Value(0),
      fadeInOpacity: new Animated.Value(0)
    }
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
      console.log(this.aa);
    },3000)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
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
            transform: [
             {scale: this.state.bounceValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5], })},
            ]
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
