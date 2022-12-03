import { nanoid } from 'nanoid';
import { CardBoxHeight, CardBoxWidth, CardSize } from 'src/@types';

import CardBox from 'src/components/CardBox/CardBox';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';

import useGameContext from 'src/hooks/useGameContext';

const Avatar = () => {
  const { gameState, dispatchGame } = useGameContext();

  const opponentCards = gameState.hands.opponent.inHand.map((card, i) => (
    <PlayingCard key={nanoid()} cardSize={CardSize.SM} isFaceUp={false} card={card} cardIndex={i} />
  ));

  return (
    <div className="flex flex-col items-center col-start-3">
      <p className="text-sm">opponent</p>
      <div className=" w-10 h-10 mb-2 bg-slate-400 rounded-full border border-black overflow-hidden">
        <img src="" alt="" />
      </div>

      <CardBox size={{ height: CardBoxHeight.SM, width: CardBoxWidth.SM_SIX }} maxCards={6}>
        {opponentCards}
      </CardBox>
    </div>
  );
};

export default Avatar;
