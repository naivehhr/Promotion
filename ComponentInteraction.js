import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  PanResponder
} from 'react-native';

// NOTE: 组件嵌套时，可以通过shouldComponentUpdate来控制子组件是否需要render
// 如果组件嵌套过多时，可控制
// 父组件传递一个doRender来触发子组件即可
// 默认情况下可以不管，遇到性能问题时再做处理
class ComponentInteraction extends Component {
  constructor(){
    super()
  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    return true
  }
  render(){
    console.log('子组件render');
    return (
      <View>
        <Text>我是子View</Text>
      </View>
    )
  }
}

module.exports = ComponentInteraction
