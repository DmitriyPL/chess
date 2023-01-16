import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-bishop.png';
import imgWhite from '../../assets/white-bishop.png';

class Bishop extends Figure {
  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.BISHOP;
    this.id = `${color}-${this.name}-${index}`;
  }
}

export default Bishop;
