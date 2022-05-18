import React, { Component } from 'react';
import { enumPiece } from '../../../pieceConstant';
import './Piece.css'
// 引入connect用于链接UI组件与redux
import { connect } from "react-redux";
import {
  move,
  change_select_state,
  change_active_id,
} from '../../../redux/actions/board';

class Piece extends Component {
  componentDidMount() {
    // Connection opened
    this.props.ws.onopen = () => {
      this.props.ws.send(JSON.stringify({name:"hello"}));
    };

    // Listen for messages
    this.props.ws.onmessage = function (event) {
      console.log('Message from server ', JSON.parse(event.data));
    };
  }

  handlePieceClick = () => {
    const {
      piece,
      id,
      activeId,
      isRedMove,
      isSelectPiece,
      move,
      canMove,
      machineMove,
      change_select_state,
      change_active_id,
    } = this.props
    // 红方走棋
    if (isRedMove) {
      // 判断点击的棋子是否是红棋
      if (id <= 15) {
        // 判断是否已经有红棋被选中
        if (isSelectPiece) {
          if (activeId === id) { // 如果点击已经选中的棋子，取消选中
            document.getElementById(id).className = "piece piece-red";
            change_select_state(false);
            // change_active_id(-1);
          } else {          // 如果点击其它棋子，取消选中之前的棋子，选中当前棋子
            let beforePiece = document.getElementById(activeId);
            beforePiece.className = "piece piece-red";

            document.getElementById(id).className = "piece piece-red piece-select";
            change_active_id(parseInt(id));
          }
        }
        // 如果没有，则选中它
        else {
          document.getElementById(id).className = "piece piece-red piece-select";
          change_select_state(true);
          change_active_id(parseInt(id));
        }
      }
      // 如果有对方棋子被选中，判断能否杀掉此棋子
      else if (isSelectPiece) {
        // 移动棋子函数row,col参数必须是number
        if (canMove(activeId, piece[parseInt(id)].row, piece[parseInt(id)].col)) {
          move({ id: activeId, toRow: piece[id].row, toCol: piece[id].col });

          let beforePiece = document.getElementById(activeId);
          beforePiece.className = "piece piece-red";

          // change_active_id(-1);
        }
      }
      return;
    }
    // 黑方走棋
    else {
      if (id >= 16) {
        if (isSelectPiece) {
          if (activeId === id) {
            document.getElementById(id).className = "piece piece-black";
            change_select_state(false);
            // change_active_id(-1);
          } else {
            let beforePiece = document.getElementById(activeId);
            beforePiece.className = "piece piece-black";

            document.getElementById(id).className = "piece piece-black piece-select";
            change_active_id(parseInt(id));
          }
        } else {
          document.getElementById(id).className = "piece piece-black piece-select";
          change_select_state(true);
          change_active_id(parseInt(id));
        }
      }
      else if (isSelectPiece) {
        if (canMove(activeId, piece[id].row, piece[id].col)) {
          move({ id: activeId, toRow: piece[id].row, toCol: piece[id].col });

          let beforePiece = document.getElementById(activeId);
          beforePiece.className = "piece piece-black";

          // change_active_id(-1);

          if (activeId >= 16) {
            machineMove();
          }
        }
      }
      return;
    }
  }
  render() {
    const { id, type, red, row, col } = this.props
    return (
      <div
        id={id}
        className={red ? 'piece piece-red' : 'piece piece-black'}
        style={{
          left: 105 + 51 * col - 19 + "px",
          top: 5 + 51 * row - 19 + "px",
        }}
        onClick={this.handlePieceClick}>
        {red ? enumPiece.properties[type].red : enumPiece.properties[type].black}
      </div>
    );
  }
}

export default connect(
  state => ({
    piece: state.board.piece,
    isRedMove: state.board.isRedMove,
    activeId: state.board.activeId,
    isSelectPiece: state.board.isSelectPiece,
  }),
  // mapDispatchToProps简写，react-redux会自动调用dispatch
  {
    move,
    change_select_state,
    change_active_id,
  },
)(Piece)
