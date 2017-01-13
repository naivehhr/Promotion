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

//<path d="M125,85 a60,60 0 1,0 -115,0" fill="#E79A16" /><!--Top Half-->
// <path d="M10,85 a60,60 0 0,0 115,0" fill="#D78500" /><!--Bottom Half-->
import LinearGradientA from 'react-native-linear-gradient';
export default class SvgExample extends Component {

  constructor() {
    super()
    this.state = {
      posY: new Animated.Value(0),
      axisX: 120,
      axisY: 100,
      axisX1: 105, //实际
      axisY1: 80, // 实际
      space: 15, //间距
      firstPoint: [],
      lastPoint: [],
      axisData: [
        {x: '1', y: '0.50'},
        {x: '2', y: '2.50'},
        {x: '3', y: '2.50'},
        {x: '4', y: '2.50'},
        {x: '5', y: '2.50'},
        {x: '6', y: '2.50'},
        {x: '7', y: '1.50'},
      ],
      lineData: '0,80 105,32',
      fillData: '105,80 0,80',
      axisXTextData: [],
      axisYTextData: [],
      circleData: {cx: 0, cy: 0},
    }
  }

  componentDidMount() {
    const { axisData, axisX1, axisY1, space } = this.state
    let fillStr = axisX1 + ',' + axisY1 + ' '
    let lineStr = '0,80 '
    let maxY = 0
    let lastPoint
    let cData
    axisData.map((item, i) => {
      if(item.y > maxY) {
        maxY = item.y
      }
    })
    lastPoint = axisData[axisData.length - 1]
    cData = {cx: axisX1, cy: (axisY1 - (axisY1 * (lastPoint.y/maxY)))}
    // console.log('maxYmaxY',maxY);
    // console.log('lastPoint',lastPoint);
    // console.log('cData',cData);
    for(let i = axisData.length - 1; i >= 0; i--){
      let item = axisData[i]
      let h = (axisY1 - (axisY1 * (item.y/maxY))) == 0 ? 1 : (axisY1 - (axisY1 * (item.y/maxY)))
      let str = item.x * space + ',' + h + ' '
      fillStr += str
    }
    fillStr += 0 + ',' + (axisY1 - (axisY1 * (axisData[0].y/maxY))) + ' '
    fillStr += 0 + ',' + axisY1
    // console.log('fillStr==', fillStr);
    lineStr += 0 + ',' + (axisY1 - (axisY1 * (axisData[0].y/maxY))) + ' '
    for(let i = 0; i < axisData.length; i ++){
      // console.log(axisData[i]);
      let item = axisData[i]
      let str = item.x * space + ',' + (axisY1 - (axisY1 * (item.y/maxY))) + ' '
      lineStr += str
    }
    // console.log('lineStr==', lineStr);
    this.setState({
      fillData: fillStr,
      lineData: lineStr,
      circleData: cData,
    })
  }

  makeData(){

  }


  // blink() {
  //     Animated.sequence([
  //         Animated.timing(
  //             this.state.posY,
  //             {toValue: 10, duration: 300}
  //         ),
  //
  //         Animated.delay(100),
  //
  //         Animated.timing(
  //             this.state.posY,
  //             {toValue: 0, duration: 300}
  //         ),
  //
  //     ]).start(() => {
  //         setTimeout(() => this.blink(), 250);
  //     });
  // }

    // renderEye() {
    //     return (
    //         <Svg
    //           height="200"
    //           width="300"
    //         >
    //         <Line
    //             x1="0"
    //             y1="100"
    //             x2="20"
    //             y2="0"
    //             stroke="red"
    //             strokeWidth="2"
    //         />
    //         </Svg>
    //     )
    //
    // }
    //
    // closedEye() {
    //     return (
    //         <Svg
    //             height="100"
    //             width="100"
    //
    //         >
    //             <Path
    //                 d="M85,45 a5.5,5 0 1,0 70,0"
    //                 fill={colors.brown}
    //                 stroke="none"
    //             />
    //         </Svg>
    //     )
    // }
    //
    // getStyle() {
    //     const {posY} = this.state;
    //     return {transform:
    //         [
    //             {
    //                 translateY: posY
    //             }
    //
    //         ],
    //         position: 'absolute', top: 0};
    // }

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





  renderCoordinate = () => {
    let _c = [
      {x: 15, y: 10},
      {x: 30, y: 20},
      {x: 45, y: 10},
      {x: 60, y: 0},
      {x: 75, y: 0},
      {x: 90, y: 0},
      {x: 105, y: 0},
    ].map((item, i) => {
      let x1 = item.x, x2 = item.x
      let y1 = item.y
      let y2 = 80
      return (
        <Line
          key={'l' + i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="1"
          opacity="0.2"
        />
      )
  })
  let _t = [
    {x: 15, y: 10},
    {x: 30, y: 20},
    {x: 45, y: 10},
    {x: 60, y: 0},
    {x: 75, y: 0},
    {x: 90, y: 0},
    {x: 105, y: 0},
  ].map((item, i) => {
    // 字体斜体
    return(
      <G
        key={'t' + i}
        >
      <Text
        fill="#600"
        stroke="purple"
        fontSize="8"
        x={item.x}
        y="82"
        textAnchor="middle"
        >
        12
      </Text>
    </G>
    )
  })
  const {
    axisX,
    axisY,
    firstPoint,
    lastPoint,
    axisData,
  } = this.state
    return (
      <Svg
        height={axisY}
        width={axisX}
        >
        <Line
          x1="0"
          y1="0"
          x2="0"
          y2={axisY - 20}
          stroke="black"
          strokeWidth="1"
        />
        <Line
          x1="0"
          y1={axisY - 20}
          x2={axisX - 10}
          y2={axisY - 20}
          stroke="black"
          strokeWidth="1"
        />
      {_c}
      {_t}
      </Svg>
    );
  }

  render() {
    const {
      axisX,
      axisY,
      firstPoint,
      lastPoint,
      axisData,
      lineData,
      fillData,
      circleData,
    } = this.state
    console.log(circleData);
    return (
      <View style={{flex: 1, backgroundColor: 'white',alignItems: 'center', justifyContent: 'center'}}>
        <Svg
          height={axisY}
          width={axisX}
          >

            <Polyline
              points={lineData}
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                <Stop offset="0" stopColor="red" stopOpacity="0" />
                <Stop offset="1" stopColor="red" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            <Polygon
              points={fillData}
              fill="#FFC125"
              strokeWidth="1"
              opacity="1"
            />
          {this.renderCoordinate()}
          <Circle cx={circleData.cx} cy={circleData.cy} r="2" strokeWidth="1" stroke="green" fill="white"/>
          <Text
            fill="#600"
            stroke="purple"
            fontSize="8"
            x="106"
            y="40"
            textAnchor="middle"
            >
            55.1
          </Text>
          <View style={{
            position: 'absolute',
            top: circleData.cy - 10,
            left: circleData.cx - 5}}>
            <Image
              style={{width: 20, height: 15}}
              source={require('./img/message_1.png')}
              />
          </View>
        </Svg>
      </View>
    );
  }
}
