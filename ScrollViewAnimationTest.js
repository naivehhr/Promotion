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

const o = Dimensions.get("window")
const W = o.width
const H = o.height


// IOS 的差不多了，但android的还是得想想
// 要this.state 和 手势精细控制
// NOTE: https://facebook.github.io/react-native/docs/animated.html
const customerAnimation = {
  duration: 10,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.4,
    },
    delete: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
}

// 试了半天没什么收获，我也是醉了
class ScrollViewAnimationTest extends Component{
  constructor() {
    super()
    this.state = {
      height: 100,
      marginTop: 0,
      bounceValue: new Animated.Value(0),
      y: 0,
      backImgHeight: 200,
      translateY: 0,
      bounceValue: new Animated.Value(0),
    }
    this.opacity = 0
    this.currentPosition = 0
    this.imgSize = 100
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
    console.log('g.dy',g.dy);
    let dy = -g.dy
    if(Platform.OS == 'android') {
      this.refs._myView.setNativeProps({
        style:{height: (this.state.backImgHeight - dy) + 50}
      })
      this.refs._imgView.setNativeProps({
        style:{marginTop: 40 - dy}
      })

      if(this.currentPosition <= 0){
        console.log('应该透明');
        this.opacity = 0
        this.refs.header.setNativeProps({
           style:{opacity : this.opacity}
        })
      } else {
        if(this.currentPosition > dy) {
          console.log('加色-');
          this.opacity = this.opacity - 0.015
          this.refs.header.setNativeProps({
             style:{opacity : this.opacity}
          })
          this.imgSize = this.imgSize + 5
          if(this.imgSize > 100) this.imgSize = 100
          this.refs._imgView.setNativeProps({
            style:{
              height: this.imgSize,
              width: this.imgSize ,
              borderRadius: this.imgSize / 2}
          })
        } else {
          console.log('加色+');
          this.opacity = this.opacity + 0.015
          this.refs.header.setNativeProps({
             style:{opacity : this.opacity}
          })
          this.imgSize = this.imgSize - 5
          if(this.imgSize < 40) this.imgSize = 40
          this.refs._imgView.setNativeProps({
            style:{
              height: this.imgSize,
              width: this.imgSize ,
              borderRadius: this.imgSize / 2}
          })
        }
      }
      this.currentPosition = dy
    } else {
      // console.log(this.currentPosition);
    }
  }
  onEnd(e, g) {
    //android 上面还真是有问题
    // let dy = -g.dy
    // console.log('wokao');
    // this.refs._myView.setNativeProps({
    //   style:{height:200}
    // })
    // this.refs._imgView.setNativeProps({
    //   style:{marginTop: 40}
    // })
    // // console.log(this.currentPosition);
    // // if(this.currentPosition < )
    // // this.currentPosition = 0
    // this.opacity = 0
    // this.refs.header.setNativeProps({
    //    style:{opacity : this.opacity}
    // })
    // this.imgSize = 100
    // this.refs._imgView.setNativeProps({
    //   style:{
    //     height: this.imgSize,
    //     width: this.imgSize ,
    //     borderRadius: this.imgSize / 2}
    // })
  }
  componentDidMount() {
    setTimeout(() => {
      // this.aa()
    }, 2000)
  }

  aa() {
    this.refs._scrollView.scrollTo({ y: 30, animated: true})
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('1111');
    // LayoutAnimation.linear();
    // LayoutAnimation.configureNext(customerAnimation);
  }

  _onScroll(e) {
    // console.log(e.nativeEvent);
    let _y = e.nativeEvent.contentOffset.y
    console.log('_y',_y);
    this.refs._myView.setNativeProps({
      style:{height: (this.state.backImgHeight - _y) + 50}
    })
    if(this.currentPosition <= 0){
      console.log('应该透明');
      this.opacity = 0
      this.refs.header.setNativeProps({
         style:{opacity : this.opacity}
      })

    } else {
      if(this.currentPosition > _y) {
        console.log('加色-');
        this.opacity = this.opacity - 0.015
        this.refs.header.setNativeProps({
           style:{opacity : this.opacity}
        })
        this.imgSize = this.imgSize + 5
        if(this.imgSize > 100) this.imgSize = 100
        this.refs._imgView.setNativeProps({
          style:{
            height: this.imgSize,
            width: this.imgSize ,
            borderRadius: this.imgSize / 2}
        })
      } else {
        console.log('加色+');
        this.opacity = this.opacity + 0.015
        this.refs.header.setNativeProps({
           style:{opacity : this.opacity}
        })
        this.imgSize = this.imgSize - 5
        if(this.imgSize < 40) this.imgSize = 40
        this.refs._imgView.setNativeProps({
          style:{
            height: this.imgSize,
            width: this.imgSize ,
            borderRadius: this.imgSize / 2}
        })
      }
    }
    this.currentPosition = _y
  }

  measureView(event) {
    // console.log('event peroperties: ', event.nativeEvent.layout.height);
    this.setState({
      // x: event.nativeEvent.layout.x,
      // y: event.nativeEvent.layout.y,
      // width: event.nativeEvent.layout.width,
      // height: event.nativeEvent.layout.height
    })
  }

  render() {
    // return (
    //   <View style={{flex: 1}}  >
    //     <View style={{height: this.state.height, backgroundColor: 'red'}}>
    //       <Image style={{height: this.state.height}} source={require('./1.jpg')} />
    //     </View>
    //     <ScrollView {...this._panResponder.panHandlers}
    //       style={{flex: 1, backgroundColor: 'yellow'}}>
    //       <Text>123</Text>
    //     </ScrollView>
    //   </View>
    // )
    // console.log(this.state.backImgHeight);
    return (
      <View style={{flex: 1}}  >
        <View style={{height: 20}} />
        <Image
          ref='_myView'
         style={{
          position: 'absolute',
          width: W,
          height: 200,
          left: 0,
          top: 20,
        }} source={require('./1.jpg')} />
      <View ref={'header'} style={{width: W,height: 40, backgroundColor: 'green'}} opacity={this.opacity}/>
        <ScrollView
          {...this._panResponder.panHandlers}
          ref='_scrollView'
          style={{flex: 1, backgroundColor: 'transparent'}}
          onScroll={this._onScroll.bind(this)}
          scrollEventThrottle={16}
          scrollEnabled={true}
          >
          <View style={{flex:1,alignItems: 'center' ,
            backgroundColor: 'transparent',
          }} onLayout={this.measureView.bind(this)}>
            <Image
              ref='_imgView'
              style={{
                flex: 1,
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                marginTop: 40,
                marginBottom: 10,
                alignItems: 'center' ,
              }} source={require('./1.jpg')} />
          </View>
           <View style={{flex: 1,width: W, backgroundColor: 'red', height: 200}}>
             <Text>下方面文本区域</Text>
           </View>
        </ScrollView>
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
