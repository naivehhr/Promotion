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
import { connect } from 'react-redux'
import { show, hide } from '../actions/tabbarActions'
import Dr from './Dr'
import { nav_initial } from '../actions/navActions'
import { navTo } from '../actions/logicActions'
import { PagesConfig } from '../config/PagesConfig'
const o = Dimensions.get("window")
const W = o.width
const H = o.height
class Dk extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('加载','dk');
    const { navigator, route } = this.props
    this.props.dispatch(nav_initial(navigator, route))
    this.currentRoute = navigator.navigationContext.currentRoute;
    // console.log(this.currentRoute);
    this.bindEvents();
  }

  componentWillUnmount() {
    console.log('卸载','dk');
    this.unBindEvents();
  }

  bindEvents = () =>{
    this.willFocusSubscription  = this.props.navigator.navigationContext.addListener('willfocus', (event) => {
      if (this.currentRoute !== event.data.route) {
        console.log('离开Dk');
        this.props.dispatch(hide())
      }
    });
    this.didFocusSubscription  = this.props.navigator.navigationContext.addListener('didfocus', (event) => {
      if (this.currentRoute === event.data.route) {
        console.log('回到Dk');
        // this.props.dispatch(show())
      }
    });
  }

  unBindEvents = ()=>{
    this.willFocusSubscription.remove();
    this.didFocusSubscription.remove();
  }

  _pressButton(key) {
    const { nav, route, dispatch, navigator} = this.props
    switch (key) {
      case 'ScrollTestView':
        dispatch(navTo(PagesConfig.ScrollTestView))
        break;
      case 'Curve':
        dispatch(navTo(PagesConfig.SvgExample))
        break;
      case 'AnimationNumber':
        dispatch(navTo(PagesConfig.AnimationNumber))
        break;
      case 'PullToRefreshViewStickyHeaderAndroidPullToRefresh':
        dispatch(navTo(PagesConfig.PullToRefreshViewStickyHeaderAndroidPullToRefresh))
        break;
      case 'PullToRefreshViewPullToRefreshScrollView':
        dispatch(navTo(PagesConfig.PullToRefreshViewPullToRefreshScrollView))
        break;
      case 'Refresh':
        dispatch(navTo(PagesConfig.Refresh))
        break;
      case 'ScrollViewAnimationTest':
        dispatch(navTo(PagesConfig.ScrollViewAnimationTest))
        break;
      case 'PasswordGestureTest':
        dispatch(navTo(PagesConfig.PasswordGestureTest))
        break;
      case 'Pageview':
        dispatch(navTo(PagesConfig.Pageview))
        break;
      case 'LoadingView':
        dispatch(navTo(PagesConfig.LoadingView))
        break;
      case 'MenuScreen':
        dispatch(navTo(PagesConfig.MenuScreen))
        break;
      case 'EasingTest':
        dispatch(navTo(PagesConfig.EasingTest))
        break;
      case 'Calendar':
        dispatch(navTo(PagesConfig.Calendar))
        break;
      case 'LineTest':
        dispatch(navTo(PagesConfig.LineTest))
        break;
      default:

    }
  }
  render() {
    return (
      <ScrollView style={{flex: 1,width: W,  marginTop: 64, marginBottom: 50}}>
        <View style={{paddingVertical: 20,backgroundColor: '#FFDAB9',}}>
          <TouchableOpacity style={[styles.item,{marginTop: 0}]} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'PullToRefreshViewStickyHeaderAndroidPullToRefresh')}>
            <Text>StickyHeaderPullToRefresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item,{marginTop: 10}]} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'PullToRefreshViewPullToRefreshScrollView')}>
            <Text>PullToRefreshScrollView</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'Calendar')}>
            <Text>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'AnimationNumber')}>
            <Text>AnimationNumber</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'ScrollTestView')}>
            <Text>ScrollTextView</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'Curve')}>
            <Text>Curve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'PasswordGestureTest')}>
            <Text>PasswordGestureTest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'EasingTest')}>
            <Text>Easing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'MenuScreen')}>
            <Text>MenuScreen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'ScrollViewAnimationTest')}>
            <Text>ScrollViewAnimationTest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'Pageview')}>
            <Text>Pageview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'LoadingView')}>
            <Text>LoadingView</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'LineTest')}>
            <Text>可移动的线</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  item: {
    marginTop: 10,
    width: W,height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});
const mapStateToProps = state => {
  // console.log(state);
  return {
    tabbar : state.tabbar,
    nav: state.nav
  }
}
module.exports = connect(mapStateToProps)(Dk)
