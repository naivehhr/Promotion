import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ListView,
  PanResponder,
  Animated,
  Easing,
  Platform,
} from 'react-native';
const StaticContainer = require('StaticContainer.react');
const o = Dimensions.get("window")
const W = o.width
const H = o.height
class ListViewTest extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
     dataSource: ds.cloneWithRows(['row 1']),
     isRefreshing: false
    };
    this.Animated = new Animated.ValueXY()
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
  }

  onStart(e, g) {
    // this.headerHeight.setValue(this.startPosotion)
    console.log('start');
    this._listView.setNativeProps({
      bounces:false
    })
  }
  onMove(e, g) {

  }
  onEnd(e, g) {
    console.log('end');
    this._listView.setNativeProps({
      bounces:true
    })
  }

  _renderHeader() {
    return(
      <View style={{width: W, backgroundColor: 'red', height: 60}}>
        <Text>header</Text>
      </View>
    )
  }
  _renderFooter() {
    return(
      <View style={{width: W, backgroundColor: 'red'}}>
        <Text>footer</Text>
      </View>
    )
  }

  // this.refs._scrollView.setNativeProps({
  //   scrollEnabled: true
  // })
// scrollTo({x: 0, y: 0, animated: true})
  _onLayout(event) {
    console.log(event.nativeEvent.layout);
  }

  _onScroll(event) {
    // console.log(event.nativeEvent);
    // let _contentOffset = event.nativeEvent.contentOffset
    // if(Math.abs(_contentOffset.y) > 60) {
    //   console.log('刷新');
    //   // if(!this.state.isRefreshing) {
    //   //   // this._listView.scrollTo({x:0, y: -10})
    //   //   this.setState({isRefreshing: true})
    //   //   setTimeout(() => {
    //   //     this._listView.scrollTo({x:0, y: -10})
    //   //     this.setState({isRefreshing: false})
    //   //   },1000)
    //   // }
    // } else {
    //   console.log('自动回弹');
    // }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          {...this._panResponder.panHandlers}
          ref={ref => {this._listView = ref}}
          style={{marginTop: -60}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
          renderHeader={this._renderHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onLayout={this._onLayout.bind(this)}
          onScroll={this._onScroll.bind(this)}
        />
      </View>
    );
  }
}

module.exports = ListViewTest
