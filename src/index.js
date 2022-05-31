import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './components/Board';

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

class Game extends React.Component {

  // 생성자를 통해 state를 초기화 합니다.
  // js에서는 하위클래스의 생성자를 정의할 떄 항상 super를 호출.
  // 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출.

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    // 이렇게 배열을 직접 할당해도 되지만 slice를 통해서 배열을 복제해서 사용하자.
    // const squares = this.state.squares;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

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
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      }
    )
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
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
