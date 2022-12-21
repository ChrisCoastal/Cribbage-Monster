import {
  CardBoxHeight,
  CardBoxWidth,
  CardName,
  CardOverlap,
  CardsIndex,
  CardSize,
  CardType,
  GameId,
  IsActive,
  PlayerPos,
  Status,
  TurnType
} from 'src/@types';

import { rtdb } from 'src/firestore.config';
import { set, ref, push, update, remove } from 'firebase/database';

import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import Deck from 'src/components/Deck/Deck';
import CardBox from 'src/components/CardBox/CardBox';
import Button from 'src/components/UI/Button';
import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import {
  dealHands,
  filterCard,
  getActivePlayerRef,
  getPlayerOpponent,
  getInHandRef,
  getPlayerCardsPlayedRef,
  getCribRef,
  getPlayerRef,
  getPlayersRef,
  getCardTotalRef,
  getCardsPlayedRef,
  getTurnRef,
  getPlayerCards,
  getDeckRef,
  getScoreRef,
  isCardValid,
  isPegFifteen,
  isPegGo,
  isPegPairs,
  isPegRun,
  isPlayerActive,
  scorePairs,
  scoreFifteens,
  scoreRuns,
  scoreFlush,
  getPlayerScoreRef,
  getPone,
  updateCardTotal,
  getDealerRef,
  getGameRef
} from 'src/utils/helpers';
import { FC, useEffect, useState } from 'react';
import Score from '../Score/Score';
import { INITIAL_GAME_STATE } from 'src/utils/constants';

type PlayFieldProps = {
  gameId: GameId;
};

