import React, { Component } from 'react';
import Piece from './Piece/Piece';
import './Board.css';
import Pos from './Pos/Pos';
// 引入connect用于链接UI组件与redux
import { connect } from "react-redux";
import {
  move,
  change_select_state,
  change_active_id,
} from '../../../redux/actions/board'

// UI组件
class Board extends Component {
  //判断棋子能不能走
  canMove = (moveid, row, col) => {
    //判断是否对将
    if (this.num_of_Piece(4, this.props.piece[20].row, this.props.piece[20].col) === 1 && this.props.piece[moveid].col === this.props.piece[20].col && Math.abs(this.props.piece[moveid].col - col) >= 1) {
      return false;
    }
    //判断要下的位置是否有己方棋子
    if (!this.sameSide(moveid, this.judgePiece(row, col))) {
      switch (this.props.piece[moveid].type) {
        case "jiang":
          return this.canMoveJIANG(moveid, row, col);
        case "bing":
          return this.canMoveBING(moveid, row, col);
        case "ju":
          return this.canMoveJU(moveid, row, col);
        case "pao":
          return this.canMovePAO(moveid, row, col);
        case "ma":
          return this.canMoveMA(moveid, row, col);
        case "shi":
          return this.canMoveSHI(moveid, row, col);
        case "xiang":
          return this.canMoveXIANG(moveid, row, col);
        default:
          console.log('function canMove error');
          break;
      }
    }
    return false;
  }
  //确定某个行列位置上是否有棋子,有返回其id,没有返回-1
  judgePiece = (row, col) => {
    for (let i = 0; i < 32; i++) {
      if (this.props.piece[i].row === row && this.props.piece[i].col === col && !this.props.piece[i].dead) {
        return i;
      }
    }
    return -1;
  }

  //判断两个棋子是否是同一方的
  sameSide = (id_1, id_2) => {
    if (id_1 < 0 || id_1 > 31 || id_2 < 0 || id_2 > 31) {
      return false;
    }
    if ((id_1 <= 15 && id_2 <= 15) || (id_1 >= 16 && id_2 >= 16)) {
      return true;
    }
    return false;
  }

  // 计算即将行走的棋子与某一坐标之间有几颗棋子 默认返回值为-1（主要用于对将以及车和炮的走棋算法上）
  num_of_Piece = (moveid, row, col) => {
    let i = -1,
      sum = 0;
    if (this.props.piece[moveid].row === row) {     // 判断棋子是往水平方向走
      if (col - this.props.piece[moveid].col > 0) {   // 从右往左走
        for (i = this.props.piece[moveid].col + 1; i < col; i++) {   // 循环找出中间每个空位的坐标
          if (this.judgePiece(this.props.piece[moveid].row, i) >= 0) {  // 并传给judgePiece函数
            sum++;
          }
        }
      }
      else {                                  // 从左往右走
        for (i = this.props.piece[moveid].col - 1; i > col; i--) {
          if (this.judgePiece(this.props.piece[moveid].row, i) >= 0) {
            sum++;
          }
        }
      }
      return sum;
    }
    else if (this.props.piece[moveid].col === col) {   // 往垂直方向走
      if (row - this.props.piece[moveid].row > 0) {
        for (i = this.props.piece[moveid].row + 1; i < row; i++) {
          if (this.judgePiece(i, this.props.piece[moveid].col) >= 0) {
            sum++;
          }
        }
      }
      else {
        for (i = this.props.piece[moveid].row - 1; i > row; i--) {
          if (this.judgePiece(i, this.props.piece[moveid].col) >= 0) {
            sum++;
          }
        }
      }
      return sum;
    }
    // 当前棋子和要走的位置不在一条直线上
    return -1;
  }

