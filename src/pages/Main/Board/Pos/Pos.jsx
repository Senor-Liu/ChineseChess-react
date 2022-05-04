import React, { Component } from 'react';
import './Pos.css';
// 引入connect用于链接UI组件与redux
import { connect } from "react-redux";
import {
  move,
  change_select_state,
  change_active_id,
} from '../../../../redux/actions/board'

class Pos extends Component {
  handlePosChick = () => {
    const {
      row,
      col,
      activeId,
      isSelectPiece,
      move,
      canMove,
      machineMove,
    } = this.props
    if (isSelectPiece) {
      //移动棋子函数row,col参数必须是number
      if (canMove(activeId, parseInt(row), parseInt(col))) {
        move({ id: activeId, toRow: row, toCol: col });

        let beforePiece = document.getElementById(activeId);
        if (activeId <= 15) {
          beforePiece.className = "piece piece-red";
        } else {
          beforePiece.className = "piece piece-black";
        }

        // change_active_id(-1);

        if (activeId >= 16) {
          machineMove();
        }
      }
    }
    return ({ row, col });
  }
  render() {
    const { row, col } = this.props
    return (
      <div
        className="pos"
        style={{
          left: 105 + 51 * col - 8 + "px",
          top: 5 + 51 * row - 8 + "px",
        }}
        onClick={this.handlePosChick}>
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
)(Pos)