import React, { Component } from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
const o = Dimensions.get("window")
const W = o.width
const H = o.height
import { connect } from 'react-redux'
import {show, hide} from '../actions/tabbarActions'

import PageOne from './PageOne'
import SecondPageComponent from './SecondPageComponent';

export default class FirstPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.props.route.title = '首页'

    }


    _pressButton() {
      const { navigator, dispatch } = this.props;
      //为什么这里可以取得 props.navigator?请看上文:
      //<Component {...route.params} navigator={navigator} />
      //这里传递了navigator作为props
      if(navigator) {
        // dispatch(hide())
        navigator.push({
            name: 'SecondPageComponent',
            component: SecondPageComponent,
        })
        // setTimeout(() => {
        //   navigator.push({
        //       name: 'SecondPageComponent',
        //       component: SecondPageComponent,
        //   })
        // },200)
        // navigator.push({
        //     name: 'SecondPageComponent',
        //     component: SecondPageComponent,
        //     title: '测试',
        //     rightButtonTitle: '下一步',
        //     rightButtonOnClick: () => {
        //       console.log('123');
        //     }
        // })

      }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this._pressButton.bind(this)} >
                    <Text>点我跳转</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(FirstPageComponent)
