import { useContext } from 'react';
import { GameState } from '../context/gameContext';

import Cell from '../models/Cell';
import FigureColors from '../enums/FigureColors';

interface Props {
  cell : Cell;
}

function CellComponent({ cell }: Props) {
  const {
    board, selectedCell, whitePlayer, blackPlayer, currentPlayer,
    setSelectedCell, setCurrentPlayer,
  } = useContext(GameState);

  const swapPlayer = () => {
    if (currentPlayer?.color === FigureColors.WHITE) {
      setCurrentPlayer(blackPlayer);
    } else {
      setCurrentPlayer(whitePlayer);
    }
  };

  const clickHandle = (currentCell : Cell) => {
    if (selectedCell && selectedCell !== currentCell && board.canMove(selectedCell, currentCell)) {
      board.moveFigure(selectedCell, currentCell);
      swapPlayer();
      setSelectedCell(null);
      currentCell.setSelected(false);
      selectedCell.setSelected(false);
    } else if (currentCell.figure && currentCell.figure?.color === currentPlayer?.color) {
      selectedCell?.setSelected(false);
      currentCell.setSelected(true);
      setSelectedCell(currentCell);
    }
  };

  const calcClassName = () => {
    const className = [
      'cell',
      cell.color,
      cell.isSelected() ? 'selected' : '',
      cell.available && cell.figure ? 'available-to-eat' : '',
    ].join(' ');

    return className;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={calcClassName()}
      onClick={() => clickHandle(cell)}
      onKeyDown={() => clickHandle(cell)}
    >
      {cell.available && !cell.figure && <div className="available" />}
      { cell.figure?.img
          && <img src={cell.figure.img} alt={cell.figure.name} />}
    </div>
  );
}

export default CellComponent;
