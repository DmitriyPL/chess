import { createContext, Dispatch, SetStateAction } from 'react';
import Board from '../models/Board';
import Cell from '../models/Cell';
import Player from '../models/Player';

export interface GameStateInterface {
  board: Board,
  selectedCell: Cell | null,
  whitePlayer: Player | null,
  blackPlayer: Player | null,
  currentPlayer: Player | null,
  setBoard: Dispatch<SetStateAction<Board>>,
  setSelectedCell: Dispatch<SetStateAction<Cell | null>>,
  setWhitePlayer: Dispatch<SetStateAction<Player | null>>,
  setBlackPlayer: Dispatch<SetStateAction<Player | null>>,
  setCurrentPlayer: Dispatch<SetStateAction<Player | null>>,
}

const initState : GameStateInterface = {
  board: new Board(),
  selectedCell: null,
  whitePlayer: null,
  blackPlayer: null,
  currentPlayer: null,
  setBoard: () => {},
  setSelectedCell: () => {},
  setWhitePlayer: () => {},
  setBlackPlayer: () => {},
  setCurrentPlayer: () => {},
};

export const GameState = createContext(initState);
