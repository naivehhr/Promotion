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
  _back() {
    console.log('back');
  }
  _pressButton = () => {
    // this.setState({modalVisible: !this.state.modalVisible});
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{zIndex: 1, height: 50,  backgroundColor: 'green'}} >
          <TouchableOpacity
            onPress={this._pressButton}
            style={{marginTop: 15, flex: 1, alignItems:'flex-end', justifyContent: 'center',}}>
            <Image style={{width: 20, height: 10}} source={require('./img/menu.png')}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, backgroundColor: 'yellow'}}>
          <Text>测试弹出菜单栏</Text>
        </ScrollView>
        <Modal
          animationType={"none"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <View style={{flex:1}}>
           <View style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}}>
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
