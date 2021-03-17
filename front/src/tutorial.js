import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

function Square(props){
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i,j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={(i,j) => this.props.onClick(i,j)}
        key={[i,j]}
       />
    );
  };

  render() {
    let list = Array(3).fill(Array(3).fill(null));
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        list[i][j] = this.renderSquare(i,j)
      }
    };
    let rows = list.map((value,index,array) => {
      return (
        <div className="board-row" key={index}>
          {value}
        </div>
      );
    });
    return (
      <div>
        {rows}
      </div>
    );
  };
};

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(3).fill(Array(3).fill(null)),
        position: Array(2).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i,j){
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    let position = current.position.slice();
    position = [i,j];
    console.log(position)
    this.setState({
      history: history.concat([{
        squares: squares,
        position: position,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {
      const desc = move ?
        'Go to move #' + move + ' position: ' + step.position :
        'Go to game start';
      let btnstyle;
      if (move===this.state.stepNumber) {
        btnstyle = {color:"red"}
      }
      return (
        <li key={move}>
          <button
            style={btnstyle}
            onClick={() => {this.jumpTo(move)}}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
    };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i,j) => this.handleClick(i,j)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
}

function calculateWinner(squares) {
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
for (let i = 0; i < lines.length; i++) {
  const [a, b, c] = lines[i];
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a];
  }
}
return null;
}
// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);


export default Game;
