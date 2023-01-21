import FigureColors from '../enums/FigureColors';
import FiguresName from '../enums/FiguresName';
import CellColors from '../enums/CellColors';
import Figure from './figures/Figure';
import Bishop from './figures/Bishop';
import Knight from './figures/Knight';
import Queen from './figures/Queen';
import Pawn from './figures/Pawn';
import King from './figures/King';
import Rook from './figures/Rook';
import Cell from './Cell';

class Board {
  cells: Cell[][] = [];

  lostWhiteFigure: Figure[] = [];

  lostBlackFigure: Figure[] = [];

  private setCells(cells: Cell[][]) {
    this.cells = cells;
  }

  public initBoard() {
    for (let y = 0; y < 8; y += 1) {
      const row: Cell[] = [];
      for (let x = 0; x < 8; x += 1) {
        let color: CellColors;
        if ((x + y) % 2 !== 0) {
          color = CellColors.BLACK;
        } else {
          color = CellColors.WHITE;
        }
        row.push(new Cell(x, y, color, null));
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.setCells(this.cells);
    newBoard.lostBlackFigure = this.lostBlackFigure;
    newBoard.lostWhiteFigure = this.lostWhiteFigure;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let y = 0; y < this.cells.length; y += 1) {
      const row = this.cells[y];
      for (let x = 0; x < row.length; x += 1) {
        const target = row[x];
        target.setAvailable(!!this.canMove(selectedCell, target));
      }
    }
  }

  public getCell(x: number, y: number): Cell {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let x = 0; x < 8; x += 1) {
      const currentCell = this.getCell(x, 1);
      currentCell.setFigure(new Pawn(FigureColors.BLACK, x));
    }
    for (let x = 0; x < 8; x += 1) {
      const currentCell = this.getCell(x, 6);
      currentCell.setFigure(new Pawn(FigureColors.WHITE, x));
    }
  }

  private addBishops() {
    const blackUnitCell1 = this.getCell(2, 0);
    const blackUnitCell2 = this.getCell(5, 0);
    const whiteUnitCell1 = this.getCell(2, 7);
    const whiteUnitCell2 = this.getCell(5, 7);

    blackUnitCell1.setFigure(new Bishop(FigureColors.BLACK, 1));
    blackUnitCell2.setFigure(new Bishop(FigureColors.BLACK, 2));
    whiteUnitCell1.setFigure(new Bishop(FigureColors.WHITE, 1));
    whiteUnitCell2.setFigure(new Bishop(FigureColors.WHITE, 2));
  }

  private addKnights() {
    const blackUnitCell1 = this.getCell(1, 0);
    const blackUnitCell2 = this.getCell(6, 0);
    const whiteUnitCell1 = this.getCell(1, 7);
    const whiteUnitCell2 = this.getCell(6, 7);

    blackUnitCell1.setFigure(new Knight(FigureColors.BLACK, 1));
    blackUnitCell2.setFigure(new Knight(FigureColors.BLACK, 2));
    whiteUnitCell1.setFigure(new Knight(FigureColors.WHITE, 1));
    whiteUnitCell2.setFigure(new Knight(FigureColors.WHITE, 2));
  }

  private addRooks() {
    const blackUnitCell1 = this.getCell(0, 0);
    const blackUnitCell2 = this.getCell(7, 0);
    const whiteUnitCell1 = this.getCell(0, 7);
    const whiteUnitCell2 = this.getCell(7, 7);

    blackUnitCell1.setFigure(new Rook(FigureColors.BLACK, 1));
    blackUnitCell2.setFigure(new Rook(FigureColors.BLACK, 2));
    whiteUnitCell1.setFigure(new Rook(FigureColors.WHITE, 1));
    whiteUnitCell2.setFigure(new Rook(FigureColors.WHITE, 2));
  }

  private addQueen() {
    const blackUnitCell = this.getCell(3, 0);
    const whiteUnitCell = this.getCell(3, 7);

    blackUnitCell.setFigure(new Queen(FigureColors.BLACK, 1));
    whiteUnitCell.setFigure(new Queen(FigureColors.WHITE, 2));
  }

