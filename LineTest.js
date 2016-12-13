import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  PanResponder,
} from 'react-native';

import Line from './source/line'
import * as helper from './source/helper'
const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height
const Top = (Height - Width)/2.0 * 1.5
const Radius = Width / 10

const points = [{x: 0, y: 100},{x: 10, y: 0}]
class LineTest extends Component {

  constructor(){
    super()
    this.state = {
      // lines: []
    }
    this.isMoving = false;
  }

  componentWillMount() {
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



    componentDidMount() {
      // let x = points[0].x
      // let y = points[0].y
      // setInterval(()=> {
      //   this.refs.line.setNativeProps({end: {x, y}});
      //   x++
      //   y++
      // })

      let lines = this.markLines()
      lines.forEach((item) => {
        this.markDraw(item.start, item.end)
      })
    }

    markLines() {
      let _lines= []
      for(let i = 0; i < points.length - 1; i ++){
        _lines.push({start: points[i], end: points[i + 1]})
      }
      console.log(_lines);
      return _lines
    }
    markDraw(start, end) {
      // let start = points[i]
      // let end = points[i + 1]
      let s_x = start.x
      let s_y = start.y
      let e_x= end.x
      let e_y = end.y
      let scaleY = Math.abs(e_y - e_x) / 10
      this.refs.line.setNativeProps({start: {x: s_x, y: s_y}});
      this._interval = setInterval(()=> {
        if(s_x > e_x) {
          clearInterval(this._interval)

        }
        this.refs.line.setNativeProps({end: {x: s_x, y: s_y}});
        s_x = s_x + 1
        s_y = s_y + scaleY
      })

    }

    componentWillUpdate() {
      console.log('update');
    }

    onStart(e, g) {
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY - Top;
        this.isMoving = true;

        // let lastChar = this.getTouchChar({x, y});
        // if ( lastChar ) {
        //     this.isMoving = true;
        //     this.lastIndex = Number(lastChar);
        //     this.sequence = lastChar;
        //     this.resetActive();
        //     this.setActive(this.lastIndex);
        //
        //     let point = {
        //         x: this.state.circles[this.lastIndex].x,
        //         y: this.state.circles[this.lastIndex].y
        //     };
        //
        //     this.refs.line.setNativeProps({start: point, end: point});
        //
        //     this.props.onStart && this.props.onStart();
        //
        //     if ( this.props.interval>0 ) {
        //         clearTimeout(this.timer);
        //     }
        // }
    }

    onMove(e, g) {
        let x = e.nativeEvent.pageX;
        let y = e.nativeEvent.pageY - Top;

        if ( this.isMoving ) {
            this.refs.line.setNativeProps({end: {x, y}});
            // let lastChar = null;
            //
            // if ( !helper.isPointInCircle({x, y}, this.state.circles[this.lastIndex], Radius) ) {
            //     lastChar = this.getTouchChar({x, y});
            // }
            //
            // if ( lastChar && this.sequence.indexOf(lastChar) === -1 ) {
            //     if ( !this.props.allowCross ) {
            //         let crossChar = this.getCrossChar(lastChar);
            //
            //         if ( crossChar && this.sequence.indexOf(crossChar) === -1 ) {
            //             this.sequence += crossChar;
            //             this.setActive(Number(crossChar));
            //         }
            //     }
            //
            //     let lastIndex = this.lastIndex;
            //     let thisIndex = Number(lastChar);
            //
            //     this.state.lines.push({
            //         start: {
            //             x: this.state.circles[lastIndex].x,
            //             y: this.state.circles[lastIndex].y
            //         },
            //         end: {
            //             x: this.state.circles[thisIndex].x,
            //             y: this.state.circles[thisIndex].y
            //         }
            //     });
            //
            //     this.lastIndex = Number(lastChar);
            //     this.sequence += lastChar;
            //
            //     this.setActive(this.lastIndex);
            //
            //     let point = {
            //         x: this.state.circles[this.lastIndex].x,
            //         y: this.state.circles[this.lastIndex].y
            //     };
            //
            //     this.refs.line.setNativeProps({start: point});
            // }
        }

        // if ( this.sequence.length === 9 ) this.onEnd();
    }

    onEnd(e, g) {
        if ( this.isMoving ) {
            // let password = helper.getRealPassword(this.sequence);
            // this.sequence = '';
            // this.lastIndex = -1;
            this.isMoving = false;

            let origin = {x: 0, y: 0};
            this.refs.line.setNativeProps({start: origin, end: origin});

            this.props.onEnd && this.props.onEnd(password);

            // if ( this.props.interval>0 ) {
            //     this.timer = setTimeout(() => this.resetActive(), this.props.interval);
            // }
        }
    }

  render() {
    // React.createElement(View, {
    //   style: {left:100, top: 100, width:100,height: 100, backgroundColor: 'red',position: 'absolute' },
    // })
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Line ref='line' color={'red'}/>
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

module.exports = LineTest