const PlayField: FC<PlayFieldProps> = ({ gameId }) => {
  const [go, setGo] = useState<boolean>(false);
  const [tally, setTally] = useState<boolean>(false);
  const [countDown, setCountDown] = useState<number | null>(null);

  const { userAuth } = useAuthContext();
  const userId = userAuth!.uid!;

  const { gameState } = useGameContext();
  const { player, opponent } = getPlayerOpponent(gameState.players, userId);
  const playerHand = Object.values(gameState.playerCards[player].inHand);
  const opponentHand = Object.values(gameState.playerCards[opponent].inHand);
  const playerPlayed = Object.values(gameState.playerCards[player].played);
  const opponentPlayed = Object.values(gameState.playerCards[opponent].played);
  const renderPlayerHand = renderCards(playerHand, true, CardSize.LG, CardOverlap.TWO_THIRDS, true);
  const renderOpponentHand = renderCards(opponentHand, false, CardSize.SM, CardOverlap.TWO_THIRDS);
  const renderPlayerPlayed = renderCards(playerPlayed, true, CardSize.MD, CardOverlap.HALF);
  const renderOpponentPlayed = renderCards(opponentPlayed, true, CardSize.MD, CardOverlap.HALF);

  //TODO: should all refs be moved into an object?

  async function dealHandler() {
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
  }

  function addCardToCrib(card: CardType, callback?: () => void): void {
    const playerHandRef = getInHandRef(gameId, player);
    const cribRef = getCribRef(gameId);
    const pushCribRef = push(cribRef);
    const updatedHand = filterCard(gameState.playerCards[player].inHand, card.id);
    set(playerHandRef, updatedHand)
      .then(() => {
        set(pushCribRef, card);
      })
      .then(callback);
  }

  function updateActivePlayer(active: 'pone' | 'toggle' | 'inactive', callback?: () => void) {
    switch (active) {
      case 'toggle': {
        const playersRef = getPlayersRef(gameId);
        update(playersRef, {
          [player]: { ...gameState.players[player], activePlayer: IsActive.NOT_ACTIVE },
          [opponent]: { ...gameState.players[opponent], activePlayer: IsActive.ACTIVE }
        }).then(() => callback);
        break;
      }
      case 'pone': {
        const pone = getPone(gameState.dealer);
        const playerRef = getPlayerRef(gameId, pone);
        update(playerRef, { ...gameState.players[pone], activePlayer: IsActive.ACTIVE }).then(
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

  function scoreHand() {
    const scoreRef = getScoreRef(gameId);
    const playerHandScore = isScorePoints(
      gameState.playerCards[player].played,
      gameState.deckCut.card!
    );
    const opponentHandScore = isScorePoints(
      gameState.playerCards[opponent].played,
      gameState.deckCut.card!
    );
    const cribScore = isScorePoints(gameState.crib, gameState.deckCut.card!);

    const playerScore = player === gameState.dealer ? playerHandScore + cribScore : playerHandScore;
    const opponentScore =
      opponent === gameState.dealer ? opponentHandScore + cribScore : opponentHandScore;

    const updatedScore = {
      [player]: {
        cur: gameState.score[player].cur + playerScore,
        prev: gameState.score[player].cur
      },
      [opponent]: {
        cur: gameState.score[opponent].cur + opponentScore,
        prev: gameState.score[opponent].cur
      }
    };

    player === PlayerPos.P_ONE && set(scoreRef, updatedScore);
  }

  function isScorePoints(hand: CardsIndex, cutCard: CardType) {
    const pairs = scorePairs(hand, cutCard);
    const fifteens = scoreFifteens(hand, cutCard);
    const runs = scoreRuns(hand, cutCard);
    const flush = scoreFlush(hand, cutCard);
    const points = pairs + fifteens + runs + flush;

    return points;
  }

  function tallyHand() {
    scoreHand();
    setTally(true);
    const cancelTimer = setTimeout(() => {
      setTally(false);
      resetHand(dealHandler);
    }, 10000);
  }

  function resetHand(callback?: () => void) {
    const newDealer = getPone(gameState.dealer);
    const gameRef = getGameRef(gameId);
    update(gameRef, {
      ...gameState,
      dealer: newDealer,
      playerCards: INITIAL_GAME_STATE.playerCards,
      crib: null,
      deckCut: INITIAL_GAME_STATE.deckCut,
      turnTotals: INITIAL_GAME_STATE.turnTotals
    }).then(() => callback && callback());
  }

  // function updateDealer(callback?: () => void) {
  //   const dealerRef = getDealerRef(gameId);
  //   const pone = getPone(gameState.dealer);
  //   set(dealerRef, pone).then(() => callback && callback());
  // }

  function cutDeckHandler(cutStatus: Status) {
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

  function playCard(card: CardType, callback?: () => void) {
    const playerHandRef = getInHandRef(gameId, player);
    const playerCardsPlayedRef = getPlayerCardsPlayedRef(gameId, player);
    const cardsPlayedRef = getCardsPlayedRef(gameId);
    const addPlayerPlayedRef = push(playerCardsPlayedRef);
    const addPlayedRef = push(cardsPlayedRef);
    const updatedHand = filterCard(gameState.playerCards[player].inHand, card.id);

    set(playerHandRef, updatedHand)
      .then(() => {
        set(addPlayerPlayedRef, card);
        set(addPlayedRef, card);
      })
      .then(callback);
  }

  function resetCardTotal() {
    const turnRef = getTurnRef(gameId);
    set(turnRef, { cardsPlayed: {}, cardTotal: 0 });
  }

  function isPegPoints(card: CardType, turnTotals: TurnType) {
    const updatedCardTotal = updateCardTotal(card.playValue, gameState.turnTotals.cardTotal);
    const opponentGo = expectGo(opponentHand, updatedCardTotal);
    const playerGo = expectGo(playerHand, updatedCardTotal, card);

    const pairs = isPegPairs(card.faceValue, turnTotals.cardsPlayed);
    const fifteen = isPegFifteen(card.playValue, turnTotals.cardTotal);
    const run = isPegRun(card.faceValue, turnTotals.cardsPlayed);
    const go = opponentGo && playerGo ? isPegGo(card.playValue, turnTotals.cardTotal) : 0;
    const points = pairs + fifteen + run + go;

    return points;
  }

  function expectGo(hand: CardsIndex, cardTotal: number, cardPlayed?: CardType): boolean {
    // played card still in state, must be filtered from array
    const validCards = Object.values(hand).filter(
      (card) => card.id !== cardPlayed?.id && isCardValid(card.playValue, cardTotal)
    );

    return !validCards.length;
  }

  function renderGo(callback?: () => void) {
    setGo(true);
    const timer = setTimeout(() => {
      setGo(false);
      if (callback) callback();
    }, 1500);
  }

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    overlap: CardOverlap,
    playerHand: boolean = false
  ) {
    return cards.map((card, i) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        overlap={overlap}
        valid={playerHand ? isCardValid(card.playValue, gameState.turnTotals.cardTotal) : undefined}
        handler={playerHand ? cardClickHandler : undefined}
      />
    ));
  }

  function cardClickHandler(targetCard: CardType) {
    if (!isPlayerActive(gameState.players[player])) return console.log('player is not active');
    if (!isCardValid(targetCard.playValue, gameState.turnTotals.cardTotal))
      return console.log('thats over 31!!');
    if (gameState.deckCut.status === Status.VALID) return console.log('must cut deck');

    // FIXME: move to useEffect?
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
      const cardTotalRef = getCardTotalRef(gameId);
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
  }

  const numCardsPlayed =
    Object.keys(gameState.playerCards.player1.played).length +
    Object.keys(gameState.playerCards.player2.played).length;

  useEffect(() => {
    console.log('useEffect');
    if (!numCardsPlayed || player !== PlayerPos.P_ONE) return;
    if (numCardsPlayed !== 8) return;
    tallyHand();
  }, [numCardsPlayed]);

  return (
    <div className="relative grid h-full grid-cols-[4fr,_1fr] items-center justify-items-center gap-2 py-12 px-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full justify-between">
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              <Avatar displayName={gameState.players[opponent].displayName} />
              <CardBox
                size={{ height: CardBoxHeight.SM, width: CardBoxWidth.SM_SIX }}
                maxCards={6}
                overlap={CardOverlap.TWO_THIRDS}>
                {renderOpponentHand}
              </CardBox>
            </div>
            <div className="rounded-full bg-red-400 p-2">
              <CardBox
                size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR_HALF }}
                maxCards={4}
                overlap={CardOverlap.HALF}
                placement="self-center place-self-center">
                {renderOpponentPlayed}
              </CardBox>

              <div>
                <div className="flex flex-col items-center gap-1 py-4">
                  <Deck cutDeck={gameState.deckCut} callback={cutDeckHandler} />
                  <div>
                    count: {gameState.turnTotals.cardTotal} {go && 'GO!!'}
                  </div>
                  <div>
                    {gameState.players[player].activePlayer === IsActive.ACTIVE
                      ? 'your turn'
                      : `opponent's turn`}
                  </div>
                </div>
              </div>
              <CardBox
                size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR_HALF }}
                maxCards={4}
                overlap={CardOverlap.HALF}
                placement="self-center place-self-center">
                {renderPlayerPlayed}
              </CardBox>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <Score
              displayName={gameState.players[opponent].displayName}
              curScore={gameState.score[opponent].cur}
              prevScore={gameState.score[opponent].prev}
            />
            <Board />
            <Button handler={dealHandler}>START</Button>
            <Score
              displayName={gameState.players[player].displayName}
              curScore={gameState.score[player].cur}
              prevScore={gameState.score[player].prev}
            />
          </div>
        </div>
        <div>
          <CardBox
            size={{ height: CardBoxHeight.LG, width: CardBoxWidth.LG_SIX }}
            maxCards={6}
            overlap={CardOverlap.TWO_THIRDS}
            placement="self-center place-self-center">
            {renderPlayerHand}
          </CardBox>
        </div>
      </div>
    </div>
  );
};

export default PlayField;
