import { useEffect, useState } from 'react';

const INITIAL_MARIO_VERTICAL_POSITION_DESKTOP = 91;
const INITIAL_MARIO_VERTICAL_POSITION_MOBILE = 48;

export function useMarioPosition() {
  const [marioPosition, setMarioPosition] = useState<number>(0);
  const [marioVerticalPosition, setMarioVerticalPosition] = useState<number>(
    INITIAL_MARIO_VERTICAL_POSITION_DESKTOP
  );
  const [initialMarioVerticalPosition, setInitialMarioVerticalPosition] =
    useState<number>(INITIAL_MARIO_VERTICAL_POSITION_DESKTOP);
  const [runningSprite, setRunningSprite] = useState<number>(1);

  useEffect(() => {
    const updateMarioPosition = () => {
      const newPosition =
        window.innerWidth < 640
          ? INITIAL_MARIO_VERTICAL_POSITION_MOBILE
          : INITIAL_MARIO_VERTICAL_POSITION_DESKTOP;
      setInitialMarioVerticalPosition(newPosition);
      setMarioVerticalPosition(newPosition);
    };

    updateMarioPosition();
    window.addEventListener('resize', updateMarioPosition);
    return () => window.removeEventListener('resize', updateMarioPosition);
  }, []);

  return {
    marioPosition,
    setMarioPosition,
    marioVerticalPosition,
    setMarioVerticalPosition,
    initialMarioVerticalPosition,
    runningSprite,
    setRunningSprite,
  };
}
