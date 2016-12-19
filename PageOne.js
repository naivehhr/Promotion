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
  Easing,
  TouchableOpacity,
  Alert
} from 'react-native';
import PageTwo from './PageTwo'
import SecondPageComponent from './SecondPageComponent';
export default class PageOne extends Component {
  _pressButton() {
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'SecondPageComponent',
            component: SecondPageComponent,
        })
    }
  }
 render() {
   return (
     <View style={{flex: 1,}}>
       <View style={{height: 50,  backgroundColor: 'green'}} />
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow'}}>
           <TouchableOpacity onPress={this._pressButton.bind(this)}>
              <Text>点我跳转</Text>
            </TouchableOpacity>
         </View>
     </View>

   );
 }
}
