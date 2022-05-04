/*
* 此文件汇总所有的reducer为一个reducer
*/

import { combineReducers } from "redux";

// 引入为Board组件服务的reducer
import board from "./board";

export default combineReducers({
  board,
})