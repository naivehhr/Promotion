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
  Easing,
  Platform
} from 'react-native';

import {PullView} from '../components/pullable';
const o = Dimensions.get("window")
const W = o.width
const H = o.height
export default class PullNoFooter extends Component {
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
      onPanResponderMove: (event, gestureState) => {
          this.onMove(event, gestureState);
      },
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
    console.log(this.requestAnimationFrame);
  }

  onStart(e, g) {
    // this.headerHeight.setValue(this.startPosotion)

  }

  //http://www.alloyteam.com/2016/01/reactnative-animated/
  onMove(e, g) {
    // console.log('g.dy= ', g.dy);
    // this.refs._scrollView.setNativeProps({
    //   style:{marginTop: -60 + g.dy}
    // })

    if(Platform.OS === 'ios') {
      if(this.block) return
      let key = g.dy - this._dy
      this.startPosotion = this.startPosotion + key
      // console.log('startPosotion==',this.startPosotion);
      this._dy = g.dy
      if(this.startPosotion > this.staticHeight) {
        this.headerHeight.setValue(this.startPosotion);
        this.refs._scrollView.setNativeProps({
          bounces:false
        })
        if(this.startPosotion > 250) {
          this.setState({refreshMsg: 'refreshing....'})
        } else {
          this.setState({refreshMsg: 'pull to refresh'})
        }
      } else {
        this.refs._scrollView.setNativeProps({
          bounces:true
        })
        // if(this.startPosotion < -120) {
        //   this.setState({loadingMsg: 'loading....'})
        // } else {
        //   this.setState({loadingMsg: 'push to load more'})
        // }
      }
      console.log('??', this.headerHeight);
      return
    } else {

    }

  }

  onEnd(e, g) {
    // console.log('eeeeeg.dy',g.dy);
    // console.log(this.startPosotion);
    // this.refs._scrollView.setNativeProps({
    //   scrollEnabled:false
    // })
    if(Platform.OS === 'ios') {
      this._dy = 0
      let easing = Easing.in(Easing.quad)
      if(this.startPosotion > this.staticHeight){
        console.log('pull',this.startPosotion);
        if(this.startPosotion > 250) {
          this.isRefreshing = true
          this.block = true
          // this.headerHeight.setValue(170);
          this.setState({
            refreshMsg: 'refreshing....'
          }, () => {
            Animated.timing(
              this.headerHeight,
              {
                toValue: 170,
                duration: 300,
                easing
              }
            ).start(() => {
              setTimeout(() => {
                this.setState({refreshMsg: 'refresh complete'})
                Animated.timing(
                  this.headerHeight,
                  {
                    toValue: this.staticHeight,
                    duration: 300,
                    easing
                  }
                ).start(() => {
                  this.startPosotion = this.staticHeight
                  this.block = false
                  this.setState({refreshMsg: 'pull to refresh'})
                })
              }, 2000)
            })
          })
        } else {
          console.log('自动回退');
          setTimeout(() => {
            this.setState({refreshMsg: 'pull to refresh'})
            Animated.timing(
              this.headerHeight,
              {
                toValue: this.staticHeight,
                duration: 300,
                easing
              }
            ).start(() => {
              this.startPosotion = this.staticHeight
            })
          }, 1)
        }
      } else {
        console.log('push',this.headerHeight);
        if(this.startPosotion < -120) {
          console.log('加载');
          // this.isLoading = true
          // this.setState({
          //   loadingMsg: 'loading'
          // },() => {
          //   setTimeout(() => {
          //     this.setState({loadingMsg: 'push to load more'})
          //     Animated.timing(
          //       this.headerHeight,
          //       {
          //         toValue: this.staticHeight,
          //         duration: 500,
          //         easing
          //       }
          //     ).start(() => {
          //       this.startPosotion = this.staticHeight
          //       this.setState({refreshMsg: 'push to load more'})
          //     })
          //   }, 2000)
          // })
        } else {
          console.log('自动回退');
          // setTimeout(() => {
          //   console.log('bingo',this.headerHeight);
          //   this.setState({loadingMsg: 'push to load more'})
          //   Animated.timing(
          //     this.headerHeight,
          //     {
          //       toValue: this.staticHeight,
          //       duration: 500,
          //       easing
          //     }
          //   ).start(() => {
          //     this.startPosotion = this.staticHeight
          //   })
          // }, 1000)
        }
      }
    } else {

    }
  }




  render() {
    return (
      <View style={{flex: 1,}}>
        <Animated.ScrollView style={[styles.container,
          {
            marginTop: this.headerHeight.interpolate({
              inputRange: [-120,-80,-60,0,200],
              outputRange: [-80,-70,-60,-40,0]
           })
          }]}
          ref={'_scrollView'}
          bounces={false}
          {...this._panResponder.panHandlers}
          onLayout={ event => {
          } }
        >
          <View style={{
            width: W, height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFEC8B'}}>
            <Text>{this.state.refreshMsg}</Text>
          </View>
          <View ref={'_view'} style={{height: H, backgroundColor: 'yellow'}}
          />
        </Animated.ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'red',
  },
});
