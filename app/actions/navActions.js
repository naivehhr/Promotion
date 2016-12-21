import * as types from './navTypes';

export const nav_initial = (navigator, route) =>{
  return {
    type: types.NAV_INITIAL,
    navigator,
    route
  };
}
