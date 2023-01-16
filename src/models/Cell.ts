import CellColors from '../enums/CellColors';
import Figure from './figures/Figure';

class Cell {
  readonly x: number;

  readonly y: number;

  readonly color: CellColors;

  figure: Figure | null;

  available: boolean;

  selected: boolean;

  id: string;

  constructor(x: number, y: number, color: CellColors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.available = false;
    this.selected = false;
    this.id = `cell-${x}-${y}`;
  }

  public setFigure(figure: Figure | null) : void {
    this.figure = figure;
  }

  public setAvailable(available: boolean) : void {
    this.available = available;
  }

  public setSelected(selected: boolean) : void {
    this.selected = selected;
  }

  public isSelected() : boolean {
    return this.selected;
  }

  public isEmpty() : boolean {
    return this.figure === null;
  }

  public isEnemy(target : Cell) : boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure?.color;
    }
    return false;
  }
}

export default Cell;
