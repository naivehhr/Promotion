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
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultTabBar from './DefaultTabBar'

import Dr from './Dr'
import Dk from './Dk'

class Home extends Component {
  constructor() {
    super()
  }

  render() {
   return (
     <ScrollableTabView
      tabBarPosition={'bottom'}
      locked={false}
      scrollWithoutAnimation={false}
      onChangeTab={(i) => console.log('onChangeTabonChangeTab', i)}
      renderTabBar={() => <DefaultTabBar />}
      prerenderingSiblingsNumber={1}
     >
       <Dr ref='Dr' tabLabel="Dr" />
       <Dk ref='Dk' tabLabel="Dk" />
     </ScrollableTabView>
   );
 }
}

class MyTabBar extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log(this.props);
  }

  render(){
    return(
      <View style={{flexDirection: 'row', height: 50, backgroundColor: 'red'}}>
        <View style={{flex: 1,backgroundColor: 'blue'}} />
        <View style={{flex: 1,backgroundColor: 'red'}} />
        <View style={{flex: 1,backgroundColor: 'yellow'}} />
        <View style={{flex: 1,backgroundColor: 'violet'}} />
      </View>
    )
  }
}
module.exports = Home
