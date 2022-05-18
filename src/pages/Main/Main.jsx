import React, { Component } from 'react';
import Board from '../../containers/Board/Board';
import Info from '../../containers/Info/Info';
import './Main.css'

class Main extends Component {
  render() {
    return (
      <div id="div-main">
        <Board />
        <Info />
      </div>
    );
  }
}

export default Main;