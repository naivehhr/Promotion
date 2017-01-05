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
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultTabBar from '../components/nav/DefaultTabBar'
import SplashScreen from 'react-native-smart-splash-screen'
import { connect } from 'react-redux'
import { nav_initial } from '../actions/navActions'
import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageOne from './PageOne'
import Test from './Test'
import Test1 from './Test1'

//这样就得写4个navigator了
export default class Go extends Component {
  constructor() {
    super()
    this.state = {
      _marBot: 0
    }
  }
  componentDidMount() {
    SplashScreen.close(SplashScreen.animationType.scale, 850, 2000)
    setTimeout(() => {
      // this.setState({_marBot: 1})
    },2000)
    // console.log(this.props);
    // const { navigator, route } = this.props
    // this.props.dispatch(nav_initial(navigator, route))
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    const deviceLocale = ReactNativeI18n.locale
    console.log('deviceLocale',deviceLocale);
  }

  render() {
    const { navigator, route } = this.props
    return (
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
