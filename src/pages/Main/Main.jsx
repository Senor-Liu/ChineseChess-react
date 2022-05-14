import React, { Component } from 'react';
import Board from '../../containers/Board/Board';
import './Main.css'

class Main extends Component {
  render() {
    return (
      <div id="div-main">
        <Board />
      </div>
    );
  }
}

export default Main;