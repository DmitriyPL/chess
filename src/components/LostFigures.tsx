import Figure from '../models/figures/Figure';

interface LostFiguresProps {
  figures: Figure[];
}

function LostFigures({ figures } : LostFiguresProps) {
  return (
    <div className="lostFigures">
      {!figures.length && <div className="emptyFigure" />}

      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.img && <img src={figure.img} alt={figure.name} />}
        </div>
      ))}
    </div>
  );
}

export default LostFigures;
