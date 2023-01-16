import { Fragment, useEffect, useContext } from 'react';
import { GameState } from '../context/gameContext';
import CellComponent from './CellComponent';

function BoardComponent() {
  const {
    board, selectedCell, setBoard,
  } = useContext(GameState);

  const updateBoard = () => {
    setBoard(board.getCopyBoard());
  };

  const highlightCells = () => {
    board.highlightCells(selectedCell);
  };

  useEffect(() => {
    highlightCells();
    updateBoard();
  }, [selectedCell]);

  return (
    <div>
      <div className="board">
        {
          board.cells.map((row, i) => (
            <Fragment key={`row-${i + 1}`}>
              {
                row.map((cell) => (
                  <CellComponent
                    key={cell.id}
                    cell={cell}
                  />
                ))
              }
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}

export default BoardComponent;
