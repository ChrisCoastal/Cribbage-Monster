import { useCallback, useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData, useBeforeUnload } from 'react-router-dom';

import { get, onValue, set, update } from 'firebase/database';

import { GameReducerTypes, GameState, IsActive, Status, PlayerPos } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import useModal from 'src/hooks/useModal';

import Button from 'src/components/UI/Button';
import HandTally from 'src/components/HandTally/HandTally';
import PlayField from 'src/components/PlayField/PlayField';

import {
  dealHands,
  getGameFromList,
  getGameRef,
  getPlayerOpponent,
  getPlayerRef,
  getPone
} from 'src/utils/helpers';
import { INITIAL_GAME_STATE } from 'src/utils/constants';

export async function gameLoader({ params }: LoaderFunctionArgs) {
  try {
    const game = await get(getGameRef(params.gameId!));
    return game.val();
  } catch (err) {
    console.log(err);
  }
}

const GamePage = () => {
  const game = useLoaderData() as GameState;
  const gameRef = getGameRef(game.gameId);

  const { gameState, dispatchGame } = useGameContext();

  const { userAuth } = useAuthContext();
  const uid = userAuth!.uid!;
  const { player, opponent } = getPlayerOpponent(gameState.players, uid);
  // useInterval(() => update(presenceRef, { presence: serverTimestamp() }), 5000); // TODO: uncomment to add updating timestamp

  const { Modal, isModal, modalHandler } = useModal();

  async function dealHandler() {
    if (player !== PlayerPos.P_ONE) return;
    const deal = dealHands();
    const update: GameState = {
      ...gameState,
      handNum: gameState.handNum + 1,
      players: {
        player1: { ...gameState.players.player1, activePlayer: IsActive.ACTIVE },
        player2: { ...gameState.players.player2, activePlayer: IsActive.ACTIVE }
      },
      playerCards: {
        player1: { inHand: deal.hands.player1, played: {} },
        player2: { inHand: deal.hands.player2, played: {} }
      },
      deckCut: { status: Status.INVALID, card: deal.cut },
      crib: {},
      tally: null,
      turnTotals: {
        cardsPlayed: {},
        cardTotal: 0
      }
    };
    set(gameRef, update);
  }

  const resetHand = useCallback(() => {
    const newDealer = getPone(gameState.dealer);
    const gameRef = getGameRef(game.gameId);
    const deal = dealHands();
    update(gameRef, {
      ...gameState,
      dealer: newDealer,
      handNum: gameState.handNum + 1,
      players: {
        player1: { ...gameState.players.player1, activePlayer: IsActive.ACTIVE },
        player2: { ...gameState.players.player2, activePlayer: IsActive.ACTIVE }
      },
      playerCards: {
        player1: { inHand: deal.hands.player1, played: {} },
        player2: { inHand: deal.hands.player2, played: {} }
      },
      crib: INITIAL_GAME_STATE.crib,
      deckCut: { status: Status.INVALID, card: deal.cut },
      turnTotals: INITIAL_GAME_STATE.turnTotals,
      tally: INITIAL_GAME_STATE.tally
    });
  }, [game.gameId, gameState]);

  function canStartGame() {
    return (
      Boolean(gameState.players.player1.displayName.length) &&
      Boolean(gameState.players.player2.displayName.length) &&
      !gameState.handNum &&
      !Object.keys(gameState.playerCards.player1.inHand).length
    );
  }

  const renderTally = useCallback(() => {
    modalHandler(true);
    const timer = setTimeout(() => {
      modalHandler(false);
      player === PlayerPos.P_ONE && resetHand();
    }, 16000);
  }, [player, modalHandler, resetHand]);

  useEffect(() => {
    const gameRef = getGameRef(game.gameId);
    const unsubscribeGame = onValue(
      gameRef,
      (snapshot) => {
        dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );

    function unsubscriber() {
      unsubscribeGame();
    }

    return unsubscriber;
  }, []);

  useEffect(() => {
    if (!gameState.tally) return;
    renderTally();
  }, [gameState.tally, renderTally]);

  function leaveGameHandler() {
    const playerRef = getPlayerRef(game.gameId, player);
    const gameListRef = getGameFromList(game.gameId);
    update(gameListRef, { [player]: { displayName: '', avatar: '', presence: '' } });
    update(playerRef, { id: '', displayName: '', activePlayer: IsActive.NOT_ACTIVE });
  }

  window.onpopstate = () => leaveGameHandler();

  return (
    <>
      {isModal && gameState.tally && (
        <Modal isVisible={isModal} title={'Hand Tally'} className={'bg-stone-800 text-white'}>
          <HandTally
            dealer={gameState.dealer}
            cut={gameState.deckCut.card!}
            player={{
              displayName: gameState.players[player].displayName,
              avatar: gameState.players[player].avatar,
              playerPos: player,
              cards: gameState.playerCards[player].played,
              points: gameState?.tally[player]
            }}
            opponent={{
              displayName: gameState.players[opponent].displayName,
              avatar: gameState.players[opponent].avatar,
              playerPos: opponent,
              cards: gameState.playerCards[opponent].played,
              points: gameState?.tally[opponent]
            }}
            crib={gameState?.tally.crib}
          />
        </Modal>
      )}
      <div className="relative">
        <div className="flex h-[90vh] flex-col justify-center">
          <PlayField gameId={game.gameId} />
        </div>
        {canStartGame() && player === PlayerPos.P_ONE && (
          <Button
            handler={dealHandler}
            className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
            START
          </Button>
        )}
      </div>
    </>
  );
};

export default GamePage;
