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
  Navigator
} from 'react-native';


import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageTwo from './PageTwo'
import PageOne from './PageOne'
import Home from './Home'
import { connect } from 'react-redux'
import {show, hide, change} from '../actions/tabbarActions'
class Index extends Component {

  renderScene( route, nav ) {
    if(route.name == 'Home'){
      setTimeout(() => {
        !this.props.tabbar.show && this.props.dispatch(show())
      }, 1)
    } else {
      setTimeout(() => {
        this.props.tabbar.show && this.props.dispatch(hide())
      }, 1)
    }
    switch (route.name) {
      case 'FirstPageComponent':
        return <FirstPageComponent route={route} navigator={ nav } />
      case 'SecondPageComponent':
        return <SecondPageComponent route={route} navigator={ nav }  />;
      case 'Home':
        return <Home route={route} navigator={ nav }  />;
      case 'PageOne':
        return <PageOne route={route} navigator={ nav }  />;
      case 'PageTwo':
        return <PageTwo route={route} navigator={ nav }  />;
      default:
        return null
    }
  }

  render() {
    let defaultName = 'Home';
    let defaultComponent = Home;
    return (
      <Navigator
        style={{flex:1}}
        onDidFocus={(e) => console.log('onDidFocus')}
        initialRoute={{ name: 'Home', component: Home, title: 'Home' }}
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.PushFromRight
        }}
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: 'white'}}
            {...this.props}
            routeMapper={ NavigationBarRouteMapper(this.props) }
          />
        }
      />
    );
  }
}
const NavigationBarRouteMapper = props => (
  {

    LeftButton( route, navigator, index, navState ){
      if (index === 0) {
        return null;
      }
      const back = () => {
        if(route.leftBtn && route.leftBtn.onClick){
          route.leftBtn.onClick()
        } else {
          const previousRoute = navState.routeStack[index - 1];
          if(previousRoute.name == 'Home'){
            setTimeout(() => {
              // props.dispatch(show())
            }, 200)
          }
          navigator.pop()
        }
      }
      const previousRoute = navState.routeStack[index - 1];
      return (
        <TouchableOpacity onPress={back}
          style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 50}}
          >
          <Text >
            {route.leftBtn && route.leftBtn.text || previousRoute.title}
          </Text>
        </TouchableOpacity>
      );
    },
    Title( route, navigator, index, navState ){
      if (index === 0) {
        return null;
      }
      return (
        <Text >
          {route.title}
        </Text>
      );
    },
    RightButton( route, navigator, index, navState ){
      return (
        <TouchableOpacity
          style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 50}}
          onPress={() => route.rightButtonOnClick && route.rightButtonOnClick()}
          >
          <Text >
              {route.rightButtonTitle}
          </Text>
        </TouchableOpacity>
      );
    }
  }

)
const mapStateToProps = state => {
  return {
    tabbar : state.tabbar
  }
}
module.exports = connect(mapStateToProps)(Index)
