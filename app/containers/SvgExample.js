import React, {Component} from 'react';
import {
    Animated,
    View,
    StyleSheet
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
    Ellipse
} from 'react-native-svg';

//<path d="M125,85 a60,60 0 1,0 -115,0" fill="#E79A16" /><!--Top Half-->
// <path d="M10,85 a60,60 0 0,0 115,0" fill="#D78500" /><!--Bottom Half-->
import LinearGradientA from 'react-native-linear-gradient';
export default class SvgExample extends Component {
    state = {
        posY: new Animated.Value(0)
    };


    componentDidMount() {
        // this.blink();
    }

    blink() {
        Animated.sequence([
            Animated.timing(
                this.state.posY,
                {toValue: 10, duration: 300}
            ),

            Animated.delay(100),

            Animated.timing(
                this.state.posY,
                {toValue: 0, duration: 300}
            ),

        ]).start(() => {
            setTimeout(() => this.blink(), 250);
        });

    }

    renderEye() {
        return (
            <Svg
              height="200"
              width="300"
            >
            <Line
                x1="0"
                y1="100"
                x2="20"
                y2="0"
                stroke="red"
                strokeWidth="2"
            />
            </Svg>
        )

    }

    closedEye() {
        return (
            <Svg
                height="100"
                width="100"

            >
                <Path
                    d="M85,45 a5.5,5 0 1,0 70,0"
                    fill={colors.brown}
                    stroke="none"
                />
            </Svg>
        )
    }

    getStyle() {
        const {posY} = this.state;
        return {transform:
            [
                {
                    translateY: posY
                }

            ],
            position: 'absolute', top: 0};
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white',alignItems: 'center', justifyContent: 'center'}}>
              <View style={{zIndex: 1, width: 300,height: 100, backgroundColor: 'white'}}>
                <Svg
                  height="150"
                  width="300"
                  >
                  <Polyline
                    points="200,0 30,0 0,100 200,100"
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                </Svg>
              </View>
              <LinearGradientA
                colors={['rgba(255,255,255,0.5)', '#FFE4C4']} style={{
                  position: 'absolute',
                  top: 280,
                  left: 38,
                  width: 200,
                  height: 104,
                  opacity: 0.9,
                  zIndex: 2,
                }} />
            </View>
        );
    }
}
