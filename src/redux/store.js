/*
* 此文件用于暴露store对象，整个应用只有一个store对象
*/

import { createStore } from "redux";
import reducer from "./reducers/index"
// 引入redux-devtools-extension，用于配置开发者工具
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(reducer, composeWithDevTools())
