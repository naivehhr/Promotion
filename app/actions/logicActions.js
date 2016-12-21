import {show, hide, change} from './tabbarActions'

export const navTo = (to, from) => {
  return (dispatch, store) => {
    const { nav, tabbar } = store()
    // if(!tabbar.show) {
    //   this.props.dispatch(show())
    // }
    const currentRoute = nav.navigator.getCurrentRoutes().pop()
    if(currentRoute.name == 'Home' && to.name !== 'Home') {
      dispatch(hide())
    } else if(currentRoute.name !== 'Home' && to.name == 'Home'){
      //这个pop得单写
    }
    setTimeout(() => {
      nav.navigator.push({
        name: to.name,
        component: to.Component,
      })
    },300)
  }
}

// 暂时没用到
export const navBack = (to, from) => {
  return (dispatch, store) => {
    const { nav, tabbar } = store()
    if(to){

    } else {
      //默认pop
      const currentRoutes = nav.navigator.getCurrentRoutes()
      const backRoute = currentRoutes[currentRoutes.length - 2]
      if(backRoute.name == 'Home') {
        nav.navigator.pop()
      }
      setTimeout(() => {
        // dispatch(show())
      },200)
    }
  }
}


// export const tabShow = () => {
//   return async (dispatch, store) => {
//     const {nav} = store()
//     dispatch(show())
//   }
// }
