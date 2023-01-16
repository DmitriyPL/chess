import FiguresName from '../../enums/FiguresName';
import ImgType from '../../assets/Image';
import FigureColors from '../../enums/FigureColors';

class Figure {
  color: FigureColors;

  img: ImgType;

  name: FiguresName;

  id: string;

  constructor(color: FigureColors) {
    this.color = color;
    this.img = null;
    this.name = FiguresName.FIGURE;
    this.id = '';
  }
}

export default Figure;
