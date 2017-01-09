'use strict';

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

var ReactART = require('ReactNativeART');
// https://segmentfault.com/a/1190000004422456?utm_source=tuicool&utm_medium=referral
var {
  Surface,
  Shape,
  Path,
} = ReactART;

var MetricsPath = require('art/metrics/path');

var SVG_PATH = 'M30,30L200,200L202,200L150,200L300,500L305,550';

var pathMetrics = new MetricsPath(SVG_PATH);

var boxPath = new Path()
  .moveTo(-5, -5)
  .line(10, 0)
  .line(0, 10)
  .line(-10, 0)
  .close();

class SvgTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    }
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    requestAnimationFrame(() => {
      this.setState({value: this.state.value + 15});
      // This is some random number that I guessed to be the length of the Shape
      if (this.state.value <= pathMetrics.length) {
        requestAnimationFrame(this._animateEntrance.bind(this));
      }
    });
  }

  render() {
    // http://daguang.me/2016/08/17/react-native-art-%E7%BB%98%E5%9B%BE%E5%85%A5%E9%97%A8/
    var point = pathMetrics.point(this.state.value);
    const path = new Path()
            .moveTo(100,100)
            .lineTo(1,100)
            .lineTo(20,0)
            .lineTo(100,0)
            .close();
    // return (
    //   <Surface width={320} height={600}>
    //     <Shape d={SVG_PATH}
    //            stroke="black" strokeDash={[this.state.value,700]}
    //            strokeWidth={2} />
    //
    //   </Surface>
    // );
    return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Surface width={100} height={100}>
                  <Shape d={path} stroke="#000000" fill="#892265" strokeWidth={1} />
              </Surface>
            </View>
        )
  }
}


module.exports = SvgTest;