  // 将的走棋规则
  canMoveJIANG = (moveid, row, col) => {
    // 列超出范围
    if (col < 3) {
      return false;
    }
    if (col > 5) {
      return false;
    }
    // 行坐标差
    const dr = this.props.piece[moveid].row - row;
    // 列坐标差
    const dc = this.props.piece[moveid].col - col;
    // 判断步长是否为1
    if ((Math.abs(dr) === 1 && Math.abs(dc) === 0) || (Math.abs(dr) === 0 && Math.abs(dc) === 1)) {
      // 红棋，并判断行是否超出范围
      if (this.props.piece[moveid].red && row >= 0 && row <= 2) {
        // 判断是否对将
        if (this.num_of_Piece(20, row, col) !== 0) {	// 黑方将的id是20
          return true;
        }
      }
      // 黑棋
      else if (row >= 7 && row <= 9) {
        // 判断是否对将
        if (this.num_of_Piece(4, row, col) !== 0) {	// 红方帅的id是4
          return true;
        }
      }
    }
    return false;
  }

  // 兵的走棋规则
  canMoveBING = (moveid, row, col) => {
    const dr = this.props.piece[moveid].row - row;
    const dc = this.props.piece[moveid].col - col;
    // 红棋
    if (this.props.piece[moveid].red) {
      // 过河前
      if (this.props.piece[moveid].row >= 3 && this.props.piece[moveid].row <= 4) {
        // 竖着走
        if (dr === -1 && dc === 0) {
          return true;
        }
        // 横着走
        else {
          return false;
        }
      }
      // 过河后
      else {
        if ((Math.abs(dr) === 1 && Math.abs(dc) === 0) || (Math.abs(dc) === 1 && Math.abs(dr) === 0)) {
          // 竖着走
          if (dr === 1) {
            // 竖着走后退了就返回错误
            return false;
          }
          else {
            return true;
          }
        }
      }
    }
    // 黑棋
    else {
      // 过河前
      if (this.props.piece[moveid].row >= 5 && this.props.piece[moveid].row <= 6) {
        // 竖着走
        if (dr === 1 && dc === 0) {
          return true;
        }
        // 横着走
        else {
          return false;
        }
      }
      // 过河后
      else {
        // 竖着走
        if ((Math.abs(dr) === 1 && Math.abs(dc) === 0) || (Math.abs(dc) === 1 && Math.abs(dr) === 0)) {
          // 竖着走后退了就返回错误
          if (dr === -1) {
            return false;
          }
          else {
            return true;
          }
        }
      }
    }
    return false;
  }

  // 车的走棋规则
  canMoveJU = (moveid, row, col) => {
    if (this.num_of_Piece(moveid, row, col) === 0) {
      return true;
    }
    return false;
  }

  // 炮的走棋规则
  canMovePAO = (moveid, row, col) => {
    // 判断要下的位置是否有棋子
    if (this.judgePiece(row, col) >= 0) {
      if (this.num_of_Piece(moveid, row, col) === 1) {
        return true;
      }
    }
    else {
      if (this.num_of_Piece(moveid, row, col) === 0) {
        return true;
      }
    }
    return false;
  }

  // 马的走棋规则
  canMoveMA = (moveid, row, col) => {
    const dr = this.props.piece[moveid].row - row;
    const dc = this.props.piece[moveid].col - col;
    //走日字格
    if ((Math.abs(dr) === 2 && Math.abs(dc) === 1) || (Math.abs(dr) === 1 && Math.abs(dc) === 2)) {
      //别马脚检测
      if (dr === 2) {	// 往上走
        if (this.judgePiece(this.props.piece[moveid].row - 1, this.props.piece[moveid].col) === -1) {
          return true;
        }
      } else if (dr === -2) {	// 往下走
        if (this.judgePiece(this.props.piece[moveid].row + 1, this.props.piece[moveid].col) === -1) {
          return true;
        }
      } else if (dc === 2) {	// 往左走
        if (this.judgePiece(this.props.piece[moveid].row, this.props.piece[moveid].col - 1) === -1) {
          return true;
        }
      } else {	// 往右走
        if (this.judgePiece(this.props.piece[moveid].row, this.props.piece[moveid].col + 1) === -1) {
          return true;
        }
      }
    }
    return false;
  }

