import * as types from '../actions/navTypes';

const initialState = {
  navigator: null,
  route: null
};

export default function nav(state = initialState, action = {}) {
  // console.log('action',action);

  switch (action.type) {
    case types.NAV_INITIAL:
      return {
        ...state,
        navigator: action.navigator,
        route: action.route
      };
    case types.NAV_TO:
      return {
        ...state,
        show: true
      };
    default:
      return state;
  }
}


// export const navigator = ( state = initialState, action ) => {
//
//
//
// }
