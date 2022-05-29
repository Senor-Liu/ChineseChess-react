import React, { Component } from 'react';
import './Info.css';
import { connect } from 'react-redux';
import {
  change_difficulty,
} from '../../redux/actions/board';

class Info extends Component {

  change = (level) => {
    return () => {
      if (window.confirm("确定切换难度吗？")) {
        this.props.change_difficulty(level);
      }
    }
  }

  render() {
    return (
      this.props.isSinglePlayer ?
      <div id="info-div">
        <button id="btn-simple" onClick={this.change(1)} className="info-btn">简单难度</button>
        <button id="btn-medium" onClick={this.change(4)} className="info-btn">中等难度</button>
        <button id="btn-high" onClick={this.change(8)} className="info-btn">高难度</button>
      </div> : null
    )
  }
}

// 创建并暴露一个Info的容器组件
export default connect(
  state => ({
    difficulty: state.board.difficulty,
    isSinglePlayer: state.board.isSinglePlayer,
  }),
  // mapDispatchToProps简写，react-redux会自动调用dispatch
  {
    change_difficulty,
  },
)(Info)
