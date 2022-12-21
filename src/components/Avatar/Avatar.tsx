import { nanoid } from 'nanoid';
import { FC } from 'react';
import { CardBoxHeight, CardBoxWidth, CardSize } from 'src/@types';

import CardBox from 'src/components/CardBox/CardBox';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';

import useGameContext from 'src/hooks/useGameContext';

type AvatarProps = {
  displayName: string;
};

const Avatar: FC<AvatarProps> = ({ displayName }) => {
  const { gameState, dispatchGame } = useGameContext();

  // const opponentCards = gameState.hands.opponent.inHand.map((card, i) => (
  //   <PlayingCard key={nanoid()} cardSize={CardSize.SM} isFaceUp={false} card={card} cardIndex={i} />
  // ));

  return (
    <div className="col-start-3 flex flex-col items-center justify-center">
      <p className="text-sm text-white">{displayName}</p>
      <div className=" mb-2 h-10 w-10 overflow-hidden rounded-full border border-white bg-slate-400">
        <img src="" alt="" />
      </div>
      {/* 
      <CardBox size={{ height: CardBoxHeight.SM, width: CardBoxWidth.SM_SIX }} maxCards={6}>
        {opponentCards}
      </CardBox> */}
    </div>
  );
};

export default Avatar;
