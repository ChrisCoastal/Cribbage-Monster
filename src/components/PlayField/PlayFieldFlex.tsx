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
import {
  dealHands,
  getActivePlayerRef,
  getPlayerOpponent,
  getInHandRef,
  getCardsPlayedRef,
  getCribRef,
  getDealerRef
} from 'src/utils/helpers';
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
  const renderPlayerHand = renderCards(playerHand, true, CardSize.LG, true);
  const renderOpponentHand = renderCards(opponentHand, false, CardSize.SM);
  const renderPlayerPlayed = renderCards(playerPlayed, true, CardSize.MD);
  const renderOpponentPlayed = renderCards(opponentPlayed, true, CardSize.MD);

  async function dealHandler() {
    // TODO: need deck here and add deck to state
    const hands = dealHands();
    const activePlayer1Ref = ref(rtdb, `games/${gameId}/players/player1/activePlayer`);
    const activePlayer2Ref = ref(rtdb, `games/${gameId}/players/player2/activePlayer`);
    const player1HandRef = ref(rtdb, `games/${gameId}/playerCards/player1`);
    const player2HandRef = ref(rtdb, `games/${gameId}/playerCards/player2`);
    const turnRef = ref(rtdb, `games/${gameId}/turn`);
    const cribRef = ref(rtdb, `games/${gameId}/crib`);
    set(activePlayer1Ref, IsActive.ACTIVE);
    set(activePlayer2Ref, IsActive.ACTIVE);
    set(player1HandRef, { inHand: hands.player1, played: [] });
    set(player2HandRef, { inHand: hands.player2, played: [] });
    set(cribRef, null);
    set(turnRef, { cardsPlayed: null, cardTotal: 0 });
    // dispatchGame({ type: GameReducerTypes.DEAL, payload: hands });
    // const gameRef = doc(db, 'game', gameState.gameId);
    // updateDoc(gameRef, data); //TODO:)
  }

  function filterCard(playerPos: PlayerPos, cardId: number): CardType[] {
    return playerHand.filter((card) => card.id !== cardId);
  }

  function addCardToCrib(card: CardType, callback?: () => void): void {
    const playerHandRef = getInHandRef(gameId, player);
    const cribRef = getCribRef(gameId);
    const addCardToCribRef = push(cribRef);
    // const cardIndex = gameState.playerCards[player].inHand.findIndex((card) => card.id === card.id);
    // const playedCardRef = ref(rtdb, `games/${gameId}/playerCards/${player}/inHand/${cardIndex}`);
    //FIXME: does this work? or update?
    // set(addCardToCribRef, card).then(() => remove(playedCardRef));
    const updatedHand = filterCard(player, card.id);
    set(playerHandRef, updatedHand)
      .then(() => {
        set(addCardToCribRef, card);
      })
      .then(callback);
  }

  // function getCardsPlayedRef(gameId: GameId, player: PlayerPos) {
  //   return ref(rtdb, `games/${gameId}/playerCards/${player}/played`);
  // }

  // function getInHandRef(gameId: GameId, player: PlayerPos) {
  //   return ref(rtdb, `games/${gameId}/playerCards/${player}/inHand`);
  // }

  // function getCribRef(gameId: GameId) {
  //   return ref(rtdb, `games/${gameId}/crib`);
  // }
  function checkPlayPhase() {
    //
  }

  function playCard(card: CardType, callback?: () => void) {
    const playerHandRef = getInHandRef(gameId, player);
    const cardsPlayedRef = getCardsPlayedRef(gameId, player);
    const addCardToPlayedRef = push(cardsPlayedRef);
    const updatedHand = filterCard(player, card.id);

    set(playerHandRef, updatedHand)
      .then(() => {
        set(addCardToPlayedRef, card);
      })
      .then(callback);
  }

  // function updateActivePlayer(toggle?: 'toggle') {
  //   toggle
  //     ? update(ref(rtdb, `games/${gameId}/players`), {
  //         [player]: { ...gameState.players[player], activePlayer: IsActive.NOT_ACTIVE },
  //         [opponent]: { ...gameState.players[opponent], activePlayer: IsActive.ACTIVE }
  //       })
  //     : update(ref(rtdb, `games/${gameId}/players/${player}`), {
  //         ...gameState.players[player],
  //         activePlayer: IsActive.NOT_ACTIVE
  //       });
  // }

  function startCardPlay() {
    const pone = gameState.dealer === PlayerPos.P_ONE ? PlayerPos.P_TWO : PlayerPos.P_ONE;
    const activeRef = ref(rtdb, `games/${gameId}/players/${pone}`);
    update(activeRef, { activePlayer: IsActive.ACTIVE }).then(() => {
      console.log('activeplayer updated');
    });
  }

  const isPlayerActive = (player: PlayerPos): boolean =>
    gameState.players[player].activePlayer === IsActive.ACTIVE;

  function scoreHand() {
    console.log('scoring hand');

    //
    // set timer, players can okay to skip
    // deal hand
  }

  function cardClickHandler(targetCard: CardType) {
    if (!isPlayerActive(player)) return console.log('player is not active');
    if (!isCardValid(targetCard.playValue, gameState.turn.cardTotal))
      return console.log('thats over 31!!');

    console.log(targetCard);
    if (playerHand.length > 4) {
      addCardToCrib(targetCard);
      // if 2nd card has just been moved to crib (=== 5), make player inactive
      playerHand.length === 5 &&
        update(ref(rtdb, `games/${gameId}/players/${player}`), {
          ...gameState.players[player],
          activePlayer: IsActive.NOT_ACTIVE
        }).then(() => {
          Object.keys(gameState.crib).length === 3 && startCardPlay();
        });
    }
    if (playerHand.length <= 4) {
      playCard(targetCard);
      update(ref(rtdb, `games/${gameId}/players`), {
        [player]: { ...gameState.players[player], activePlayer: IsActive.NOT_ACTIVE },
        [opponent]: { ...gameState.players[opponent], activePlayer: IsActive.ACTIVE }
      });
      const cardTotalRef = ref(rtdb, `games/${gameId}/turn/cardTotal`);
      set(cardTotalRef, updateCardTotal(targetCard.playValue, gameState.turn.cardTotal));
    }
    if (!playerHand.length && !opponentHand.length) {
      scoreHand();
    }
  }

  function updateCardTotal(cardPlayValue: number, cardTotal: number): number {
    return cardPlayValue + cardTotal;
  }

  function isCardValid(cardPlayValue: number, turnCardTotal: number): boolean {
    const valid = cardPlayValue + turnCardTotal <= 31;
    return valid;
  }

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    playerHand: boolean = false
  ) {
    return cards.map((card, i, arr) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        valid={playerHand ? isCardValid(card.playValue, gameState.turn.cardTotal) : undefined}
        handler={playerHand ? cardClickHandler : undefined}
      />
    ));
  }

  // useEffect(() => {
  //   const pone = gameState.dealer === PlayerPos.P_ONE ? PlayerPos.P_TWO : PlayerPos.P_ONE;
  //   if (
  //     Object.keys(gameState.crib).length === 4 &&
  //     !Object.keys(gameState.playerCards[pone].played).length
  //   ) {
  //     // const dealerRef = ref(rtdb, `games/${gameId}/dealer`);
  //     const activeRef = ref(rtdb, `games/${gameId}/players/${pone}`);
  //     update(activeRef, { activePlayer: IsActive.ACTIVE }).then(() => {
  //       console.log('activeplayer updated');
  //     });
  //   }
  // }, [gameState.crib]);

  return (
    <div className="relative grid h-full grid-cols-[4fr,_1fr] items-center justify-items-center gap-2 py-12 px-4">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Avatar />
          <CardBox size={{ height: CardBoxHeight.SM, width: CardBoxWidth.SM_SIX }} maxCards={6}>
            {renderOpponentHand}
          </CardBox>
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
