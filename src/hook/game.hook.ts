import { useState } from 'react';
import FigureColors from '../enums/FigureColors';
import Board from '../models/Board';
import Cell from '../models/Cell';
import Player from '../models/Player';

const useGame = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [whitePlayer, setWhitePlayer] = useState<Player | null>(new Player(FigureColors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState<Player | null>(new Player(FigureColors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  return {
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
  };
};

export default useGame;
