/*
* 此文件为Board组件生成action对象
*/

import { 
  MOVE, 
  CHANGE_SIDE, 
  CHANGE_SELECT_STATE, 
  CHANGE_ACTIVE_ID, 
  CHANGE_DIFFICULTY, 
  CHANGE_MODE,
} from "../constant"

// 同步action，action的值为Object类型的一般对象
export const move = data => ({ type: MOVE, data })
export const change_side = data => ({ type: CHANGE_SIDE, data })
export const change_select_state = data => ({ type: CHANGE_SELECT_STATE, data })
export const change_active_id = data => ({ type: CHANGE_ACTIVE_ID, data })
export const change_difficulty = data => ({ type: CHANGE_DIFFICULTY, data })
export const change_mode = data => dispatch => {
  dispatch({type: CHANGE_MODE, data});
  return Promise.resolve();
}
