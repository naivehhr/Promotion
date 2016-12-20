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
import DefaultTabBar from '../components/nav/DefaultTabBar'


import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageOne from './PageOne'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      _marBot: 0
    }
  }
  componentDidMount() {
    setTimeout(() => {
      // this.setState({_marBot: 1})
    },2000)
    // console.log(this.props);
  }

  render() {
    const { navigator, route } = this.props
    return (
     <ScrollableTabView
      tabBarPosition={'bottom'}
      locked={false}
      initialPage={0}
      page={this.state._marBot}
      scrollWithoutAnimation={false}
      renderTabBar={() => <DefaultTabBar />}
      prerenderingSiblingsNumber={1}
     >
       <FirstPageComponent ref='FirstPageComponent' tabLabel="啦啦啦" {...this.props}/>
       <PageOne ref='PageOne' tabLabel="嘟嘟嘟"  {...this.props}/>
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