  // 士的走棋规则
  canMoveSHI = (moveid, row, col) => {
    if (this.props.piece[moveid].red) {
      // 判断红方士纵向行走是否超出范围
      if (row > 2) {
        return false;
      }
    }
    else {
      // 判断黑方士纵向行走是否超出范围
      if (row < 7) {
        return false;
      }
    }
    // 判断双方士的横向行走是否超出范围
    if (col < 3) {
      return false;
    }
    if (col > 5) {
      return false;
    }
    // 判断是否为沿着对角线斜着行走
    const dr = this.props.piece[moveid].row - row;
    const dc = this.props.piece[moveid].col - col;
    if (Math.abs(dr) === 1 && Math.abs(dc) === 1) {
      return true;
    }
    return false;
  }

  // 象的走棋规则
  canMoveXIANG = (moveid, row, col) => {
    // 不能过河
    if (this.props.piece[moveid].red) {
      if (row > 4) {
        return false;
      }
    }
    else {
      if (row < 5) {
        return false;
      }
    }
    // 走田字格
    const dr = this.props.piece[moveid].row - row;
    const dc = this.props.piece[moveid].col - col;
    if (Math.abs(dr) === 2 && Math.abs(dc) === 2 && this.judgePiece((this.props.piece[moveid].row + row) / 2, (this.props.piece[moveid].col + col) / 2) === -1) { //别象脚检测
      return true;
    }
    return false;
  }

  machineMove = () => {
    const {
      piece,
      move,
      change_select_state,
      change_active_id,
    } = this.props;
    const { canMove, judgePiece } = this;
    //存放所有走得通的路径
    let _steps = [];
    let _steps_inner = [];

    //难度等级（递归层数）
    const _level = 4;

    //枚举各种棋子分数（重要性）
    const chessScore = {
      "jiang": 1500,
      "ju": 100,
      "ma": 50,
      "pao": 50,
      "bing": 20,
      "shi": 10,
      "xiang": 10
    };

    //评估局面
    function evalScore() {
      let redTotalScore = 0;
      let blackTotalScore = 0;
      //计算红棋总分
      for (let i = 0; i <= 15; i++) {
        //如果棋子已死则跳过累加
        if (piece[i].dead) {
          continue;
        }
        redTotalScore += chessScore[piece[i].type];
      }
      //计算黑棋总分
      for (let i = 16; i <= 31; i++) {
        //如果棋子已死则跳过累加
        if (piece[i].dead) {
          continue;
        }
        blackTotalScore += chessScore[piece[i].type];
      }
      //返回黑棋总分-红棋总分
      return redTotalScore - blackTotalScore; //换边时交换位置
    }

    //试着走一步
    let fakeMoveInfo = [];
    function fakeMove(moveid, rowTo, colTo) {
      //判断要下的位置是否有棋子
      let killid = judgePiece(rowTo, colTo);
      //保存fake杀死的棋子id和之前的位置以便复活
      fakeMoveInfo.push([killid,
        piece[moveid].row,
        piece[moveid].col]);
      //如果要下的位置有棋子，杀死它
      if (killid >= 0) {
        piece[killid].dead = true;
      }
      //移动棋子位置
      piece[moveid].row = rowTo;
      piece[moveid].col = colTo;
    }
    //走回来
    function unfakeMove(moveid, rowTo, colTo) {
      if (fakeMoveInfo[fakeMoveInfo.length - 1][0] >= 0) {
        piece[fakeMoveInfo[fakeMoveInfo.length - 1][0]].dead = false;
      }
      piece[moveid].row = fakeMoveInfo[fakeMoveInfo.length - 1][1];
      piece[moveid].col = fakeMoveInfo[fakeMoveInfo.length - 1][2];
      fakeMoveInfo.pop();
    }

    //获取所有走得通的路径，获取电脑路径传true
    function getAllPossibleMove(mach) {
      let min;
      let max;
      if (mach) {
        min = 0;
        max = 15;
      } else {
        min = 16;
        max = 31;
      }

      //遍历所有电脑方棋子
      for (let id = min; id <= max; id++) {
        //如果棋子已死则直接跳过
        if (piece[id].dead) {
          continue;
        }
        //遍历所有行坐标
        for (let row = 0; row <= 9; row++) {
          //遍历所有列坐标
          for (let col = 0; col <= 8; col++) {
            if (canMove(id, row, col)) {
              _steps_inner[_steps_inner.length] = { _moveid: id, _toRow: row, _toCol: col };
            }
          }
        }
      }
      _steps[_steps.length] = _steps_inner;
      _steps_inner = [];
      // console.log(_steps);
    }

    //获取人类走下一步棋对电脑最不利的分数返回
    function getMinScore(level) {
      if (level <= 0) {
        return evalScore();
      }
      //获取人类的所有走棋路径
      getAllPossibleMove(false);
      let minScore = 100000;
      let steps = _steps[_steps.length - 1];
      for (let i = 0; i < steps.length; i++) {
        //试着走一下
        fakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        //找到对电脑最不利的分数返回
        let score = getMaxScore(--level);
        //走回来
        unfakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        if (score < minScore) {
          minScore = score;
        }
      }
      _steps.pop();
      return minScore;
    }
    //获取对电脑最有利的分数（用于递归调用）
    function getMaxScore(level) {
      if (level <= 0) {
        return evalScore();
      }
      //获取电脑的所有走棋路径
      getAllPossibleMove(true);
      let maxScore = -100000;
      let steps = _steps[_steps.length - 1];
      for (let i = 0; i < steps.length; i++) {
        //试着走一下
        fakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        //找到对电脑最不利的分数返回
        let score = getMinScore(--level);
        //走回来
        unfakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        if (score > maxScore) {
          maxScore = score;
        }
      }
      _steps.pop();
      return maxScore;
    }

    // 从所有能走的路径中找到对电脑最有利的路径，返回该step对象
    function getBestMove() {
      // 获取电脑的所有走棋路径
      getAllPossibleMove(true);
      let maxScore = -100000;
      let best;
      let steps = _steps[_steps.length - 1];
      for (let i = 0; i < steps.length; i++) {
        // 试着走一下
        fakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        // 获取电脑当前走法下对自己最不利的分值
        let score = getMinScore(_level);
        // 再走回来
        unfakeMove(steps[i]._moveid, steps[i]._toRow, steps[i]._toCol);
        // 从所有对自己最不利的分值中找到对自己最有利的分值并锁定走棋路径作为返回值返回
        if (score > maxScore) {
          maxScore = score;
          best = steps[i];
        }
      }
      _steps.pop();
      return best;
    }

    // 封装电脑走棋函数
    function machMove() {
      let step = getBestMove();
      move({ id: step._moveid, toRow: step._toRow, toCol: step._toCol });
      change_select_state(false);
      change_active_id(-1);

      console.log('最终：', step);
      return step;
    }

    return machMove()
  }

