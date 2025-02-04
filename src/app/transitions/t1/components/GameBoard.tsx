import { EmptyState } from '@/components/EmptyState';
import { useTranslations } from '@/hooks/useTranslations';
import Image from 'next/image';

interface GameBoardProps {
  marioPosition: number;
  marioVerticalPosition: number;
  runningSprite: number;
  jumpedActions: Array<{ position: number; action: string }>;
  boxHeight: number;
  finishLine: number;
  gameStatus: 'playing' | 'won' | 'lost';
}

export function GameBoard({
  marioPosition,
  marioVerticalPosition,
  runningSprite,
  jumpedActions,
  boxHeight,
  finishLine,
  gameStatus,
}: GameBoardProps) {
  const { translations } = useTranslations('transitions');
  if (!translations) return <EmptyState />;

  const actionImages = {
    removeGoggles: {
      src: '/images/remove-goggles.jpg',
      alt: translations?.t1Steps.removeGoggles,
    },
    putHelmet: {
      src: '/images/put-helmet.jpg',
      alt: translations?.t1Steps.putHelmet,
    },
    putBib: { src: '/images/put-bib.png', alt: translations?.t1Steps.putBib },
    grabBike: {
      src: '/images/grab-bike2.jpg',
      alt: translations?.t1Steps.grabBike,
    },
  };

  return (
    <div className="w-full max-w-[1200px] h-[22rem] sm:h-[42rem] bg-[url(/images/mario-background-large.jpg)] bg-bottom bg-cover relative mb-8">
      {jumpedActions.map(({ position, action }, index) => {
        const image = actionImages[action as keyof typeof actionImages];
        return (
          <div
            key={index}
            className="absolute transition-opacity duration-500"
            style={{
              left: `${position}%`,
              bottom: `${boxHeight}px`,
            }}
          >
            <Image src={image.src} alt={image.alt} width={60} height={660} />
          </div>
        );
      })}

      <div
        className="absolute transition-transform duration-500 ease-in-out"
        style={{
          left: `${marioPosition}%`,
          bottom: `${marioVerticalPosition}px`,
        }}
      >
        <Image
          src={`/images/mario-running${runningSprite}.png`}
          alt="Mario"
          width={50}
          height={50}
        />
      </div>

      <div
        className="absolute bottom-0 right-0 h-full w-2 bg-red-600"
        style={{ left: `${finishLine}%` }}
      >
        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-red-600 font-bold">
          {translations.finish}
        </span>
      </div>

      {gameStatus === 'won' && (
        <div className="text-4xl flex justify-center items-center bg-white h-20 font-bold text-green-600 mb-4">
          {translations.win}
        </div>
      )}
      {gameStatus === 'lost' && (
        <div className="text-4xl flex justify-center items-center bg-white h-20 font-bold text-red-600 mb-4">
          {translations.lose}
        </div>
      )}
    </div>
  );
}
