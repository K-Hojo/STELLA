import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class MaterialSquare extends React.Component {
  render() {
    return (
      <textarea
        className="th"
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
}

class ChapTitleSquare extends React.Component {
  render() {
    return (
      <textarea
        className="chaptitle"
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
}

class ChapKeywordSquare extends React.Component {
  render() {
    return (
      <textarea
        className="keyword"
        id={this.props.id}
        value={this.props.value}
      />
    );
  }
}
class ChapContainer extends React.Component{
  render(){
    return(
      <div className="td">
        <ChapTitleSquare />
        <ChapKeywordSquare/>
      </div>
  )
}}
class Board extends React.Component {
  renderSquare(i,j) {
    return (
      <ChapContainer
        value={this.props.content}
        id={[i,j]}
        key={[i,j]}
      />
    )
  };
  render() {
    const MAXCHAPTER = 3;
    let matrix = Array(3).fill(Array(MAXCHAPTER).fill(null));
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < MAXCHAPTER; j++) {
        matrix[i][j] = this.renderSquare(i,j)
      }
    };
    let rows = matrix.map((value,index) => {
      return (
        <div className="tr" key={index}>
          <MaterialSquare />
          {value}
        </div>
      );
    });
    let chaps = matrix.map((value,index) => {
      let chap = index + 1
      return (
        <div key={index}>
          <div className="th"></div>
          <div className="th">{'第'+chap+'章'}</div>
        </div>
      );
    });
    return (
      <div className="table">
        <div className="thead"><div className="tr">{chaps}</div></div>
        <div className="tbody">{rows}</div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board

          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
