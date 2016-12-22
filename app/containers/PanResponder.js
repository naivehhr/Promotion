import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
// NOTE: REF http://blog.csdn.net/p106786860/article/details/51126728
export default class PanResponder extends Component {

  constructor(props){
    super(props)
    this.state = {
      bg: 'blue',
      bg2: 'yellow'
    }
  }

  componentWillMount(){
    this._gestureHandlers = {
      //外部正方形在“捕获期”阻止顶层view成为响应者
      // onMoveShouldSetResponderCapture也会单独相应的
      onStartShouldSetResponderCapture: () => false,
      onMoveShouldSetResponderCapture: ()=> false,
      onResponderGrant: ()=>{
        this.setState({bg: 'red'})
        console.log('底层组件显示')
      },
      onResponderMove: ()=>{console.log('1')},
      onResponderRelease: ()=>{this.setState({bg: 'white'})},
    }
    this._gestureHandlers2 = {
      //内部正方形在即时实现了on*ShouldSetResponder也无法成为响应者
      onStartShouldSetResponder: () => true,
      onMoveShouldSetResponder: ()=> true,
      onResponderGrant: ()=>{
        this.setState({bg2: 'green'})
        console.log('上层组件显示')
      },
      onResponderMove: ()=>{console.log('2')},
      onResponderRelease: ()=>{this.setState({bg2: 'white'})}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View {...this._gestureHandlers} style={[styles.rect2,{"backgroundColor": this.state.bg}]}>
          <View {...this._gestureHandlers2} style={[styles.rect,{"backgroundColor": this.state.bg2}]}>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rect: {
    width: 100,
    height: 100
  },
  rect2: {
    width: 200,
    height: 200
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
