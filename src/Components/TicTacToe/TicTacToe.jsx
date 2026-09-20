import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ['', '', '', '', '', '', '', '', ''];

export const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winnerLine, setWinnerLine] = useState([]);
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const setStatusBanner = (message) => {
    titleRef.current.classList.add('status-banner');
    titleRef.current.innerHTML = message;
  };

  const won = (winner, winningBoxes) => {
    setLock(true);
    setWinnerLine(winningBoxes);

    if (winner === 'X') {
      setStatusBanner(`Congratulations: <img src='${cross_icon}' alt="Cross" /> Wins!`);
    } else {
      setStatusBanner(`Congratulations: <img src='${circle_icon}' alt="Circle" /> Wins!`);
    }
  };

  const checkWinner = () => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (data[a] !== '' && data[a] === data[b] && data[b] === data[c]) {
        won(data[a], pattern);
        return true;
      }
    }

    return false;
  };

  const reset = () => {
    setLock(false);
    setWinnerLine([]);
    data = ['', '', '', '', '', '', '', '', ''];
    titleRef.current.classList.remove('status-banner');
    titleRef.current.innerHTML = 'Tic Tac Toe';
    setCount(0);
    box_array.forEach((box) => {
      if (box.current) {
        box.current.innerHTML = '';
        box.current.classList.remove('winning');
      }
    });
  };

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }

    if (data[num] !== '') {
      return 0;
    }

    const nextCount = count + 1;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt='Cross' />`;
      data[num] = 'X';
      setCount(nextCount);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt='Circle' />`;
      data[num] = 'O';
      setCount(nextCount);
    }

    if (checkWinner()) {
      return;
    }

    const isDraw = data.every((cell) => cell !== '');

    if (isDraw) {
      setLock(true);
      setWinnerLine([]);
      setStatusBanner("It's a draw");
    }
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>Tic Tac Toe</h1>

      <div className="board">
        <div className="row1">
          <div className={`boxes ${winnerLine.includes(0) ? 'winning' : ''}`} ref={box1} onClick={(e) => toggle(e, 0)}></div>
          <div className={`boxes ${winnerLine.includes(1) ? 'winning' : ''}`} ref={box2} onClick={(e) => toggle(e, 1)}></div>
          <div className={`boxes ${winnerLine.includes(2) ? 'winning' : ''}`} ref={box3} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className={`boxes ${winnerLine.includes(3) ? 'winning' : ''}`} ref={box4} onClick={(e) => toggle(e, 3)}></div>
          <div className={`boxes ${winnerLine.includes(4) ? 'winning' : ''}`} ref={box5} onClick={(e) => toggle(e, 4)}></div>
          <div className={`boxes ${winnerLine.includes(5) ? 'winning' : ''}`} ref={box6} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className={`boxes ${winnerLine.includes(6) ? 'winning' : ''}`} ref={box7} onClick={(e) => toggle(e, 6)}></div>
          <div className={`boxes ${winnerLine.includes(7) ? 'winning' : ''}`} ref={box8} onClick={(e) => toggle(e, 7)}></div>
          <div className={`boxes ${winnerLine.includes(8) ? 'winning' : ''}`} ref={box9} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>

      <button className="reset" onClick={() => { reset(); }}>Reset</button>
    </div>
  );
};

export default TicTacToe;