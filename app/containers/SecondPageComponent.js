import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text
} from 'react-native';
import { connect } from 'react-redux'
import FirstPageComponent from './FirstPageComponent';
import { navTo, navBack } from '../actions/logicActions'
import { PagesConfig } from '../config/PagesConfig'

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.props.route.title = '交流圈';
        // this.props.route.rightButtonTitle = 'alert'
        // this.props.route.rightButtonOnClick = this._pressButton.bind(this)
        //https://github.com/zhou333chen/NavigationVC
        this.props.route.rightButton = {text: 'btn', onClick: this._back.bind(this)};

        // this.props.route.leftBtn = {
        //   text: '回去',
        //   onClick: this._back.bind(this)
        // }
    }
    _back() {
      console.log('back');
    }
    _pressButton() {
        const { navigator, dispatch } = this.props;
        if(navigator) {
            // navigator.pop();
        }
        dispatch(navBack())
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <View style={{height: 50,  backgroundColor: 'green'}} />

          <View style={{flex: 1, backgroundColor: 'yellow',alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this._pressButton.bind(this)}>
                  <Text>SecondPageComponent 点我跳回去</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
}
const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(SecondPageComponent)
