import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardsIndex,
  CardSize,
  CardType,
  CardKey,
  GameId,
  GameReducerTypes,
  IsActive,
  Player,
  PlayerPos,
  Status,
  Suit,
  TurnType,
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
  getPlayerCardsPlayedRef,
  getCribRef,
  getPlayerRef,
  getCardTotalRef,
  getCardsPlayedRef,
  getTurnRef,
  getPlayerCards,
  getDeckRef,
  getScoreRef,
  isPegFifteen,
  isPegGo,
  isPegPairs,
  isPegRun,
  scorePairs,
  scoreFifteens,
  scoreRuns,
  scoreFlush,
  getPlayerScoreRef,
  getCardValues
} from 'src/utils/helpers';
import { nanoid } from 'nanoid';
import { FC, useEffect, useState } from 'react';
import GamesList from '../GamesList/GamesList';
import Score from '../Score/Score';
import { INITIAL_GAME_STATE } from 'src/utils/constants';

type PlayFieldProps = {
  gameId: GameId;
};

const PlayField: FC<PlayFieldProps> = ({ gameId }) => {
  const [go, setGo] = useState<boolean>(false); // FIXME: MOVE TO STATE
  const { userAuth } = useAuthContext();
  const userId = userAuth!.uid!;

  const { gameState, dispatchGame } = useGameContext();
  const { player, opponent } = getPlayerOpponent(gameState.players, userId);
  const playerHand = Object.values(gameState.playerCards[player].inHand);
  const opponentHand = Object.values(gameState.playerCards[opponent].inHand);
  const playerPlayed = Object.values(gameState.playerCards[player].played);
  const opponentPlayed = Object.values(gameState.playerCards[opponent].played);
  const renderPlayerHand = renderCards(playerHand, true, CardSize.LG, true);
  const renderOpponentHand = renderCards(opponentHand, false, CardSize.SM);
  const renderPlayerPlayed = renderCards(playerPlayed, true, CardSize.MD);
  const renderOpponentPlayed = renderCards(opponentPlayed, true, CardSize.MD);

  async function dealHandler() {
    // TODO: need deck here and add deck to state?
    // TODO: move all ref locations to helperes
    const deal = dealHands();
    const activePlayer1Ref = getActivePlayerRef(gameId, PlayerPos.P_ONE);
    const activePlayer2Ref = getActivePlayerRef(gameId, PlayerPos.P_TWO);
    const player1CardsRef = getPlayerCards(gameId, PlayerPos.P_ONE);
    const player2CardsRef = getPlayerCards(gameId, PlayerPos.P_TWO);
    const deckCutRef = getDeckRef(gameId);
    const cribRef = getCribRef(gameId);
    const turnRef = getTurnRef(gameId);
    set(activePlayer1Ref, IsActive.ACTIVE);
    set(activePlayer2Ref, IsActive.ACTIVE);
    set(player1CardsRef, { ...INITIAL_GAME_STATE.playerCards.player1, inHand: deal.hands.player1 });
    set(player2CardsRef, { ...INITIAL_GAME_STATE.playerCards.player2, inHand: deal.hands.player2 });
    set(deckCutRef, { status: Status.INVALID, card: deal.cut });
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

  function updateActivePlayer(active: 'pone' | 'toggle' | 'inactive', callback?: () => void) {
    switch (active) {
      case 'toggle': {
        update(ref(rtdb, `games/${gameId}/players`), {
          [player]: { ...gameState.players[player], activePlayer: IsActive.NOT_ACTIVE },
          [opponent]: { ...gameState.players[opponent], activePlayer: IsActive.ACTIVE }
        }).then(() => callback);
        break;
      }
      case 'pone': {
        const pone = getPone(gameState.dealer!);
        const playerRef = getPlayerRef(gameId, pone);
        update(playerRef, { ...gameState.players[opponent], activePlayer: IsActive.ACTIVE }).then(
          () => callback
        );
        break;
      }
      case 'inactive': {
        const playerRef = getPlayerRef(gameId, player);
        update(playerRef, {
          ...gameState.players[player],
          activePlayer: IsActive.NOT_ACTIVE
        }).then(() => callback);
      }
      default:
        return;
    }
  }

  function startPlay() {
    const pone = getPone(gameState.dealer!);
    const activeRef = getPlayerRef(gameId, pone);
    update(activeRef, { activePlayer: IsActive.ACTIVE }).then(() => {
      console.log('activeplayer updated');
    });
  }

  function getPone(dealer: PlayerPos): PlayerPos {
    console.log(dealer);

    return dealer === PlayerPos.P_ONE ? PlayerPos.P_TWO : PlayerPos.P_ONE;
  }

  const isPlayerActive = (player: PlayerPos): boolean =>
    gameState.players[player].activePlayer === IsActive.ACTIVE;

  function scoreHand() {
    console.log('scoring hands');
    const playerScore = scorePoints(gameState.playerCards[player].played, gameState.deckCut.card!);
    const opponentScore = scorePoints(
      gameState.playerCards[opponent].played,
      gameState.deckCut.card!
    );

    // set timer, players can okay to skip
    // set cut to invalid
    // deal hand
  }

  function scorePoints(hand: CardsIndex, cutCard: CardType) {
    const pairs = scorePairs(getCardValues(hand, CardKey.FACE) as number[], cutCard.faceValue);
    const fifteen = scoreFifteens(getCardValues(hand, CardKey.PLAY) as number[], cutCard.playValue);
    const run = scoreRuns(getCardValues(hand, CardKey.FACE) as number[], cutCard.faceValue);
    const flush = scoreFlush(getCardValues(hand, CardKey.SUIT) as Suit[], cutCard.suit);
  }

  function endHand() {
    // or interval with setState?
    const endHandTimer = setTimeout(() => {}, 20000);
  }

  function cutDeckHandler(cutStatus: Status) {
    // const pone = getPone(gameState.dealer!);
    const deckCutRef = getDeckRef(gameId);
    switch (cutStatus) {
      case Status.INVALID: {
        set(deckCutRef, { status: Status.INVALID, card: gameState.deckCut.card });
        break;
      }
      case Status.VALID: {
        set(deckCutRef, { status: Status.VALID, card: gameState.deckCut.card });
        break;
      }
      case Status.COMPLETED: {
        if (
          gameState.deckCut.status !== Status.VALID ||
          gameState.players[player].activePlayer === IsActive.NOT_ACTIVE
        )
          return console.log('cannot cut deck');
        set(deckCutRef, { status: Status.COMPLETED, card: gameState.deckCut.card });
        if (gameState.deckCut.card?.name === CardName.Jack) {
          const scoreRef = getScoreRef(gameId);
          update(scoreRef, {
            [opponent]: {
              cur: gameState.score[opponent].cur + 2,
              prev: gameState.score[opponent].cur
            }
          });
        }
        break;
      }
      default:
        return;
    }
  }

  function cardClickHandler(targetCard: CardType) {
    if (!isPlayerActive(player)) return console.log('player is not active');
    if (!isCardValid(targetCard.playValue, gameState.turnTotals.cardTotal))
      return console.log('thats over 31!!');
    if (gameState.deckCut.status === Status.VALID) return console.log('must cut deck');

    console.log(targetCard);
    if (playerHand.length > 4) {
      addCardToCrib(targetCard);
      // if 2nd card has just been moved to crib (=== 5), make player inactive
      playerHand.length === 5 && updateActivePlayer('inactive');
      if (Object.keys(gameState.crib).length === 3) {
        console.log('waiting for cut!');
        cutDeckHandler(Status.VALID);
        updateActivePlayer('pone');
      }
    }
    if (playerHand.length <= 4) {
      playCard(targetCard);
      const cardTotalRef = getCardTotalRef(gameState.gameId);
      const updatedCardTotal = updateCardTotal(
        targetCard.playValue,
        gameState.turnTotals.cardTotal
      );
      set(cardTotalRef, updatedCardTotal);
      const points = isPegPoints(targetCard, gameState.turnTotals);
      const playerScore = gameState.score[player].cur;
      const playerScoreRef = getPlayerScoreRef(gameId, player);
      points && set(playerScoreRef, { cur: playerScore + points, prev: playerScore });
      if (
        expectGo(opponentHand, updatedCardTotal) &&
        !expectGo(playerHand, updatedCardTotal, targetCard)
      ) {
        renderGo();
      } else if (
        expectGo(opponentHand, updatedCardTotal) &&
        expectGo(playerHand, updatedCardTotal, targetCard)
      ) {
        renderGo(resetCardTotal);
        updateActivePlayer('toggle');
      } else {
        updateActivePlayer('toggle');
      }
    }
    if (playerHand.length === 1 && !opponentHand.length) {
      scoreHand();
    }
  }

  function playCard(card: CardType, callback?: () => void) {
    const playerHandRef = getInHandRef(gameId, player);
    const playerCardsPlayedRef = getPlayerCardsPlayedRef(gameId, player);
    const cardsPlayedRef = getCardsPlayedRef(gameId);
    const addPlayerPlayedRef = push(playerCardsPlayedRef);
    const addPlayedRef = push(cardsPlayedRef);
    const updatedHand = filterCard(player, card.id);

    set(playerHandRef, updatedHand)
      .then(() => {
        set(addPlayerPlayedRef, card);
        set(addPlayedRef, card);
      })
      .then(callback);
  }

  function expectGo(hand: CardsIndex, cardTotal: number, cardPlayed?: CardType): boolean {
    // played card still in state, must be filtered from array
    // TODO: refactor with filterCard()
    const validCards = Object.values(hand).filter(
      (card) => card.id !== cardPlayed?.id && isCardValid(card.playValue, cardTotal)
    );
    console.log(validCards, !validCards.length);

    return !validCards.length;
  }

  function isPegPoints(card: CardType, turnTotals: TurnType) {
    const updatedCardTotal = updateCardTotal(card.playValue, gameState.turnTotals.cardTotal);
    const opponentGo = expectGo(opponentHand, updatedCardTotal);
    const playerGo = expectGo(playerHand, updatedCardTotal, card);

    const pairs = isPegPairs(card.faceValue, turnTotals.cardsPlayed);
    const fifteen = isPegFifteen(card.playValue, turnTotals.cardTotal);
    const run = isPegRun(card.faceValue, turnTotals.cardsPlayed);
    const go = opponentGo && playerGo ? isPegGo(card.playValue, turnTotals.cardTotal) : 0;
    const pegPoints = pairs + fifteen + run + go;

    return pegPoints;
  }

  function renderGo(callback?: () => void) {
    setGo(true);
    const timer = setTimeout(() => {
      setGo(false);
      if (callback) callback();
    }, 1000);
  }

  function resetCardTotal() {
    const turnRef = getTurnRef(gameState.gameId);
    set(turnRef, { cardsPlayed: {}, cardTotal: 0 });
  }

  function updateCardTotal(cardPlayValue: number, cardTotal: number): number {
    return cardPlayValue + cardTotal;
  }

  function isCardValid(cardPlayValue: number, cardTotal: number): boolean {
    return cardPlayValue + cardTotal <= 31;
  }

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    playerHand: boolean = false
  ) {
    return cards.map((card, i) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        valid={playerHand ? isCardValid(card.playValue, gameState.turnTotals.cardTotal) : undefined}
        handler={playerHand ? cardClickHandler : undefined}
      />
    ));
  }

  // TODO: Go UI for non-cardplaying player
  // FIXME: should go to a cloud trigger
  // useEffect(() => {
  //   if (gameState.players[player].activePlayer === IsActive.ACTIVE) return;
  //   if (expectGo(gameState.playerCards[player].inHand, gameState.turn.cardTotal)) renderGo();
  // }, [gameState.turn.cardTotal]);

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
        <Deck cutDeck={gameState.deckCut} callback={cutDeckHandler} />
        <div>
          count: {gameState.turnTotals.cardTotal} {go && 'GO!!'}
        </div>
        <div>{gameState.players[player].activePlayer}</div>
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
      </div>
      <div className="flex flex-col gap-4">
        <Score
          displayName={gameState.players[opponent].displayName}
          curScore={gameState.score[opponent].cur}
          prevScore={gameState.score[opponent].prev}
        />
        <Board />
        <Button handler={dealHandler}>Deal</Button>
        <Score
          displayName={gameState.players[player].displayName}
          curScore={gameState.score[player].cur}
          prevScore={gameState.score[player].prev}
        />
      </div>
    </div>
  );
};

export default PlayField;
