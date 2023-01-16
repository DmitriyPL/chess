import {
  useEffect, useRef, useState,
} from 'react';
import FigureColors from '../enums/FigureColors';
import Player from '../models/Player';

interface TimerProps {
  currentPlayer : Player | null;
  restart: () => void;
}

function Timer({ currentPlayer, restart } : TimerProps) {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const decrementBlackTimer = () => {
    setBlackTime((prev) => prev - 1);
  };

  const decrementWhiteTimer = () => {
    setWhiteTime((prev) => prev - 1);
  };

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const callback = currentPlayer?.color === FigureColors.WHITE
      ? decrementWhiteTimer
      : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }, [currentPlayer]);

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div className="timer">
      <div>
        <button
          className="timer__button"
          type="button"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
      <h2 className={currentPlayer?.color === FigureColors.BLACK ? 'currentTimer' : ''}>
        Black:&nbsp;
        {blackTime}
      </h2>
      <h2 className={currentPlayer?.color === FigureColors.WHITE ? 'currentTimer' : ''}>
        White:&nbsp;
        {whiteTime}
      </h2>
    </div>
  );
}

export default Timer;
