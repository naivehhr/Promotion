import { combineReducers } from 'redux'
import tabbar from './tabbar';
import nav from './nav';

// export {
//   tabbar,
//   nav
// };

// NOTE: 建议下面这种写法
export default combineReducers({
  tabbar,
  nav
})
