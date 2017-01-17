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
  Alert,
  Navigator,
  ListView
} from 'react-native';

export default class MyList extends Component {
  constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    data: ['row 1', 'row 2'],
    dataSource: ds.cloneWithRows(['row 1']),
  };
}
componentDidMount() {
  this.setState({
    dataSource: this.state.dataSource.cloneWithRows(this.state.data),
  })
  setTimeout(() => {
    let _data = this.state.data
    let c = _data.concat('row 3')
    console.log(c);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(c),
      // dataSource: this.state.dataSource.cloneWithRows(['row 1', 'row 2', 'row 3']),
    })
  },2000)
}

renderRow = (rowData, sectionID, rowID) => {
  console.log('rowID===', rowID);
  return(
    <Text>{rowData}</Text>
  )
}
render() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
    />
  );
}
}
