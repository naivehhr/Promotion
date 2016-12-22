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
class Dr extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('加载','Dr');
    // console.log(this.props);
  }

  componentWillUnmount() {
    console.log('卸载','Dr');
  }
  _pressButton() {
    const { nav, route, dispatch } = this.props
    // console.log(nav);
    nav.navigator.pop()
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1,backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this._pressButton.bind(this)} >
              <Text>Dr 点我跳回去</Text>
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
module.exports = connect(mapStateToProps)(Dr)
