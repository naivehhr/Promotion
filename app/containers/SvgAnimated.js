import React, {Component} from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Image
} from 'react-native';

import colors from './colors';

import Svg, {
    Circle,
    Path,
    Line,
    Polyline,
    Polygon,
    Defs,
    LinearGradient,
    Stop,
    Ellipse,
    Text,
    G,
    Rect
} from 'react-native-svg';

export default class testing extends Component {

   constructor(props) {
      super(props)
      this._origin = { x: 100, y: 100 }
      this._radius = 50
      this.state = {
         arcEndX: Math.sin(0) * this._radius,
         arcEndY: Math.cos(0) * this._radius - this._radius,
         largeArcFlag: Math.sin(0) >= 0 ? 0 : 1
      }
      this.setArcEndFromRadians = this.setArcEndFromRadians.bind(this)
   }

   setArcEndFromRadians(radians) {
      this.setState({
         arcEndX: Math.sin(radians) * this._radius,
         arcEndY: Math.cos(radians) * this._radius - this._radius,
         largeArcFlag: Math.sin(radians) >= 0 ? 0 : 1
      })
   }

   componentDidMount() {
      let radians = 0
      let timer = setInterval(() => {
         radians += 0.02
         this.setArcEndFromRadians(radians)
      }, 16)
   }

   render() {
      return (
         <View>
            <Svg
               height="200"
               width="200">
               <Path
                  d={ `M ${this._origin.x},${this._origin.y} l 0,50 a 50,50 0 ${this.state.largeArcFlag} 0 ${this.state.arcEndX},${this.state.arcEndY} z` }/>
            </Svg>
         </View>
      )
   }

}
