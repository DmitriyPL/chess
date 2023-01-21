import { Fragment, useEffect, useContext, useCallback } from 'react';
import { GameState } from '../context/gameContext';
import CellComponent from './CellComponent';

function BoardComponent() {
  const {
    board, selectedCell, setBoard,
  } = useContext(GameState);

  const updateBoard = useCallback(
    () => {
    setBoard(board.getCopyBoard());
  }, [board, setBoard]);

  const highlightCells = useCallback(
    () => {
      board.highlightCells(selectedCell);
    },
    [selectedCell, board],
  );

  useEffect(() => {
    highlightCells();
    updateBoard();
  }, [selectedCell, highlightCells, updateBoard]);

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
