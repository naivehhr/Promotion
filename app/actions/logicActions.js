import {show, hide, change} from './tabbarActions'

export const navTo = (to, from) => {
  return (dispatch, store) => {
    const { nav, tabbar } = store()
    // if(!tabbar.show) {
    //   this.props.dispatch(show())
    // }



    // NOTE: 自己控制的方式
    // const currentRoute = nav.navigator.getCurrentRoutes().pop()
    // if(currentRoute.name == 'Dk' && to.name !== 'Dk') {
    //   dispatch(hide())
    // }


    nav.navigator.push({
      name: to.name,
      component: to.Component,
    })
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
