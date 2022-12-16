import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardSize,
  CardType,
  GameId,
  GameReducerTypes,
  Player,
  PlayerTitle,
  Suit,
  UserId
} from 'src/@types';

import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { rtdb } from 'src/firestore.config';
import { set, ref } from 'firebase/database';

import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import Cards from 'src/components/Cards/Cards';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import Deck from 'src/components/Deck/Deck';
import CardBox from 'src/components/CardBox/CardBox';
import Button from 'src/components/UI/Button';
import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { dealHands } from 'src/utils/helpers';
import { nanoid } from 'nanoid';
import { FC, useEffect } from 'react';

type PlayFieldProps = {
  gameId: GameId;
};

const PlayField: FC<PlayFieldProps> = ({ gameId }) => {
  const { userAuth } = useAuthContext();
  const { gameState, dispatchGame } = useGameContext();

  const userId = userAuth?.uid;

  // const { player, opponent } = getPlayers(gameState.players, userId);
  // const playerHand = renderCards(gameState.playerCards[player].inHand, true, CardSize.LG);
  // const opponentHand = renderCards(gameState.playerCards[opponent].inHand, false, CardSize.SM);
  // const playerPlayed = renderCards(gameState.playerCards[player].played, true, CardSize.MD);
  // const opponentPlayed = renderCards(gameState.playerCards[opponent].played, true, CardSize.MD);

  function dealHandler() {
    const hands = dealHands();
    const player1HandRef = ref(rtdb, `games/${gameId}/playerCards/player1/inHand`);
    const player2HandRef = ref(rtdb, `games/${gameId}/playerCards/player2/inHand`);
    set(player1HandRef, hands.player1);
    set(player2HandRef, hands.player2);
    // dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
    // const gameRef = doc(db, 'game', gameState.gameId);
    // updateDoc(gameRef, data); //TODO:)
  }

  function cardClickHandler(card: CardType) {
    console.log(card);
    dispatchGame({ type: GameReducerTypes.PLAY_CARD, payload: card });
  }

  function getPlayers(
    players: {
      player1: Player;
      player2: Player;
    },
    userId: string
  ) {
    console.log(userId);
    const player = players.player1.id === userId ? PlayerTitle.P_ONE : PlayerTitle.P_TWO;
    const opponent = player === PlayerTitle.P_ONE ? PlayerTitle.P_TWO : PlayerTitle.P_ONE;

    return { player, opponent };
  }

  // useEffect(() => {
  // if (gameState.activePlayer === true) {
  // const gameRef = doc(db, 'game', gameState.gameId);
  // const collectionSnapshot = onSnapshot(gameRef, (snapshot) => {
  //   const cardsPlayed: CardType[] = [];
  //   snapshot.docs.forEach((doc: any) => {
  //     cardsPlayed.push({ ...doc.data(), id: doc.id });
  //   });
  //   console.log('snapshot', cardsPlayed);
  // });
  // return collectionSnapshot;
  // }
  // }, [gameState.activePlayer]);

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
          {/* {playerPlayed} */}
        </CardBox>

        <CardBox
          size={{ height: CardBoxHeight.LG, width: CardBoxWidth.LG_SIX }}
          maxCards={6}
          placement="self-center place-self-center">
          {/* {playerHand} */}
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
