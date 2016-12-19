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

import PageOne from './PageOne'
import PageTwo from './PageTwo'
import Home from './Home'
import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
class NavTest extends Component {


  renderScene( route, nav ) {
    console.log(route.name);
    switch (route.name) {
      case 'FirstPageComponent':
        return <FirstPageComponent route={route} navigator={ nav } title={ "FirstPageComponent" } />
      case 'SecondPageComponent':
        return <SecondPageComponent route={route} navigator={ nav }  />;
      case 'Home':
        return <Home route={route} navigator={ nav }  />;
      case 'PageOne':
        return <PageOne route={route} navigator={ nav }  />;
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
        initialRoute={{ name: 'Home', component: Home, title: '首页' }}
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.PushFromRight
        }}
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={ NavigationBarRouteMapper }
          />
        }
      />
    );
  }
}
const NavigationBarRouteMapper = {

  LeftButton( route, navigator, index, navState ){
    if (index === 0) {
      return null;
    }
    const previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        >
        <Text >
          {route.backButton || previousRoute.title}
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
        onPress={() => route.rightButtonOnClick && route.rightButtonOnClick()}
        >
        <Text >
            {route.rightButtonTitle}
        </Text>
      </TouchableOpacity>
    );
  }
}

module.exports = NavTest
