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
    var point = pathMetrics.point(this.state.value);
    return (
      <Surface width={320} height={600}>
        <Shape d={SVG_PATH}
               stroke="black" strokeDash={[this.state.value,700]}
               strokeWidth={2} />
        <Shape d={boxPath}
               x={point.x}
               y={point.y}
               stroke="blue" />
      </Surface>
    );
  }
}


module.exports = SvgTest;
