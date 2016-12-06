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
  Easing
} from 'react-native';
const moment = require('moment');
const o = Dimensions.get("window")
const W = o.width
const H = o.height
const weekList = ['日','一','二','三','四','五','六']
const weekListNum = [0, 1, 2, 3, 4, 5, 6]
class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      toDay: '',
      week: 1, //星期几
      dataList: []
    }
  }
  componentDidMount() {
    // 当前 月 的天数
    // 当前月的第一天是周几
    // 当前 日期 && 是星期几
    let now = moment().format('YYYY-MM-DD'); //当前日期
    let week = moment().format('d') //当前是周几
    let days = moment().daysInMonth() //当前月天数
    let day = moment().format('D') //当前月当天的日期
    let firstDayWeek = moment().subtract(6, 'days').format('d') // 当月第一天是星期几
    console.log('今天星期==',firstDayWeek);

    //这里要调用几次renderRow
    if(firstDayWeek == 0){
      //正好一号是星期日，从头画
    } else {
      // let t = 7 - firstDayWeek
      // let tList = weekListNum.slice(t)
      // console.log(tList);
    }

    //重新计算剩下的值

    this.setState({dataList: this.calculate()})

    // this.setState({
    //   toDay: now,
    //   week: moment().format('d'), // 星期几
    // })
  }

  calculate(firstDayWeek = 3, totalDays = 10){
    let currentDay = 1 //一号
    let resultList = []
    for(let i = 0; i < firstDayWeek; i++) {
      let map = new Map()
      map.set(-1, -1)
      resultList.push(map)
    }
    while (currentDay <= totalDays) {
      let tList = weekListNum.slice(firstDayWeek, 7)
      tList.map((item, index) => {
        let map = new Map()
        if(currentDay > totalDays) {
          map.set((-item).toString(), currentDay)
        } else {
          map.set(item, currentDay)
        }
        currentDay++
        resultList.push(map)
      })
      firstDayWeek = 0
    }
    // console.log('resultList=',resultList.length);
    return resultList
  }

  renderRow() {
    let map = new Map()
    map.set('-3',-1)
    map.set('-1',-1)
    map.set('-32',-1)
    map.set(3,1)
    map.set(4,2)
    map.set(5,3)
    map.set(6,4)

    let dataList = []
    dataList.push(map)
    let _lenght = dataList.length
    let tempView = []
    for(let i = 0; i < _lenght; i++){
      let _view = []
      dataList[0].forEach((item, index) => {
        let key = 'row' + index.toString()
        if(parseInt(index) < 0) {
         t = (
           <View  key={key} style={{flex: 1, alignItems: 'center'}}>
              <Item isNull={true}/>
           </View>
         )
       } else {
         t = (
           <View  key={key} style={{flex: 1, alignItems: 'center'}}>
             <Item date={item}/>
           </View>
         )
       }
       _view.push(t)
      })
      let c = _view.map((item, index)=> {
        return (
          <View style={{flex: 1}}>
            {item}
          </View>
        )
      })
      tempView.push(c)
    }
    console.log(tempView);
    // return tempView.map((item, index)=>{
    //   // console.log(item);
    // })
    return tempView
  }

  render() {
    const {
      toDay,
      dataList
    } = this.state
    // console.log('dataList==',dataList);

    let weekView = weekList.map((item, index) => {
      let key = 'week' + index.toString()
      return (
        <View key={key} style={{flex: 1, alignItems: 'center'}}>
          <Text>{item}</Text>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <View style={{
              height: 40,
              backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text>上一月</Text>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text>{toDay}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text>下一月</Text>
          </View>
        </View>
        <View>
          <View style={{
                width: W,
                height: 30,
                backgroundColor: 'yellow',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
            {weekView}
          </View>
          <View style={{
            width: W,
            height: 200,
            backgroundColor: '#E066FF'
          }}>
            <View style={{
                  width: W,
                  height: 40,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
              {this.renderRow()}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

// class Header extends Component {
//   constructor() {
//     super()
//   }
//   render() {
//     return(
//       <View style={{
//             height: 40,
//             backgroundColor: 'red',
//             flexDirection: 'row',
//             alignItems: 'center'
//           }}
//         >
//         <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 10}}>
//           <Text>上一月</Text>
//         </View>
//         <View style={{flex: 3, alignItems: 'center'}}>
//           <Text>当前日期</Text>
//         </View>
//         <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
//           <Text>下一月</Text>
//         </View>
//       </View>
//     )
//   }
// }

// class Container extends Component {
//   constructor() {
//     super()
//   }
//   render() {
//
//     let weekView = weekList.map((item, index) => {
//       return (
//         <View style={{flex: 1, alignItems: 'center'}}>
//           <Text>{item}</Text>
//         </View>
//       )
//     })
//
//     let rowView = [1,2,3,4,5,6,7].map((item, index) => {
//       return (
//         <View style={{flex: 1, alignItems: 'center'}}>
//           <Item />
//         </View>
//       )
//     })
//     return (
//       <View>
//         <View style={{
//               width: W,
//               height: 30,
//               backgroundColor: 'yellow',
//               flexDirection: 'row',
//               alignItems: 'center'
//             }}
//           >
//           {weekView}
//         </View>
//         <View style={{
//           width: W,
//           height: 200,
//           backgroundColor: '#E066FF'
//         }}>
//           <View style={{
//                 width: W,
//                 height: 40,
//                 backgroundColor: 'white',
//                 flexDirection: 'row',
//                 alignItems: 'center'
//               }}>
//             {rowView}
//           </View>
//         </View>
//       </View>
//     )
//   }
// }


class Item extends Component {
  constructor() {
    super()
  }
  render() {
    const {isNull, date} = this.props
    // if(isNull) {
    //   return (
    //     <View style={{
    //       borderRadius:10,
    //       height:20,width:20,
    //       margin:1}}
    //     >
    //     </View>
    //   )
    // }
    return (
      <View style={{
        borderRadius: 15,
        height: 30,
        width: 30,
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
      <Text>{date}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:W,
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


// Calendar.Header = Header
module.exports = Calendar
