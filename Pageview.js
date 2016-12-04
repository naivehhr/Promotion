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
  Platform
} from 'react-native';
const o = Dimensions.get("window")
const W = o.width
const H = o.height
class Pageview extends Component {
  constructor() {
    super()
    this.state = {
      bg: 'white',
      top: 0,
      left: 0
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
     onStartShouldSetPanResponder: () => true,
     onMoveShouldSetPanResponder: ()=> true,
     onPanResponderGrant: ()=>{
       this._left = this.state.left
     },
     // NOTE: 那这个Scrollview也可以的
     onPanResponderMove: (evt,gs)=>{
      //  console.log(gs.dx)
       this.setState({
         left: this._left + gs.dx
       })
     },
     onPanResponderRelease: (evt,gs)=>{
      //  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
       LayoutAnimation.easeInEaseOut();
       const dx = gs.dx
       console.log(dx);
       if(dx < -50) {
         console.log('应该到下一页了');
         this.setState({
           left: this._left - W
         })
         this._left = this.state.left
       } else if(dx > 50) {
         console.log('回到上一页');
         this.setState({
           left: this._left + W
         })
       } else {
         console.log('恢复原状');
         this.setState({
           left: this._left
         })
       }
     }
   })
  }

  componentDidMount() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render() {
    const {left} = this.state
    let _letf = left + W
    return (
      <View contentContainerStyle={styles.container}>
        <View style={{
          position: 'absolute',
          left: 0,
          top: (H - 100)/2,
          width: W * 3,
          height: 100,
          backgroundColor: 'yellow'
        }}
        {...this._panResponder.panHandlers}
        >
          <View
            style={{
              position: 'absolute',
              left: left,
              width: W,
              height: 100,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}

          >
            <Text>{'第一页'}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              left: _letf,
              width: W,
              height: 100,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{'第二页'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rect: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    position: 'absolute',
  }
});

module.exports = Pageview
