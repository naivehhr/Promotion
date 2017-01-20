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
    TouchableHighlight,
    Animated,
    StyleSheet
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
      modalVisible: false,
      bounceValue: new Animated.Value(0),
      opacity: new Animated.Value(1),
      pan: new Animated.ValueXY(),

    };
  }

  componentDidMount() {
    // this.state.bounceValue.setValue(1);

  }

  componentWillMount(){
    this._gestureHandlers = {
      //外部正方形在“捕获期”阻止顶层view成为响应者
      // onMoveShouldSetResponderCapture也会单独相应的
      onStartShouldSetResponder: () => {

        return true
      },
      onResponderRelease: () => {
        this._close()
      },
    }
  }


  _back() {
    console.log('back');
  }
  _pressButton = () => {
    console.log('打开');
    // Animated.spring(
    //   this.state.bounceValue,
    //   {
    //     toValue: 1,
    //     friction: 10,
    //     tension: 80
    //   }
    // ).start()
    // Animated.spring(
    //  this.state.pan,
    //  {
    //    toValue: {x: W - 20, y: 80},
    //    friction: 10,
    //    tension: 80
    //  }
    // ).start();

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200
      }),
      Animated.spring(
       this.state.pan,
       {
         toValue: {x: W - 20, y: 80},
         friction: 10,
         tension: 80
       }
      )
    ]).start()
    this.setState({modalVisible: !this.state.modalVisible});
  }
  setModalVisible() {
    console.log('主动关闭的');
    this._close()
  }

  _close() {
    // Animated.spring(
    //   this.state.bounceValue,
    //   {
    //     toValue: 0,
    //     friction: 10,
    //     tension: 80
    //   }
    // ).start()

    // Animated.spring(
    //   this.state.pan,
    //   {toValue: {x: 100, y: 50}}
    // ).start();

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 200
      }),
      Animated.spring(
        this.state.pan,
        {toValue: {x: 0, y: 0}}
      )
    ]).start()

    setTimeout(() => {
      this.setState({modalVisible: !this.state.modalVisible});
    }, 220)
  }

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
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={styles.container}
            {...this._gestureHandlers}
            >
           <View style={styles.container1}>
             <Animated.View style={[styles.children, {
                 width: this.state.pan.x,
                 height: this.state.pan.y,
               }]}>
               <TouchableHighlight onPress={() => {
                 this.setModalVisible()
               }}>
               <Text>关闭关闭关闭关闭关闭关闭关闭</Text>
               </TouchableHighlight>
             </Animated.View>
           </View>
          </View>
        </Modal>

      </View>
    );
  }
}

 // <View style={styles.triangle} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container1: {
    marginRight: -10,
    top: H /3,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: W,
    height: 100,
  },
  children: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  triangle: {
    position: 'absolute',
    top: 80,
    right: 15,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'yellow',
    transform: [
      {rotate: '180deg'}
    ]
  }
});

const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(ThreePage)
