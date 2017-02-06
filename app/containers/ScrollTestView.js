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

export default class ScrollTestView extends Component {

  constructor(){
    super()
    this.state = {
      marTop: new Animated.Value(0),
      data: ['lalalallal', '今天天气好晴朗啊', '你再嘚瑟一个我看看', '牵手和分手的维和不懂挽留'],
      _data: []
    }
  }

  componentWillMount() {
    const { data } = this.state
    let _data = data.slice(0, data.length).concat(data[0])
    this.setState({_data: _data})
  }

  componentDidMount() {
    const { marTop, _data } = this.state
    let l = _data.length
    let key = 1
    this.interval = setInterval(() => {
      // this.state.marTop.setValue(-40)
      Animated.timing(
        marTop,
        {
         toValue: -40 * key,
         duration: 500,
         easing: Easing.linear
       }).start(()=> {
         ++key
         if(key >= l){
           this.state.marTop.setValue(0),
           key = 1
         }
       })
    }, 1000)
  }

  renderScrollView = () => {
    const { _data } = this.state
    if(!_data) return
    return _data.map((item, index) => {
      return(
        <View
          key={'notice_' + index}
          style={{
            width: 200,
            height: 40,
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{item}</Text>
        </View>
      )
    })
  }

  render() {
    const { marTop } = this.state
    return (
      <View style={styles.container}>
        <View overflow={'hidden'} style={{height: 40,width: 200,
          backgroundColor: 'transparent',}}>
          <Animated.View style={{
            marginTop: marTop,
          }}>
          { this.renderScrollView() }
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
