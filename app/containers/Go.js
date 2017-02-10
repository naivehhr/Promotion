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
  Alert,
  StatusBar
} from 'react-native';

const o = Dimensions.get("window")
const W = o.width
const H = o.height

import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultTabBar from '../components/nav/DefaultTabBar'

import { connect } from 'react-redux'
import { nav_initial } from '../actions/navActions'
import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageOne from './PageOne'
import Test from './Test'
import Test1 from './Test1'
import Test2 from './Test2'

//这样就得写4个navigator了
export default class Go extends Component {
  constructor() {
    super()
    this.state = {
      _marBot: 0,
      _top: -20,
      showStatusBar: false
    }

    console.log('scale=', o.scale);
    // this.timer = setTimeout(() => {
    //   this.setState({_top: 0, showStatusBar: true})
    // },2000)
    // setTimeout(() => {
    //   this.setState({_top: -20, showStatusBar: false})
    // },4000)
  }
  componentDidMount() {
    // console.log(this.props);
    // const { navigator, route } = this.props
    // this.props.dispatch(nav_initial(navigator, route))
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    const deviceLocale = ReactNativeI18n.locale
    console.log('deviceLocale',deviceLocale);
  }

  render() {
    const { navigator, route } = this.props
    const { showStatusBar, _top } = this.state
    return (
     <View style={{flex: 1,}}>
       {
         Platform.OS === 'android'? null :
         <StatusBar
           barStyle="default"
           hidden={showStatusBar}
         />
       }
       <View style={{
           position: 'absolute',
           zIndex: 1,
           top: _top,
           width: W,
           height: 20,
           backgroundColor: 'red',
           alignItems: 'center',
           justifyContent: 'center'
         }}>
         <Text>网络状态</Text>
       </View>
       <ScrollableTabView
        tabBarPosition={'bottom'}
        locked={true}
        initialPage={0}
        page={this.state._marBot}
        scrollWithoutAnimation={false}
        renderTabBar={() => <DefaultTabBar />}
        prerenderingSiblingsNumber={1}
       >
         <Test ref='Test' tabLabel={I18n.t('greeting')} {...this.props}/>
         <Test1 ref='Test1' tabLabel="嘟嘟嘟"  {...this.props}/>
         <Test2 ref='Test2' tabLabel='天蓝蓝'  {...this.props}/>
       </ScrollableTabView>
     </View>
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

I18n.fallbacks = true

I18n.translations = {
  zh: {
    greeting: '啦啦啦'
  },
  en: {
    greeting: 'Hi!'
  },
  fr: {
    greeting: 'Bonjour!'
  }
}


const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(Go)
