import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  PanResponder,
  Animated,
  Easing,
  Platform
} from 'react-native';

import List from 'react-native-listview-refresher';

export default class DemoClass extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <List
          ref='listView'
          renderRow={this.renderRow}
          onFetching={this.fetch}
          pullDownRefreshable={true}
          pullUpRefreshable={true}
        />
      </View>
    );
  }

  fetch = (page = 1, callback, options)=> {
    setTimeout(() => {
        callback(['1','2','3','4','5','6'],{allLoaded: false});
      }, 1000);
  }

  renderRow = (data,sectionID,rowID) => {
    return <Cell key={rowID} rowID={rowID}/>
  }
}

class Cell extends Component {
  render() {
    return(
      <View style={{height: 100, width: 300}}>
        <Text>index {this.props.rowID}</Text>
      </View>
    )
  }
}
