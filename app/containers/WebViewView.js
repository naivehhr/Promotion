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
  WebView,
  NativeModules
} from 'react-native';
// const MyToast = NativeModules.ToastForAndroid
// const MyLog = NativeModules.MyLog
import MyLog from 'aran_mylog'
// import MyToast from 'my-rn-library'
// const MyToast = require('my-rn-library')
class WebViewView extends Component {
  constructor() {
    super()
    this.state = {
      url: 'http://www.qq.com'
    }
  }
componentDidMount () {
    if(Platform.OS == 'android') {
      console.log('-----start android-----');
      // MyToast.show('点击了！', MyToast.SHORT)
    } else if(Platform.OS == 'ios') {
      console.log('-----start ios-----');
      // MyLog.myLog('123')
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
        source={{
          uri: this.state.url,
        }}
        injectedJavaScript={'document.cookie = "cookies=123abc"'}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        startInLoadingState={true}
        onMessage={(e)=> {console.log(e.d)}}
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
