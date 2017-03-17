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
import RNFetchBlob from 'react-native-fetch-blob'
import PDFView from 'react-native-pdf-view';
class WebViewView extends Component {
  constructor() {
    super()
    this.state = {
      pdfSrc: ''
    }
  }

  componentDidMount () {
    RNFetchBlob
    .config({
      fileCache : true,
      // appendExt : 'png'
      // by adding this option, the temp files will have a file extension
    })
    //http://fupingzhou.firstp2plocal.com:8104/api/file/show?path=g1/M00/7A/87/ChRFCVjI-W-APm_hAAHqoyXcxoY2103312
    .fetch('GET', 'http://10.12.116.40:3000/', {
    // more headers  ..
        })
        // when response status code is 200
      .then((res) => {
        console.log('res', res);
         console.log('The file saved to ', res.path())
         this.setState({
           pdfSrc: res.path()
         })
        // the conversion is done in native code
        // let base64Str = res.base64()
        // the following conversions are done in js, it's SYNC

      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
      })
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

///data/data/com.mycalendar/files/RNFetchBlobTmp_c26aa3a0-43a6-44a1-8c72-4e1c3ea6e0d1.pdf
  render() {
    
    let { pdfSrc }  = this.state
    console.log('pdfSrc', pdfSrc);
    let a = "'" + pdfSrc + "'"
    console.log('a=====', a);
    if(pdfSrc) {
      return(
        <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                      path={pdfSrc}
                      style={{flex: 1}}/>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'red'}}><Text>{pdfSrc}</Text></View>
      )
    }
  }
}

module.exports = WebViewView
