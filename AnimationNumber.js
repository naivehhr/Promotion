
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

//表示不会写啊。。。
class AnimationNumber extends Component {
  constructor() {
    super()
    this.state = {
      num: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(()=>{
      if(this.state.num > 10000){
        clearInterval(this.interval)
      } else {
        this.setState({num: this.state.num + 10})
      }
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text style={{}}>
          {this.state.num}
        </Animated.Text>
      </View>
    );
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
module.exports = AnimationNumber
