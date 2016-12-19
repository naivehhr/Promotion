import * as types from '../actions/tabbarTypes';

const initialState = {
  show: true
};

export default function tabbar(state = initialState, action = {}) {
  switch (action.type) {
    case types.TBA_SHOW:
      return {
        ...state,
        show: !state.show
      };
    case types.TBA_HIDE:
      console.log('隐藏！');
      return {
        ...state,
        show: !state.show
      }
    default:
      return state;
  }
}
