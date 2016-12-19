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
import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import NavTest from './NavTest'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      _marBot: 0
    }
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({_marBot: -50})
    // },2000)
    // console.log(this.props);
  }

  render() {
    const { navigator, route } = this.props
   return (
     <ScrollableTabView
      tabBarPosition={'bottom'}
      locked={false}
      scrollWithoutAnimation={false}
      onChangeTab={(i) => console.log('onChangeTabonChangeTab', i)}
      renderTabBar={() => <DefaultTabBar style={{marginBottom : this.state._marBot}}/>}
      prerenderingSiblingsNumber={1}
     >
       <FirstPageComponent ref='FirstPageComponent' tabLabel="FirstPageComponent" {...this.props}/>
       <SecondPageComponent ref='SecondPageComponent' tabLabel="SecondPageComponent"  {...this.props}/>
     </ScrollableTabView>
   );
 }
}

class MyTabBar extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // console.log(this.props);
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
