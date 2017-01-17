import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing
} from 'react-native';
import Svg, {
  Line,
  G,
  Text
} from 'react-native-svg';

class MovingHand extends Component {
  constructor(props){
    super(props)

    // const { remainder, duration } = props.timer

    this.state = {
      duration: 0,
      start: 0,
      wind: new Animated.Value(0),
    }
  }

  componentDidMount() {
    let timer = setInterval(() => {
       this.setState({
         duration: this.state.duration + 10,
         start: this.state.start + 2,
       })
    }, 1000)
    Animated.timing(
      this.state.wind,
      {
        toValue: 1,
        duration: this.state.start * 1000,
        easing: Easing.none,
      }
    ).start()
  }

  render() {
    const {
      width,
      height,
      radius,
      strokeWidth,
    } = this.props;
    const { start, duration } = this.state
    const motionStyle = {
      transform: [{
        rotate: this.state.wind.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }

    return (
      <Animated.View style={motionStyle}>
        <Svg width={100} height={299}>
          <Line
            x1={radius}
            y1={0.20 * radius}
            x2={radius}
            y2={radius}
            stroke='brown'
            strokeWidth={2 * strokeWidth}
            strokeLinecap='round'
          />
        </Svg>
      </Animated.View>
    )
  }
}

export default MovingHand;
