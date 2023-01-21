import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-knight.png';
import imgWhite from '../../assets/white-knight.png';

class Knight extends Figure {
  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.KNIGHT;
    this.id = `${color}-${this.name}-${index}`;
  }
}

export default Knight;
