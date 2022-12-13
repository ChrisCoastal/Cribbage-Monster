import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardSize,
  CardType,
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
import { nanoid } from 'nanoid';

const PlayField = () => {
  const { gameState, dispatchGame } = useGameContext();

  function dealHandler() {
    const hands = dealHands();
    dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
    // const gameRef = doc(db, 'game', gameState.gameId);
    // updateDoc(gameRef, data); //TODO:)
  }

  function cardClickHandler(card: CardType) {
    console.log(card);
    dispatchGame({ type: GameReducerTypes.PLAY_CARD, payload: card });
  }

  const playerHand = renderCards(gameState.hands.player.inHand, true, CardSize.LG);
  const opponentHand = renderCards(gameState.hands.opponent.inHand, false, CardSize.SM);
  const playerPlayed = renderCards(gameState.hands.player.played, true, CardSize.MD);
  const opponentPlayed = renderCards(gameState.hands.opponent.played, true, CardSize.MD);

  function renderCards(hand: CardType[], faceUp: boolean, cardSize: CardSize) {
    return hand.map((card, i) => (
      <PlayingCard
        key={nanoid()}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        handler={cardClickHandler}
      />
    ));
  }

  return (
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
          {playerPlayed}
        </CardBox>

        <CardBox
          size={{ height: CardBoxHeight.LG, width: CardBoxWidth.LG_SIX }}
          maxCards={6}
          placement="self-center place-self-center">
          {playerHand}
        </CardBox>

        {/* <Cards cardHeight="h-40" isFaceUp={true} cards={gameState.hands.player.inHand} /> */}
      </div>
      <div>
        <Board />
        <Button handler={dealHandler}>Deal</Button>
      </div>
    </div>
  );
};

export default PlayField;
