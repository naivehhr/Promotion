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
const weekListNum = [0, 1, 2, 3, 4, 5, 6] // 星期日 到 星期一
class Calendar extends Component {
  constructor() {
    super()
    this.state = {
      toDay: '',
      week: 1, //星期几
      dateList: []
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
    console.log('今天星期==',days);

    // this.calculate()
    this.setState({dateList: this.calculate(firstDayWeek,days)})

    this.setState({
      toDay: now,
      week: moment().format('d'), // 星期几
    })
  }

  /**
   * 计算日期数组
   * @param  {[type]} firstDayWeek 本月第一天是星期几
   * @param  {[type]} totalDays    本月多少天
   * @return {[type]}              [description]
   */
  calculate(firstDayWeek = 3, totalDays = 30){
    let currentDay = 1 //一号
    let resultList = []
    let autokey = -100
    //前面追加空白
    for(let i = 0; i < firstDayWeek; i++) {
      let map = new Map()
      map.set(autokey, '填空')
      resultList.push(map)
      autokey -= 1
    }
    while (currentDay <= totalDays) {
      let tList = weekListNum.slice(firstDayWeek, 7)
      tList.map((item, index) => {
        let map = new Map()
        //后面追加空白
        if(currentDay > totalDays) {
          map.set(-item, '填空')
        } else {
          map.set(item, currentDay)
        }
        currentDay++
        resultList.push(map)
      })
      firstDayWeek = 0 //计算用，重置为星期日
    }
    let ccc = []
    for(let i=0,len=resultList.length;i<len;i+=7){
       ccc.push(resultList.slice(i,i+7));
    }
    return ccc
  }

  renderRow() {
    const {dateList} = this.state
    let dataList = dateList
    let _lenght = dataList.length
    if(_lenght <= 0) true
    let tempView = []
    for(let i = 0; i < _lenght; i++){
      let _view = []
      dataList[i].forEach((item, index) => {
        let key = 'row' + index.toString()
        item.forEach((v, k) => {
          if(parseInt(k) < 0) {
           t = (
             <View  key={key} style={{flex: 1,alignItems: 'center'}}>
                <Item isNull={true}/>
             </View>
           )
         } else {
           t = (
             <View  key={key} style={{flex: 1,alignItems: 'center'}}>
               <Item date={item}/>
             </View>
           )
         }
         _view.push(t)
        })
      })
      let c = (
            <View style={{flexDirection:'row', flex: 1,height: 40}}>
              {_view}
            </View>
          )
      tempView.push(c)
    }
    let p = tempView.length
    return (
      <View style={{
        width: W,
        height: 40 * p,
        backgroundColor: 'white',
      }}>
        {tempView}
      </View>
    )
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
          {this.renderRow()}
        </View>
      </View>
    )
  }
}

class Item extends Component {
  constructor() {
    super()
  }
  // TODO:
  // 添加点击回调 是否可以点击 点击的效果
  // 传入具体时间 YYYY-MM-DD 这个可以父组件传递过来
  //
  render() {
    const {isNull, date} = this.props
    return (
      <View style={{
        borderRadius: 20,
        height: 40,
        width: 40,
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
