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
    Ellipse,
    Text
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

    // render() {
    //     return (
    //         <View style={{flex: 1, backgroundColor: 'white',alignItems: 'center', justifyContent: 'center'}}>
    //           <Svg
    //             height="150"
    //             width="300"
    //             >
    //             <Defs>
    //               <LinearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
    //                 <Stop offset="0" stopColor="red" stopOpacity="0" />
    //                 <Stop offset="1" stopColor="red" stopOpacity="1" />
    //               </LinearGradient>
    //             </Defs>
    //
    //             <Polygon
    //               points="100,100 100,0 30,0 0,100"
    //               fill="url(#grad)"
    //               stroke="purple"
    //               strokeWidth="1"
    //             />
    //         </Svg>
    //       </View>
    //     );
    // }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white',alignItems: 'center', justifyContent: 'center'}}>
              <Svg
                height="150"
                width="300"
                >
                <Circle cx="100" cy="8" r="4" strokeWidth="2" stroke="green" fill="pink"/>
                  <Text
                    fill="#600"
                    stroke="purple"
                    fontSize="12"
                    fontWeight="bold"
                    x="100"
                    y="8"
                    textAnchor="middle"
                >55.1</Text>
                <Polyline
                  points="0,10 40,20 60,1 90,30 100,10,"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                    <Stop offset="0" stopColor="red" stopOpacity="0" />
                    <Stop offset="1" stopColor="red" stopOpacity="1" />
                  </LinearGradient>
                </Defs>

                <Polygon
                  points="100,100 100,10 90,30 60,0 40,20 0,10 0,100"
                  fill="red"
                  strokeWidth="1"
                  opacity="0.8"
                />
            </Svg>
          </View>
        );
    }
}
