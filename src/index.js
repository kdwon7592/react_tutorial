import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {
//   // props는 전달 받는 값.
//   // state는 직접 관리하는 값.
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick({ value: 'X' })}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// 함수 컴포넌트는 render 함수만을 가집니다.
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {


  // 생성자를 통해 state를 초기화 합니다.
  // js에서는 하위클래스의 생성자를 정의할 떄 항상 super를 호출.
  // 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출.

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    // 이렇게 배열을 직접 할당해도 되지만 slice를 통해서 배열을 복제해서 사용하자.
    // const squares = this.state.squares;
    const squares = this.state.squares.slice();

    // 승자가 있거나, 이미 선택되었다면...
    if (calculateWinner(squares)) {
      alert('게임이 종료되었습니다. 승자는 ' + calculateWinner(squares));
      return;
    } else if (squares[i]) {
      alert('이미 선택되었습니다.');
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(
      {
        squares: squares,
        xIsNext: !this.state.xIsNext
      }
    )
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// 승자 체크 함수
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
