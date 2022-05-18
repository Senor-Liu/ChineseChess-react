import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';
import {
  move,
  change_difficulty,
  change_mode,
} from '../../redux/actions/board';

class Info extends Component {
  render() {
    return (
      <div id="info-div">
        <button id="btn-reset" onClick={this.reset} className="info-btn">重新开始</button>
        <button id="btn-simple" onClick={this.simple} className="info-btn">简单难度</button>
        <button id="btn-medium" onClick={this.medium} className="info-btn">中等难度</button>
      </div>
    )
  }
}

// 创建并暴露一个Info的容器组件
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
    change_difficulty,
    change_mode,
  },
)(Info)
