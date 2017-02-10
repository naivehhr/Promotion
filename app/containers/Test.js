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
const o = Dimensions.get("window")
const W = o.width
const H = o.height
import { connect } from 'react-redux'
import {show, hide, change} from '../actions/tabbarActions'
import FirstPageComponent from './FirstPageComponent'
import SecondPageComponent from './SecondPageComponent'
import PageTwo from './PageTwo'
import PageOne from './PageOne'
import Dk from './Dk'
import Dr from './Dr'
import Home from './Home'
import Calendar from './Calendar'
import LineTest from './LineTest'
import EasingTest from './EasingTest'
import MenuScreen from './MenuScreen'
import LoadingView from './LoadingView'
import Pageview from './Pageview'
import PasswordGestureTest from './PasswordGestureTest'
import ScrollViewAnimationTest from './ScrollViewAnimationTest'
import Refresh from './Refresh'
import PullView from './PullView'
import PullToRefreshView from './PullToRefreshView'
import AnimationNumber from './AnimationNumber'
import SvgExample from './SvgExample'
import ScrollTestView from './ScrollTestView'
class Test extends Component {

  renderScene( route, nav ) {



    // // NOTE: setTimeout 是为了不同时出发多次render 现在移动到左侧返回键中处理了
    // setTimeout(() => {
    //   const currentRoute = nav.getCurrentRoutes().pop()
    //   console.log(currentRoute.name);
    //   if(currentRoute.name == 'Dk'){
    //     // !this.props.tabbar.show && this.props.dispatch(show())
    //   } else {
    //     // 隐藏应该提前 在navTo中完成
    //     // this.props.tabbar.show && this.props.dispatch(hide())
    //   }
    // }, 0)
    switch (route.name) {
      case 'ScrollTestView':
        return <ScrollTestView route={route} navigator={ nav }  />;
      case 'SvgExample':
        return <SvgExample route={route} navigator={ nav }  />;
      case 'AnimationNumber':
        return <AnimationNumber route={route} navigator={ nav }  />;
      case 'PullToRefreshViewStickyHeaderAndroidPullToRefresh':
        return <PullToRefreshView.StickyHeaderAndroidPullToRefreshDemo route={route} navigator={ nav }  />;
      case 'PullToRefreshViewPullToRefreshScrollView':
        return <PullToRefreshView.PllToRefreshScrollView route={route} navigator={ nav }  />;
      case 'Refresh':
        return <Refresh route={route} navigator={ nav }  />;
      case 'ScrollViewAnimationTest':
        return <ScrollViewAnimationTest route={route} navigator={ nav }  />;
      case 'PasswordGestureTest':
        return <PasswordGestureTest route={route} navigator={ nav }  />;
      case 'Pageview':
        return <Pageview route={route} navigator={ nav }  />;
      case 'LoadingView':
        return <LoadingView route={route} navigator={ nav }  />;
      case 'MenuScreen':
        return <MenuScreen route={route} navigator={ nav }  />;
      case 'EasingTest':
        return <EasingTest route={route} navigator={ nav }  />;
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
      case 'Dk':
        return <Dk route={route} navigator={ nav }  />;
      case 'Dr':
        return <Dr route={route} navigator={ nav }  />;
      case 'Calendar':
        return <Calendar route={route} navigator={ nav }  />;
      case 'LineTest':
        return <LineTest route={route} navigator={ nav }  />;
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
        initialRoute={{ name: 'Dk', component: Dk, title: '首页' }}
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.PushFromRight
        }}
        renderScene={ this.renderScene.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
            style={{backgroundColor: '#FFF0F5'}}
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
          if(previousRoute.name == 'Dk'){
            setTimeout(() => {
              props.dispatch(show())
            }, 0)
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
            {route.leftBtn || previousRoute.title}
          </Text>
        </TouchableOpacity>
      );
    },
    Title( route, navigator, index, navState ){
      if (index === 10) {
        return null;
      }
      return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 220}}>
          <Text >
            {route.title}
          </Text>
        </View>
      );
    },
    RightButton( route, navigator, index, navState ){
      return (
        <TouchableOpacity
          style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 50}}
          onPress={() => route.rightButton && route.rightButton.onClick()}
          >
          <Text >
              {route.rightButton && route.rightButton.text}
          </Text>
        </TouchableOpacity>
      );
    }
  }

)
const mapStateToProps = state => {
  return {
    tabbar : state.tabbar,
    nav: state.nav
  }
}
module.exports = connect(mapStateToProps)(Test)
