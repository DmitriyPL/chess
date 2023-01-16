import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-king.png';
import imgWhite from '../../assets/white-king.png';

class King extends Figure {
  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.KING;
    this.id = `${color}-${this.name}-${index}`;
  }
}

export default King;
