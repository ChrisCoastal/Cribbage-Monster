import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardSize,
  CardType,
  GameId,
  GameReducerTypes,
  IsActive,
  Player,
  PlayerPos,
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
  const { player, opponent } = getPlayerOpponent(gameState.players, userId);
  console.log(player, opponent);

  const playerHand = Object.values(gameState.playerCards[player].inHand);
  const opponentHand = Object.values(gameState.playerCards[opponent].inHand);
  const playerPlayed = Object.values(gameState.playerCards[player].played);
  const opponentPlayed = Object.values(gameState.playerCards[opponent].played);
  const renderPlayerHand = renderCards(playerHand, true, CardSize.LG);
  const renderOpponentHand = renderCards(opponentHand, false, CardSize.SM);
  const renderPlayerPlayed = renderCards(playerPlayed, true, CardSize.MD);
  const renderOpponentPlayed = renderCards(opponentPlayed, true, CardSize.MD);

  async function dealHandler() {
    // TODO: need deck here and add deck to state
    const hands = dealHands();
    const player1ActiveRef = ref(rtdb, `games/${gameId}/players/player1/activePlayer`);
    const player2ActiveRef = ref(rtdb, `games/${gameId}/players/player2/activePlayer`);
    const player1HandRef = ref(rtdb, `games/${gameId}/playerCards/player1`);
    const player2HandRef = ref(rtdb, `games/${gameId}/playerCards/player2`);
    const cribRef = ref(rtdb, `games/${gameId}/crib`);
    set(player1ActiveRef, IsActive.ACTIVE);
    set(player2ActiveRef, IsActive.ACTIVE);
    set(player1HandRef, { inHand: hands.player1, played: [] });
    set(player2HandRef, { inHand: hands.player2, played: [] });
    set(cribRef, null);
    // dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
    // const gameRef = doc(db, 'game', gameState.gameId);
    // updateDoc(gameRef, data); //TODO:)
  }

  function addCardToCrib(card: CardType): void {
    const playerHandRef = getInHandRef(gameId, player);
    const cribRef = getCribRef(gameId);
    const addCardToCribRef = push(cribRef);
    // const cardIndex = gameState.playerCards[player].inHand.findIndex((card) => card.id === card.id);
    // const playedCardRef = ref(rtdb, `games/${gameId}/playerCards/${player}/inHand/${cardIndex}`);
    //FIXME: does this work? or update?
    // set(addCardToCribRef, card).then(() => remove(playedCardRef));
    const updatedHand = filterCard(player, card.id);
    set(playerHandRef, updatedHand).then(() => {
      set(addCardToCribRef, card);
    });
  }

  function filterCard(playerPos: PlayerPos, cardId: number): CardType[] {
    return playerHand.filter((card) => card.id !== cardId);
  }

  function getCardsPlayedRef(gameId: GameId, player: PlayerPos) {
    return ref(rtdb, `games/${gameId}/playerCards/${player}/played`);
  }

  function getInHandRef(gameId: GameId, player: PlayerPos) {
    return ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);
  }

  function getCribRef(gameId: GameId) {
    return ref(rtdb, `games/${gameId}/crib`);
  }

  function playCard(card: CardType) {
    const playerHandRef = getInHandRef(gameId, player);
    const cardsPlayedRef = getCardsPlayedRef(gameId, player);
    const addCardToPlayedRef = push(cardsPlayedRef);
    const updatedHand = filterCard(player, card.id);

    set(playerHandRef, updatedHand).then(() => {
      set(addCardToPlayedRef, card);
    });
  }

  function cardClickHandler(targetCard: CardType) {
    if (gameState.players[player].activePlayer === IsActive.NOT_ACTIVE)
      return console.log('player is not active');

    console.log(targetCard);
    if (playerHand.length > 4) {
      addCardToCrib(targetCard);
    }
    if (playerHand.length <= 4) {
      playCard(targetCard);
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

  function renderCards(cards: CardType[] = [], faceUp: boolean, cardSize: CardSize) {
    return cards.map((card, i, arr) => (
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
    if (!gameState.crib) return;
    if (Object.keys(gameState.crib).length === 4) {
      const dealer =
        gameState.players.player1.role === PlayerRole.DEALER ? PlayerPos.P_ONE : PlayerPos.P_TWO;
      const dealerRef = ref(rtdb, `games/${gameId}/players/${dealer}`);
      update(dealerRef, { activePlayer: IsActive.NOT_ACTIVE }).then(() => {
        console.log('activeplayer updated');
      });
    }
  }, [gameState.crib]);

  useEffect(() => {
    console.log('active?', gameState.players[player].activePlayer, player);
  }, [gameState.players[player].activePlayer]);

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
            placement="self-center place-self-center">
            {renderOpponentPlayed}
          </CardBox>
        </div>

        <Deck />

        {[gameState.players[player].activePlayer]}
        <CardBox
          size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR }}
          maxCards={4}
          placement="self-center place-self-center">
          {renderPlayerPlayed}
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
