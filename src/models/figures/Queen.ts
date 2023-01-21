import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-queen.png';
import imgWhite from '../../assets/white-queen.png';

class Queen extends Figure {
  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.QUEEN;
    this.id = `${color}-${this.name}-${index}`;
  }
}

export default Queen;
