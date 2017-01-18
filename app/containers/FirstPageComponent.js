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
          modalVisible: false
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

    _onPressButton = () => {

    }

    pressButton = () => {
      console.log('??>?!!!');
      this.setState({modalVisible: !this.state.modalVisible});
    }
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
    renderR() {
      console.log('modalVisiblemodalVisible',this.state.modalVisible);
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{zIndex: 100, height: 50,  backgroundColor: 'green'}} >
            <TouchableOpacity
              onPress={this.pressButton}
              style={{marginTop: 15, flex: 1, alignItems:'flex-end', justifyContent: 'center',}}>
              <Image style={{width: 20, height: 10}} source={require('./img/menu.png')}/>
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
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    tabbar : state.tabbar,
    nav: state.nav
  }
}
module.exports = connect(mapStateToProps)(FirstPageComponent)
