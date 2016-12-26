import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  PanResponder,
  Animated,
  Easing
} from 'react-native';

import {PullView} from '../components/pullable';
const o = Dimensions.get("window")
const W = o.width
const H = o.height
export default class PullViewCustomerAndroid extends Component {
	constructor(props) {
    super(props);
    this.state = {
      refreshMsg: 'pull to refresh',
      loadingMsg: 'push to load more'
    }
    this._dy = 0 // 上一个偏移量
    this.staticHeight = -60
    this.startPosotion = this.staticHeight //当前位置
    this.headerHeight = new Animated.Value(0)

    this.isRefreshing = false
    this.isLoading = false
    this.block = false


    this.defaultXY = {x: 0, y: -60 };
    this.pan = new Animated.ValueXY()
  }



  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,
      onPanResponderGrant: (event, gestureState) => {
          this.onStart(event, gestureState);
      },
      onPanResponderMove: Animated.event([null, {dx: this.pan.x, dy: this.pan.y}]),
      onPanResponderRelease: (event, gestureState) => {
          this.onEnd(event, gestureState);
      }
    })

    this.headerHeight.addListener((v) => {
      this.startPosotion = v.value
    })
  }

  componentDidMount() {
    this.headerHeight.setValue(this.startPosotion)
  }

  onStart(e, g) {
    // this.headerHeight.setValue(this.startPosotion)
  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  onMove(e, g) {
    // console.log('g.dy',g.dy);
    // this.refs._scrollView.setNativeProps({
    //   style:{marginTop: -60 + g.dy}
    // })
    if(this.block) return
    let key = g.dy - this._dy
    this.startPosotion = this.startPosotion + key
    console.log('???',this.startPosotion);
    this.headerHeight.setValue(this.startPosotion);
    this._dy = g.dy
    if(this.startPosotion > this.staticHeight) {
      this.refs._scrollView.setNativeProps({
        bounces:false
      })
      if(this.startPosotion > 170) {
        this.setState({refreshMsg: 'refreshing....'})
      } else {
        this.setState({refreshMsg: 'pull to refresh'})
      }
    } else {
      this.refs._scrollView.setNativeProps({
        bounces:true
      })
      if(this.startPosotion < -80) {
        this.setState({loadingMsg: 'loading....'})
      } else {
        this.setState({loadingMsg: 'push to load more'})
      }
    }
    return
  }

  onEnd(e, g) {
    // console.log('eeeeeg.dy',g.dy);
    // console.log(this.startPosotion);
    this._dy = 0
    let easing = Easing.in(Easing.quad)
    if(this.startPosotion > this.staticHeight){
      console.log('pull');
      if(this.startPosotion > 170) {
        this.isRefreshing = true
        this.block = true
        this.setState({
          refreshMsg: 'loading....'
        }, () => {
          setTimeout(() => {
            this.setState({refreshMsg: 'refresh complete'})
            Animated.timing(
              this.headerHeight,
              {
                toValue: this.staticHeight,
                duration: 500,
                easing
              }
            ).start(() => {
              this.startPosotion = this.staticHeight
              this.block = false
              this.setState({refreshMsg: 'pull to refresh'})
            })
          }, 2000)
        })
      } else {
        setTimeout(() => {
          this.headerHeight.setValue(this.startPosotion)
          this.setState({loadingMsg: 'load complete'})
          Animated.timing(
            this.headerHeight,
            {
              toValue: this.staticHeight,
              duration: 500,
              easing
            }
          ).start(() => {
            this.startPosotion = this.staticHeight
          })
        }, 1)
      }
    } else {
      console.log('push');
      if(this.startPosotion < -120) {
        this.isLoading = true
        this.setState({
          loadingMsg: 'loading'
        },() => {
          setTimeout(() => {
            this.setState({loadingMsg: 'push to load more'})
            Animated.timing(
              this.headerHeight,
              {
                toValue: this.staticHeight,
                duration: 500,
                easing
              }
            ).start(() => {
              this.startPosotion = this.staticHeight
              this.setState({refreshMsg: 'push to load more'})
            })
          }, 2000)
        })
      } else {

      }
    }

  }

  render() {
    return (
      <Animated.ScrollView style={[styles.container,
        {
          marginTop: this.headerHeight.interpolate({
           inputRange: [-200,-100,-60,0,200],
           outputRange: [-100,-80,-60,-40,0]
         }),
         transform: this.pan.getTranslateTransform()
        }]}
        ref={'_scrollView'}
        bounces={false}
        {...this._panResponder.panHandlers}
        onLayout={ event => {
         console.log(event.nativeEvent.layout);
        } }
      >
        <View style={{
          width: W, height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5FCFF'}}>
          <Text>{this.state.refreshMsg}</Text>
        </View>
        <View ref={'_view'} style={{height: H, backgroundColor: 'yellow'}}
        />
        <View style={{
          width: W, height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5FCFF'}}>
          <Text>{this.state.loadingMsg}</Text>
        </View>
      </Animated.ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'red',
  },
});
