/*
* 此文件用于创建一个为Board组件服务的reducer，reducer的本质是一个函数
* preState: 之前的state
* action: 动作对象
*/

import { 
  MOVE, 
  CHANGE_SIDE, 
  CHANGE_SELECT_STATE, 
  CHANGE_ACTIVE_ID, 
  CHANGE_DIFFICULTY, 
  CHANGE_MODE } from "../constant"
import { initPiece } from "../../pieceConstant"

const initState = {
  // 所有棋子
  piece: initPiece,
  // 是否红方走棋
  isRedMove: false,
  // 当前选中棋子id
  activeId: -1,
  // 是否有棋子被选中
  isSelectPiece: false,
  // 难度
  difficulty: 1,
  // 是否单人模式
  isSinglePlayer: true,
}

// reducer必须是纯函数！！！
export default function boardReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case MOVE:
      {
        const newPiece = [...preState.piece];
        //确定某个行列位置上是否有棋子,有返回其id,没有返回-1
        const judgePiece = (row, col) => {
          for (let i = 0; i < 32; i++) {
            if (newPiece[i].row === row && newPiece[i].col === col && !newPiece[i].dead) {
              return i;
            }
          }
          return -1;
        }
        //如果要下的位置有棋子，杀死它
        if (judgePiece(data.toRow, data.toCol) >= 0) {
          newPiece[judgePiece(data.toRow, data.toCol)].dead = true;
        }
        newPiece[data.id].row = data.toRow;
        newPiece[data.id].col = data.toCol;
        return {
          ...preState,
          piece: newPiece,
          isRedMove: !preState.isRedMove,
          isSelectPiece: false,
        }
      }
    case CHANGE_SIDE:
      return { ...preState, isRedMove: data }
    case CHANGE_SELECT_STATE:
      return { ...preState, isSelectPiece: data }
    case CHANGE_ACTIVE_ID:
      return { ...preState, activeId: data }
    case CHANGE_DIFFICULTY:
      return { ...preState, difficulty: data }
    case CHANGE_MODE: {
      return { ...preState, isSinglePlayer: data }
    }
    default:
      return preState
  }
}