import React, { useState } from "react";
import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      setGameOver(true);
      setWinner(winner);

      if (winner === "O") {
        setScores((prevScores) => ({ ...prevScores, oScore: prevScores.oScore + 1 }));
      } else {
        setScores((prevScores) => ({ ...prevScores, xScore: prevScores.xScore + 1 }));
      }
    } else if (!updatedBoard.includes(null)) { // If the board is full and no winner
      setGameOver(true);
      setWinner(null); // Set winner to null to indicate draw
    } else {
      // Step 3: Change active player
      setXPlaying((prevXPlaying) => !prevXPlaying);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setWinner(null);
    setBoard(Array(9).fill(null));
  };

  return (

    <div className="bg-cover h-screen w-full">
       {gameOver && (
        <div className="result ">
          {winner !== null ? `Winner: ${winner}` : "It's a draw!"}
        </div>
      )}
    <div className="flex flex-col justify-center items-center h-full">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
     
      <ResetButton resetBoard={resetBoard} />
    </div>
  </div>
);
};

export default App;
