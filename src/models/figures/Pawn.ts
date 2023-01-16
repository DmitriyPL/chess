import FiguresName from '../../enums/FiguresName';
import FigureColors from '../../enums/FigureColors';
import Figure from './Figure';

import imgBlack from '../../assets/black-pawn.png';
import imgWhite from '../../assets/white-pawn.png';

class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: FigureColors, index: number) {
    super(color);

    this.img = color === FigureColors.BLACK ? imgBlack : imgWhite;
    this.name = FiguresName.PAWN;
    this.id = `${color}-${this.name}-${index}`;
  }

  setIsFirstStep(flag : boolean) {
    this.isFirstStep = flag;
  }

  getIsFirstStep() : boolean {
    return this.isFirstStep;
  }
}

export default Pawn;
