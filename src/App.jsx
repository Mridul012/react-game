import React, { useState, useRef } from 'react';
import './App.css';
import circle_icon from './assets/circle.png';
import cross_icon from './assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState('');
  const [board, setBoard] = useState(Array(9).fill(null));

  const titleRef = useRef(null);

  const toggle = (num) => {
    if (lock || board[num]) return;

    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? 'x' : 'o';
    data[num] = newBoard[num];
    setBoard(newBoard);
    setCount(count + 1);


    if (!checkWin(newBoard)) {
      if (count === 8) {
        setWinner('draw');
        setLock(true);
      }
    }
  };

  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  
      [0, 4, 8], [2, 4, 6],             
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        won(newBoard[a]);
        return true;
      }
    }
    return false;
  };

  const won = (player) => {
    setLock(true);
    setWinner(player);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
    setLock(false);
    setWinner('');
    data = ["", "", "", "", "", "", "", "", ""];
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>
        {winner
          ? winner === 'draw'
            ? 'It\'s a Draw!'
            : <>Congratulations: <img src={winner === 'x' ? cross_icon : circle_icon} alt={winner} /></>
          : 'Tic Tac Toe'}
      </h1>
      <div className='board'>
        <div className='row1'>
          {[0, 1, 2].map((num) => (
            <div key={num} className='boxes' onClick={() => toggle(num)}>
              {board[num] && <img src={board[num] === 'x' ? cross_icon : circle_icon} alt={board[num]} />}
            </div>
          ))}
        </div>
        <div className='row2'>
          {[3, 4, 5].map((num) => (
            <div key={num} className='boxes' onClick={() => toggle(num)}>
              {board[num] && <img src={board[num] === 'x' ? cross_icon : circle_icon} alt={board[num]} />}
            </div>
          ))}
        </div>
        <div className='row3'>
          {[6, 7, 8].map((num) => (
            <div key={num} className='boxes' onClick={() => toggle(num)}>
              {board[num] && <img src={board[num] === 'x' ? cross_icon : circle_icon} alt={board[num]} />}
            </div>
          ))}
        </div>
      </div>
      <button className='reset' onClick={resetGame}>RESET</button>
    </div>
  );
}

export default App;
