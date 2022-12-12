import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardSize,
  GameReducerTypes,
  Suit
} from 'src/@types';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/firestore.config';

import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import Cards from 'src/components/Cards/Cards';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import Deck from 'src/components/Deck/Deck';
import CardBox from 'src/components/CardBox/CardBox';
import Button from 'src/components/UI/Button';
import useGameContext from 'src/hooks/useGameContext';
import { dealHands } from 'src/utils/helpers';

const PlayField = () => {
  const { gameState, dispatchGame } = useGameContext();

  // function dealHandler() {
  //   const hands = dealHands();
  //   dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
  //   const gameRef = doc(db, 'game', gameState.gameId);
  //   updateDoc(gameRef, data); //TODO:)
  // }

  return (
    // <div className="relative grid h-screen grid-cols-[1fr,_1fr,_2fr,_2fr] grid-rows-[auto,_1fr,_1fr,_1fr,_2fr] items-center justify-items-center gap-2 py-12 px-4">
    <div className="relative grid h-full grid-cols-[4fr,_1fr] items-center justify-items-center gap-2 py-12 px-4">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Avatar />
          <CardBox
            size={{ height: CardBoxHeight.SM, width: CardBoxWidth.SM_SIX }}
            maxCards={6}></CardBox>
        </div>

        <div>
          <CardBox
            size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR }}
            maxCards={4}
            placement="self-center place-self-center"></CardBox>
        </div>

        <Deck />

        <CardBox
          size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR }}
          maxCards={4}
          placement="self-center place-self-center">
          <PlayingCard
            cardSize={CardSize.MD}
            cardIndex={0}
            isFaceUp={true}
            card={{ id: 0, suit: Suit.Spades, name: CardName.Ace, faceValue: 1 }}></PlayingCard>
        </CardBox>

        <Cards cardHeight="h-40" isFaceUp={true} />
      </div>
      <div>
        <Board />
        <Button handler={() => console.log('dealHandler')}>Deal</Button>
      </div>
    </div>
  );
};

export default PlayField;
