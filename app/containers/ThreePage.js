import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Modal,
    TouchableHighlight
} from 'react-native';

const o = Dimensions.get("window")
const W = o.width
const H = o.height
import { connect } from 'react-redux'
import FirstPageComponent from './FirstPageComponent';
import { navTo, navBack } from '../actions/logicActions'
import { PagesConfig } from '../config/PagesConfig'
import BasicExample from './BasicExample';


export default class ThreePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }



  componentWillMount(){
    this._gestureHandlers = {
      //外部正方形在“捕获期”阻止顶层view成为响应者
      // onMoveShouldSetResponderCapture也会单独相应的
      onStartShouldSetResponder: () => {

        return true
      },
      onResponderRelease: () => {
        this.setState({modalVisible: !this.state.modalVisible});
      },
    }
  }


  _back() {
    console.log('back');
  }
  _pressButton = () => {
    console.log('打开');
    this.setState({modalVisible: !this.state.modalVisible});
  }
  setModalVisible(visible) {
    console.log('主动关闭的');
    this.setState({modalVisible: visible});
  }

  // <View style={{
  //     zIndex: 2,
  //     position: 'absolute',
  //     bottom: 0,
  //     left: 0,
  //     width: W,
  //     height: H,
  //     backgroundColor: 'red',
  //   }}>
  // </View>

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 50,  backgroundColor: 'green'}} >
          <TouchableOpacity
            onPress={this._pressButton}
            style={{marginTop: 15, flex: 1, alignItems:'flex-end', justifyContent: 'center',}}>
            <Image  style={{width: 20, height: 10}} source={require('./img/menu.png')}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, backgroundColor: 'yellow'}}>
          <Text>测试弹出菜单栏</Text>
        </ScrollView>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}
            {...this._gestureHandlers}
            >
           <View style={{top: H /3,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', width: W, height: 100}}>
             <Text>Hello World!</Text>
             <TouchableHighlight onPress={() => {
               this.setModalVisible(!this.state.modalVisible)
             }}>
               <Text>Hide Modal</Text>
             </TouchableHighlight>
           </View>
          </View>
        </Modal>

      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(ThreePage)
