import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardSize,
  CardType,
  GameId,
  GameReducerTypes,
  Player,
  PlayerNum,
  PlayerRole,
  Suit,
  UserId
} from 'src/@types';

import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { rtdb } from 'src/firestore.config';
import { set, ref, push, update, remove } from 'firebase/database';

import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import Cards from 'src/components/Cards/Cards';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import Deck from 'src/components/Deck/Deck';
import CardBox from 'src/components/CardBox/CardBox';
import Button from 'src/components/UI/Button';
import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { dealHands, getPlayerOpponent } from 'src/utils/helpers';
import { nanoid } from 'nanoid';
import { FC, useEffect } from 'react';

type PlayFieldProps = {
  gameId: GameId;
};

const PlayField: FC<PlayFieldProps> = ({ gameId }) => {
  const { userAuth } = useAuthContext();
  const userId = userAuth!.uid!;

  const { gameState, dispatchGame } = useGameContext();
  const { crib, playerCards } = gameState;
  const { player, opponent } = getPlayerOpponent(gameState.players, userId);
  console.log(player, opponent);

  const playerHand = gameState.playerCards[player]?.inHand;
  const renderPlayerHand = renderCards(gameState.playerCards[player]?.inHand, true, CardSize.LG);
  const opponentHand = gameState.playerCards[opponent]?.inHand;
  const renderOpponentHand = renderCards(opponentHand, false, CardSize.SM);
  // const renderPlayerPlayed = renderCards(gameState.playerCards[player].played, true, CardSize.MD);
  // const renderOpponentPlayed = renderCards(gameState.playerCards[opponent].played, true, CardSize.MD);

  async function dealHandler() {
    const hands = dealHands();
    const player1ActiveRef = ref(rtdb, `games/${gameId}/players/player1/activePlayer`);
    const player2ActiveRef = ref(rtdb, `games/${gameId}/players/player2/activePlayer`);
    const player1HandRef = ref(rtdb, `games/${gameId}/playerCards/player1/inHand`);
    const player2HandRef = ref(rtdb, `games/${gameId}/playerCards/player2/inHand`);
    set(player1ActiveRef, true);
    set(player2ActiveRef, true);
    set(player1HandRef, hands.player1);
    set(player2HandRef, hands.player2);
    // dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
    // const gameRef = doc(db, 'game', gameState.gameId);
    // updateDoc(gameRef, data); //TODO:)
  }

  function cardClickHandler(targetCard: CardType) {
    console.log(targetCard);
    if (playerHand.length > 4) {
      const playerHandRef = ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);
      const cribRef = ref(rtdb, `games/${gameId}/crib`);
      const addCardToCribRef = push(cribRef);
      const cardIndex = gameState.playerCards[player].inHand.findIndex(
        (card) => card.id === targetCard.id
      );
      const playedCardRef = ref(rtdb, `games/${gameId}/playerCards/${player}/inHand/${cardIndex}`);
      //FIXME: does this work? or update?
      // set(addCardToCribRef, targetCard).then(() => remove(playedCardRef));
      set(addCardToCribRef, targetCard).then(() => {
        const updatedHand = gameState.playerCards[player].inHand.filter(
          (card) => card.id !== targetCard.id
        );
        set(playerHandRef, updatedHand);
      });
      // const updatedHand = gameState.playerCards[player].inHand.filter(
      //   (card) => card.id !== targetCard.id
      // );
      // update(playerHandRef, updatedHand);
    }
    if (playerHand.length <= 4) {
    }
    if (playerHand.length <= 4) {
      const playerHandRef = ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);
      const player1PlayedRef = ref(rtdb, `games/${gameId}/playerCards/${player}/played`);
    }

    // dispatchGame({ type: GameReducerTypes.PLAY_CARD, payload: card });
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

  function renderCards(hand: CardType[] = [], faceUp: boolean, cardSize: CardSize) {
    return hand.map((card, i, arr) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        handler={cardClickHandler}
      />
    ));
  }

  useEffect(() => {
    if (!crib) return;
    if (crib.length === 4) {
      const pone =
        gameState.players.player1.role === PlayerRole.PONE ? PlayerNum.P_ONE : PlayerNum.P_TWO;
      const poneActiveRef = ref(rtdb, `games/${gameId}/players/${pone}/activePlayer`);
      update(poneActiveRef, { activePlayer: false });
    }
  }, [crib]);

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
          {renderPlayerHand}
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