  private addKing() {
    const blackUnitCell = this.getCell(4, 0);
    const whiteUnitCell = this.getCell(4, 7);

    blackUnitCell.setFigure(new King(FigureColors.BLACK, 1));
    whiteUnitCell.setFigure(new King(FigureColors.WHITE, 2));
  }

  public addFigures() {
    this.addPawns();
    this.addBishops();
    this.addKnights();
    this.addRooks();
    this.addQueen();
    this.addKing();
  }

  public canMove(current: Cell | null, target: Cell): boolean {
    if (target.figure?.color === current?.figure?.color) {
      return false;
    }
    if (target.figure?.name === FiguresName.KING) {
      return false;
    }
    if (!current) {
      return false;
    }

    switch (current?.figure?.name) {
      case FiguresName.QUEEN: {
        if (this.isEmptyVertical(current, target)) {
          return true;
        }
        if (this.isEmptyHorizontal(current, target)) {
          return true;
        }
        if (this.isEmptyDiagonal(current, target)) {
          return true;
        }
        return false;
      }

      case FiguresName.ROOK: {
        if (this.isEmptyVertical(current, target)) {
          return true;
        }
        if (this.isEmptyHorizontal(current, target)) {
          return true;
        }
        return false;
      }

      case FiguresName.BISHOP: {
        if (this.isEmptyDiagonal(current, target)) {
          return true;
        }
        return false;
      }

      case FiguresName.KNIGHT: {
        const dx = Math.abs(current.x - target.x);
        const dy = Math.abs(current.y - target.y);
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
      }

      case FiguresName.PAWN: {
        const direction = current?.figure?.color === FigureColors.BLACK ? 1 : -1;
        const firstStepDirection = current?.figure?.color === FigureColors.BLACK ? 2 : -2;

        if ((current.figure instanceof Pawn)
          && this.isEmptyVertical(current, target)
          && ((target.y === current.y + direction)
          || (current?.figure?.isFirstStep
            && (target.y === current.y + firstStepDirection)))
          && target.x === current.x
          && this.getCell(target.x, target.y).isEmpty()) {
          return true;
        }

        if (target.y === current.y + direction
            && (target.x === current.x + 1 || target.x === current.x - 1)
            && current.isEnemy(target)) {
          return true;
        }

        return false;
      }

      case FiguresName.KING: {
        const dx = Math.abs(current.x - target.x);
        const dy = Math.abs(current.y - target.y);
        return ((dx === 1 && dy === 0) || (dy === 1 && dx === 0) || (dx === 1 && dy === 1));
      }

      default:
        return true;
    }
  }

  public isEmptyVertical(current: Cell, target: Cell): boolean {
    if (current.x !== target.x) {
      return false;
    }

    const min = Math.min(current.y, target.y);
    const max = Math.max(current.y, target.y);

    for (let y = min + 1; y < max; y += 1) {
      if (!this.getCell(current.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  public isEmptyHorizontal(current: Cell, target: Cell): boolean {
    if (current.y !== target.y) {
      return false;
    }

    const min = Math.min(current.x, target.x);
    const max = Math.max(current.x, target.x);

    for (let x = min + 1; x < max; x += 1) {
      if (!this.getCell(x, current.y).isEmpty()) {
        return false;
      }
    }

    return true;
  }

  public isEmptyDiagonal(current: Cell, target: Cell): boolean {
    const absX = Math.abs(target.x - current.x);
    const absY = Math.abs(target.y - current.y);

    if (absX !== absY) {
      return false;
    }

    const dy = current.y < target.y ? 1 : -1;
    const dx = current.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i += 1) {
      const checkedCell = this.getCell(current.x + dx * i, current.y + dy * i);
      if (!checkedCell.isEmpty()) {
        return false;
      }
    }

    return true;
  }

  public addLostFigure(figure : Figure) {
    if (figure.color === FigureColors.BLACK) {
      this.lostBlackFigure.push(figure);
    } else {
      this.lostWhiteFigure.push(figure);
    }
  }

  public moveFigure(current: Cell, target: Cell): void {
    if (current.figure instanceof Pawn) {
      current.figure.setIsFirstStep(false);
    }

    if (target.figure) {
      this.addLostFigure(target.figure);
    }

    target.setFigure(current.figure);
    current.setFigure(null);
  }
}

export default Board;
