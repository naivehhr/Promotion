import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  PanResponder
} from 'react-native';

const o = Dimensions.get("window")
const W = o.width
const H = o.height
class MyApp extends Component {
  constructor() {
    super()
    this.state = {
      index: 1,
      left: 0
    }
    this._handlePanResponderMove = this._handlePanResponderGrant.bind(this)
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this)
    this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this)
  }


  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return true
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
    });
  }
  _handlePanResponderGrant(evt, gestureState) {
    console.log('11111111');
  }
  _handlePanResponderMove(evt, gestureState) {
    console.log('22222222222');
  }
  _handlePanResponderEnd(evt, gestureState) {
    console.log('3333333333');
    console.log(gestureState.dx);
  }
  _onScroll(event) {
    console.log(event.nativeEvent);
    const scrollOffsetX = event.nativeEvent.contentOffset.x
    // if(scrollOffsetX > 0.1) {
    //   // this.setState({index: this.state.index + 1})
    //   console.log('bingo', this._scrollView);
    //   this._scrollView && this._scrollView.scrollTo({x: W})
    // } else {}
  }

  _childView() {
    const {index} = this.state
    let color = 'red'
    if(index % 2 == 0) {
      color = 'blue'
    }
    return(
      <ScrollView contentContainerStyle={[styles.contentContainer, {backgroundColor: color}]}
        horizontal={true}
        onScroll={this._onScroll.bind(this)}
        >
        <View>
          <Text>{this.state.index}</Text>
        </View>
      </ScrollView>
    )
  }
  render() {
    let _left = this.state.left
    return (
      <View
        contentContainerStyle={[styles.contentContainer]}

        >
        <View style={{
          position: 'absolute',
          left: 0,
          top: (H - 100)/2,
          width: 500,
          height: 100,
          backgroundColor: 'yellow'
        }}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              width: 200,
              height: 100,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            {...this._panResponder.panHandlers}
          >
            <Text>{this.state.index}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              left: 200,
              width: 200,
              height: 100,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{this.state.index}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
module.exports = MyApp;
