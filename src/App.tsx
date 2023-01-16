import { useEffect, useMemo, useCallback } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { GameState } from './context/gameContext';
import Timer from './components/Timer';
import useGame from './hook/game.hook';
import Board from './models/Board';

function App() {
  const {
    board,
    selectedCell,
    whitePlayer,
    blackPlayer,
    currentPlayer,
    setBoard,
    setSelectedCell,
    setWhitePlayer,
    setBlackPlayer,
    setCurrentPlayer,
  } = useGame();

  // const restart = () => {
  //   const newBoard = new Board();
  //   newBoard.initBoard();
  //   newBoard.addFigures();
  //   setBoard(newBoard);
  // };

  const restart = useCallback(() => {
    const newBoard = new Board();
    newBoard.initBoard();
    newBoard.addFigures();
    setBoard(newBoard);
  }, [setBoard]);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [restart, setCurrentPlayer, whitePlayer]);

  const value = useMemo(() => ({
    board,
    selectedCell,
    whitePlayer,
    blackPlayer,
    currentPlayer,
    setBoard,
    setSelectedCell,
    setWhitePlayer,
    setBlackPlayer,
    setCurrentPlayer,
  }), [board, selectedCell, whitePlayer, blackPlayer, currentPlayer,
    setBoard, setSelectedCell, setWhitePlayer, setBlackPlayer, setCurrentPlayer]);

  return (
    <GameState.Provider value={value}>
      <div className="app">
        <Timer
          currentPlayer={currentPlayer}
          restart={restart}
        />
        <div>
          <LostFigures
            figures={board.lostWhiteFigure}
          />
          <BoardComponent />
          <LostFigures
            figures={board.lostBlackFigure}
          />
        </div>
      </div>
    </GameState.Provider>
  );
}

export default App;
