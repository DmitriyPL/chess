import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-rook.png';
import imgWhite from '../../assets/white-rook.png';

class Rook extends Figure {
  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.ROOK;
    this.id = `${color}-${this.name}-${index}`;
  }
}

export default Rook;
