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

  _pressButton() {
    const { nav, route, dispatch } = this.props
    dispatch(navTo(PagesConfig.Dr))
    // dispatch(hide())
    // nav.navigator.push({
    //   name: 'Dr',
    //   component: Dr,
    // })
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this._pressButton.bind(this)} >
              <Text>DK 点我跳转</Text>
          </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    tabbar : state.tabbar,
    nav: state.nav
  }
}
module.exports = connect(mapStateToProps)(Dk)
