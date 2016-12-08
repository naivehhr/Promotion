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


//https://github.com/react-native-community/react-native-svg
class Draw extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'yellow', width: 300, height: 200}}>
          <View style={{backgroundColor: 'red',position: 'absolute',
            left: 0, bottom:0,width: 280, height: 180
          }}>
          <Line />
          </View>
        </View>
      </View>
    );
  }
}

class Line extends Component {
  constructor() {
    super()
    this.state = {
      bounceValue: new Animated.Value(0),
      bounceValue1: new Animated.Value(0),
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
    // Animated.timing(this.state.bounceValue, {
    //   toValue: 200,
    //   duration: 1000,
    //   easing: Easing.linear,
    // }).start((r) => {
    //   // console.log('rrr', r);
    // })

    //队列操作了
    let aa = Animated.parallel([
      Animated.timing(this.state.bounceValue, {
        toValue: 200,
        duration: 500,
        easing: Easing.linear,
      }).start((r) => {
        // console.log('rrr', r);
      }),

      Animated.timing(this.state.bounceValue1, {
        toValue: 200,
        duration: 1000,
        easing: Easing.linear,
      }).start((r) => {
        // console.log('rrr', r);
      }),
    ]).start()
    // setTimeout(() => {
    //   console.log(this.aa);
    // },3000)
  }

  render() {
    return (
      <View style={{width:10,height:10}}>
        <Animated.View style={{flex: 1,width: this.state.bounceValue,backgroundColor: 'black', height: 1,
          transform: [
           {skewX: this.state.bounceValue.interpolate({
             inputRange: [1, 10],
             outputRange: ['0deg', '1deg'],
           })},
          ]
        }}>
        </Animated.View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Draw
