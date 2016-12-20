import * as types from '../actions/tabbarTypes';

const initialState = {
  show: true
};

export default function tabbar(state = initialState, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case types.TBA_SHOW:
      return {
        ...state,
        show: true
      };
    case types.TBA_HIDE:
      return {
        ...state,
        show: false
      }
    case types.TBA_CHANGE:
      return {
        ...state,
        show: !state.show
      }
    default:
      return state;
  }
}
