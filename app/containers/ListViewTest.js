import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ListView,
  PanResponder,
  Animated,
  Easing,
  Platform,
} from 'react-native';
const StaticContainer = require('StaticContainer.react');
const o = Dimensions.get("window")
const W = o.width
const H = o.height
class ListViewTest extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
     dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }


  _renderHeader() {
    return(
      <View style={{width: W, backgroundColor: 'red', height: 60}}>
        <Text>header</Text>
      </View>
    )
  }
  _renderFooter() {
    return(
      <View style={{width: W, backgroundColor: 'red'}}>
        <Text>footer</Text>
      </View>
    )
  }

  // this.refs._scrollView.setNativeProps({
  //   scrollEnabled: true
  // })
// scrollTo({x: 0, y: 0, animated: true})
  _onLayout(event) {
    console.log(event.nativeEvent.layout);
  }

  _onScroll(event) {
    console.log(event.nativeEvent);
  }

  render() {
    return (
      <StaticContainer>
        <View style={{flex: 1}}>
          <ListView
            refs={'_c'}
            style={{marginTop: -60}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
            renderHeader={this._renderHeader.bind(this)}
            renderFooter={this._renderFooter.bind(this)}
            onLayout={this._onLayout.bind(this)}
            onScroll={this._onScroll.bind(this)}
          />
        </View>
      </StaticContainer>

    );
  }
}

module.exports = ListViewTest