  click = () => {
    console.log('点击了');
    console.log(this.canMove(16, 8, 0));
    this.props.move({ id: 0, toRow: 1, toCol: 0 })
  }

  // 初始化棋子落位网方法
  initPos = () => {
    let list = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        list.push(<Pos
          key={j + '-' + i}
          row={j}
          col={i}
          canMove={this.canMove}
          judgePiece={this.judgePiece}
          machineMove={this.machineMove} />)
      }
    }
    return list
  }

  render() {
    return (
      <div id="div-chessboard">
        <canvas className="chess-diagonal" id="diagonal" width="600px" height="600px">您的浏览器不支持canvas</canvas>
        <table className="chesstable" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-center">
              <td colSpan="9" className="chu-river">楚河&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;漢界</td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
            <tr className="chess-tr">
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
              <td className="chess-td"></td>
            </tr>
          </tbody>
        </table>
        {
          this.props.piece.map((pieceObj) => {
            if (!pieceObj.dead) {
              return (
                <Piece
                  key={pieceObj.id}
                  {...pieceObj}
                  canMove={this.canMove}
                  judgePiece={this.judgePiece}
                  machineMove={this.machineMove} />
              )
            }
            return null
          })
        }
        <>{this.initPos()}</>
        <button style={{ position: 'absolute', top: '700px' }} onClick={this.click}>改变位置</button>
      </div>
    );
  }
}

// 创建并暴露一个Board的容器组件
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
)(Board)