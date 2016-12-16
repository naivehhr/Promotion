
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
        <MyScrollView />
      </View>
    );
  }
}
class Header extends Component {
  render() {
    return (
      <View style={{
          height: 80,
          width: W,
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
    }
    this.bounceValue = new Animated.Value(0),
    this.startPosotion = -50 //手势开始时Y坐标
    this._dy = 0 // 上一个偏移量
  }
  componentWillMount() {
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


    // this.bounceValue.addListener({
    //   onSpringUpdate: () => {
    //     this.setState({scale: this._scrollSpring.getCurrentValue()});
    //   },
    // });
    this.bounceValue.addListener((v) => {
      this.startPosotion = v.value
    })
  }

  componentDidMount() {
    this.bounceValue.setValue(-50);
  }
  onStart(e, g) {
    console.log('start startPosotion', this.startPosotion);

    // this.refs._content.setNativeProps({
    //   style:{marginTop: this.startPosotion}
    // })

    // this.bounceValue.setValue(this.startPosotion);
  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  onMove(e, g) {
    console.log('g.dy',g.dy);
    // if(g.dy > 100) return
    let key = g.dy - this._dy
    this.startPosotion = this.startPosotion + key
    this.bounceValue.setValue(this.startPosotion);
    this._dy = g.dy
    return

    // let key = g.dy - this._dy
    // this.startPosotion = this.startPosotion + key
    // this.refs._content.setNativeProps({
    //   style:{marginTop: this.startPosotion}
    // })
    // this._dy = g.dy
    // return


    // this.refs._scrollView.setNativeProps({
    //   style:{marginTop: g.dy}
    // })

    // if(this.startPosotion >= 0) {
    //   let key = g.dy - this._dy
    //   console.log('key',key);
    //   if(key >= 0) {
    //     console.log('展开+');
    //     this.startPosotion = this.startPosotion + key
    //   } else {
    //     this.startPosotion = this.startPosotion + key
    //     console.log('展开-');
    //   }
    //   this.refs._scrollView.setNativeProps({
    //     style:{marginTop: this.startPosotion}
    //   })
    //   this._dy = g.dy
    // } else {
    //   let key = g.dy - this._dy
    //   console.log('key',key);
    //   if(key >= 0) {
    //     console.log('收缩-');
    //     this.startPosotion = this.startPosotion + key
    //   } else {
    //     this.startPosotion = this.startPosotion + key
    //     console.log('收缩+');
    //   }
    //   this.refs._scrollView.setNativeProps({
    //     style:{marginTop: this.startPosotion}
    //   })
    //   this._dy = g.dy
    // }
    //
    // console.log('move startPosotion', this.startPosotion);
  }

  onEnd(e, g) {
    this._dy = 0
    let easing = Easing.in(Easing.quad)
    if(this.startPosotion > 10) {
      // this.startPosotion = 0
      // this.state.bounceValue.setValue(this.startPosotion);
      this.bounceValue.setValue(this.startPosotion)
      Animated.timing(
        this.bounceValue,
        {
          toValue: -50,
          duration: 500,
          easing
        }
      ).start(() => {
        this.startPosotion = -50
      })

    }
  }


  renderRow() {
    let a = [1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9,1,1,2,3,4,5,6,7,8,9,1].map((item, index) => {
      return (
        <View key={'_item' + index} style={{height: 100,
            backgroundColor:index% 2== 0? 'yellow': 'green',
          }}>
            <Text>asdfasdf</Text>
        </View>
      )
    })
    return (
      <Animated.View
        ref={'_content'}
        style={{
          flex:1,
          marginTop: this.bounceValue,
        }}>
        {a}
        <View style={{
            width: W,
            height: 50,
            backgroundColor: 'red'}}>
            <View>
              <Text>Push Refresh Animation</Text>
            </View>
        </View>
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={{
          flex: 1,
        }} >

        <ScrollView
          ref={'_scrollView'}
          {...this._panResponder.panHandlers}
          style={{flex: 1,
            backgroundColor: '#FFC0CB',
          }}
          scrollEnabled={true}
          bounces={false}
          >
          <View style={{
              width: W,
              height: 50,
              backgroundColor: 'red'}}>
              <View>
                <Text>Pull Refresh Animation</Text>
              </View>
          </View>
          {this.renderRow()}

        </ScrollView>

      </View>
    );
  }
}

module.exports = Refresh
