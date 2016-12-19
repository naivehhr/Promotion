import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text
} from 'react-native';

import FirstPageComponent from './FirstPageComponent';

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        // this.props.route.title = '交流圈';
        // this.props.route.rightButtonTitle = 'alert'
        // this.props.route.rightButtonOnClick = this._pressButton.bind(this)
        //https://github.com/zhou333chen/NavigationVC
        //this.props.route.rightButton = {title: 'refresh',   clicked: this._refresh(),};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <View style={{height: 50,  backgroundColor: 'green'}} />

          <View style={{flex: 1, backgroundColor: 'yellow',alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity onPress={this._pressButton.bind(this)}>
                  <Text>点我跳回去</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }
}
