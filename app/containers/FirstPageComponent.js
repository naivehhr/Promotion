import React, { Component } from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Modal,
    Animated,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
const o = Dimensions.get("window")
const W = o.width
const H = o.height
import { connect } from 'react-redux'
import { show, hide } from '../actions/tabbarActions'
import { navTo } from '../actions/logicActions'
import { PagesConfig } from '../config/PagesConfig'

import PageOne from './PageOne'
import SecondPageComponent from './SecondPageComponent';
import BasicExample from './BasicExample';

import Hamburger from 'react-native-hamburger';
export default class FirstPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          menuActive: false,
          modalVisible: false,
          bounceValue: new Animated.Value(1),
          opacity: new Animated.Value(1),
          pan: new Animated.ValueXY(),
        };
        this.props.route.title = '😋'

        //这样也能写的
        // this.props.route.rightElement = React.createElement(Text, [], ['Hello world'])

        // this.props.route.rightElement = () => {
        //   return (
        //     <View style={{flex: 1}}>
        //       <Text>asdfas</Text>
        //     </View>
        //   )
        // }

        this.props.route.rightElement = this.renderR.bind(this)
        // console.log('PagesConfig',PagesConfig);
    }

    componentDidMount() {
      // console.log(this.props);
      // const { navigator, route } = this.props
      // this.props.dispatch(nav_initial(navigator, route))
    }

    setModalVisible() {
      console.log('主动关闭的');
      this._close()
    }
    _pressButton = () => {
      console.log('打开');
      // Animated.timing(
      //   this.state.bounceValue,
      //   {
      //     toValue: 1,
      //     duration: 100
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


      // Animated.timing(
      //  this.state.pan,
      //  {
      //    toValue: {x: W - 20, y: 80},
      //    duration: 100
      //  }
      // ).start();

      // Animated.timing(this.state.opacity, {
      //   toValue: 1,
      //   duration: 200
      // }).start();
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
       ),
       Animated.timing(
         this.state.bounceValue,
         {
           toValue: 1,
           duration: 100
         }
       )
      ]).start()
      this.setState({modalVisible: !this.state.modalVisible});
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

      // Animated.timing(this.state.opacity, {
      //   toValue: 0,
      //   duration: 10
      // }).start()

      Animated.parallel([
        Animated.timing(
          this.state.pan,
          {
            toValue: {x: 0, y: 0},
            duration: 100
          }
        ),
        Animated.timing(
          this.state.bounceValue,
          {
            toValue: 0,
            duration: 100
          }
        ),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 100
        }),
      ]).start()

      setTimeout(() => {
        this.setState({modalVisible: !this.state.modalVisible});
      }, 220)
    }
    pressButton = () => {
      this.setState({modalVisible: !this.state.modalVisible});
    }

    renderR() {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{zIndex: 100, height: 50, }} >
            <TouchableOpacity
              onPress={this._pressButton}
              style={{marginTop: 15, flex: 1, alignItems:'flex-end', justifyContent: 'center',}}>
              <Image  style={{width: 20, height: 10}} source={require('./img/menu.png')}/>
            </TouchableOpacity>
          </View>

        </View>
      )
    }
    _pressButton() {
      const { dispatch ,navigator} = this.props;
      // dispatch(navTo(PagesConfig.SecondPageComponent))
      // dispatch(navTo(PagesConfig.PageOne))
      navigator.push({
        name: 'SecondPageComponent',
        component: SecondPageComponent,
        sceneConfig: Navigator.SceneConfigs.HorizontalSwipeJump
      })
      //为什么这里可以取得 props.navigator?请看上文:
      //<Component {...route.params} navigator={navigator} />
      //这里传递了navigator作为props
      if(navigator) {
        // dispatch(hide())
        // navigator.push({
        //     name: 'SecondPageComponent',
        //     component: SecondPageComponent,
        // })
        // setTimeout(() => {
        //   navigator.push({
        //       name: 'SecondPageComponent',
        //       component: SecondPageComponent,
        //   })
        // },200)
        // navigator.push({
        //     name: 'SecondPageComponent',
        //     component: SecondPageComponent,
        //     title: '测试',
        //     rightButtonTitle: '下一步',
        //     rightButtonOnClick: () => {
        //       console.log('123');
        //     }
        // })

      }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this._pressButton.bind(this)} >
                    <Text>FirstPageComponent 点我跳转</Text>
                </TouchableOpacity>
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
                     <Animated.Image
                       resizeMode={'stretch'}
                       source={require('./img/对话框实心.png')}
                       ref={ component => this._animatedView = component }
                       style={[styles.children, {
                         opacity: this.state.opacity,
                         width: this.state.pan.x,
                         height: this.state.pan.y,
                         transform: [
                           {scale: this.state.bounceValue},
                         ]
                       }]}>
                       <TouchableOpacity onPress={() => {
                         this.setModalVisible()
                       }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width:100,height:100,
                          backgroundColor: 'transparent'}}
                       >
                       <Text>关闭1</Text>
                       </TouchableOpacity>
                     </Animated.Image>
                   </View>
                  </View>
                </Modal>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  container1: {
    top: 50,
    backgroundColor: 'transparent',
    width: W,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  children: {
  },
  triangle: {
    position: 'absolute',
    top: -6,
    right: 10,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'yellow',
    transform: [
    ]
  }
});

const mapStateToProps = state => {
  // console.log(state);
  return {
    tabbar : state.tabbar,
    nav: state.nav
  }
}
module.exports = connect(mapStateToProps)(FirstPageComponent)
