
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
import LinearGradient from 'react-native-linear-gradient';
import Reactotron from 'reactotron-react-native'
//表示写的差不多了呢
class AnimationNumber extends Component {
  constructor() {
    super()
    this.state = {
      num: 0,
      fadeAnim: new Animated.Value(0),
      rotation: new Animated.Value(0),
      duration: 100,
      h: 70,
      w: 100
    }
    // this.state.duration = 100
    this.arr = [
      '1.00', '1.05', '2.07', '3.50', '4.90', '5.20', '6.10', '7.99'
    ]
  }

  componentDidMount() {
Reactotron.log('hello rendering world111')
    this.startTimer()
    this.a()
    //requestAnimationFrame // 这个东西不是很好用啊，用Animated就够了
  }

  componentDidUpdate(){
    // this.startTimer();
    // !this.looper && this.a();
  }

  a = () => {
    // debugger
    console.log('aaa');
    // this.looper = requestAnimationFrame(this.a);
  }
  componentWillUnmount(){
     this.endTimer();
   }
  startTimer = () => {
    if(!this.arr) return
    let l = this.arr.length
    let i = 0
    this.interval = setInterval(()=>{
      if(i > l - 1){
        Animated.spring(
          this.state.fadeAnim,
          {
            toValue: 1,
            friction: 5
          }
        ).start();
        this.state.rotation.setValue(0.5)
        clearInterval(this.interval)
      } else {
        this.setState({num: this.arr[i]})
        this.doAnimated()
        ++i
      }
    }, this.state.duration + 50);
  }

 // componentDidMount = () => {
 //
 // }

 endTimer = ()=>{
    this.looper && cancelAnimationFrame(this.looptimer);
    this.looper = null;
  }

  doAnimated = () => {

    Animated.parallel([

      Animated.timing(
        this.state.fadeAnim,
        {
         toValue: 2,
         duration: this.state.duration,
         easing: Easing.linear
       }),
       Animated.timing(
         this.state.rotation,
         {
          toValue: 1,
          duration: this.state.duration,
          easing: Easing.linear
        })
    ]).start(() => {
      this.state.fadeAnim.setValue(0)
      this.state.rotation.setValue(0)
    })
  }

  render() {
    const { w, h} = this.state
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center', alignItems: 'center', width: w, height: h, backgroundColor: 'black'}} >
          <LinearGradient
            colors={['black', 'transparent']} style={{
              position: 'absolute',
              top: 0,
              width: w,
              height: h/3,
              zIndex: 100,
              opacity: 0.9
            }} />
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              transform: [{
                 translateY: this.state.fadeAnim.interpolate({
                   inputRange: [0, 1],
                   outputRange: [h/2, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                 }),
               }],
            }}
            >
            <Animated.Text style={{
              fontSize: 26,
              color: 'white',
              backgroundColor: 'transparent',
              transform: [{
                 rotateX: this.state.rotation.interpolate({
                   inputRange: [0,1],
                   outputRange: ['-60deg', '60deg']
                })
               }],
              }}>
              {this.state.num}
            </Animated.Text>
          </Animated.View>
          <LinearGradient
            colors={['transparent', 'black']} style={{
              position: 'absolute',
              bottom: 0,
              width: w,
              height: h/3,
              zIndex: 100,
              opacity: 0.9
            }} />
        </View>


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

});
module.exports = AnimationNumber
