import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS } from "./constants.js";
import { checkWinnerFrom,checkEndGame } from "./logic/board.js";;
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Board } from "./components/Board.jsx";
import { Square } from "./components/Square.jsx";
import { saveGameStorage, resetGameStorage } from "./logic/index.js";
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return (boardFromStorage) ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });  
  const [turn, setTurns] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x;
  }); 
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner !== null) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurns(newTurn);
    saveGameStorage(newBoard,newTurn);
    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurns(TURNS.x);
    setWinner(null);
    resetGameStorage('board','turn')
 
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
