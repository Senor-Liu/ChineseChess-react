import React, { Component } from 'react';
import Board from '../../containers/Board/Board';
import Info from '../../containers/Info/Info';
import './Main.css'

class Main extends Component {
  render() {
    const { username } = this.props.location.state || {};
    return (
      <div id="div-main">
        <Board username={username}/>
        <Info />
      </div>
    );
  }
}

export default Main;