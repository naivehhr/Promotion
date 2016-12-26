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
  }

  componentWillUnmount() {
    console.log('卸载','dk');
  }

  _pressButton(key) {
    const { nav, route, dispatch, navigator} = this.props
    switch (key) {
      case 'PullView':
        dispatch(navTo(PagesConfig.PullView))
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
          <TouchableOpacity style={[styles.item,{marginTop: 0}]} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'PullView')}>
            <Text>PullView</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item,{marginTop: 10}]} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'Refresh')}>
            <Text>Refresh</Text>
          </TouchableOpacity>
          <View style={{marginTop:10, marginBottom: 10, flex: 1, width: W,height:2, backgroundColor: 'white'}}>
          </View>
          <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={this._pressButton.bind(this, 'Calendar')}>
            <Text>日历</Text>
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
