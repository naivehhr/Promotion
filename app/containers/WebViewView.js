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
  WebView
} from 'react-native';


class WebViewView extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  onError = () => {
    console.log('onError');
  }
  onLoad = () => {
    console.log('onLoad');
  }
  onError = () => {
    console.log('onError');
  }
  onLoadEnd = () => {
    console.log('onLoadEnd');
  }
  onLoadStart = () => {
    console.log('onLoadStart');
  }

  renderError = (error) => {
    console.log('renderError',error);
    return(
      <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
        <Text>加载页面错误</Text>
      </View>
    )
  }

  renderLoading = () => {
    
    return (
      <View style={{flex: 1, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center'}}>
        <Text>加载ing</Text>
      </View>
    )
  }

  render() {
    return (
      <WebView
        automaticallyAdjustContentInsets={true}
        style={{flex: 1,}}
        source={{uri: 'https://www.baidu.com'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        onError={this.onError}
        onLoad={this.onLoad}
        onLoadEnd={this.onLoadEnd}
        onLoadStart={this.onLoadStart}
        renderError={this.renderError}
        renderLoading={this.renderLoading}
      />
    );
  }
}

module.exports = WebViewView
