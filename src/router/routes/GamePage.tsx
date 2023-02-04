import { useCallback, useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData, useBeforeUnload } from 'react-router-dom';

import { get, onValue, set, update } from 'firebase/database';

import { GameReducerTypes, GameState, IsActive, Status, PlayerPos, GameStatus } from 'src/@types';

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
  getPone,
  isHost
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
  const pone = getPone(gameState.dealer);
  // useInterval(() => update(presenceRef, { presence: serverTimestamp() }), 5000); // TODO: uncomment to add updating timestamp

  const { Modal, isModal, modalHandler } = useModal();

  async function dealHandler() {
    if (!isHost(player)) return;
    const deal = dealHands();
    const update: GameState = {
      ...gameState,
      status: GameStatus.LAY_CRIB,
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
      // isHost(player) && resetHand();
    }, 16000);
  }, [player, modalHandler]);

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

  console.log(gameState.status);

  useEffect(() => {
    if (gameState.status === GameStatus.TALLY) renderTally();
    if (gameState.status === GameStatus.DEAL) {
      console.log('reset hand', isHost(player));

      modalHandler(false);
      isHost(player) && dealHandler();
    }
  }, [gameState.status, renderTally]);

  function leaveGameHandler() {
    const playerRef = getPlayerRef(game.gameId, player);
    const gameListRef = getGameFromList(game.gameId);
    update(gameListRef, { [player]: { displayName: '', avatar: '', presence: '' } });
    update(playerRef, { id: '', displayName: '', avatar: '', activePlayer: IsActive.NOT_ACTIVE });
    // TODO: update game status and active player
  }

  window.onpopstate = () => leaveGameHandler();

  return (
    <>
      {/* {isModal && gameState.tally && ( */}
      {isModal && gameState.status === GameStatus.TALLY && (
        <Modal
          isVisible={isModal}
          className={'w-full bg-stone-800 text-stone-50'}
          clickAway={false}>
          <HandTally
            player={player}
            opponent={opponent}
            dealer={gameState.dealer}
            pone={pone}
            // player={{
            //   displayName: gameState.players[player].displayName,
            //   avatar: gameState.players[player].avatar,
            //   playerPos: player,
            //   cards: gameState.playerCards[player].played
            //   points: gameState?.tally[player]
            // }}
            // opponent={{
            //   displayName: gameState.players[opponent].displayName,
            //   avatar: gameState.players[opponent].avatar,
            //   playerPos: opponent,
            //   cards: gameState.playerCards[opponent].played
            //   points: gameState?.tally[opponent]
            // }}
            // crib={{
            //   displayName: gameState.players[gameState.dealer].displayName,
            //   avatar: gameState.players[gameState.dealer].avatar,
            //   playerPos: gameState.dealer,
            //   cards: gameState.crib
            //   points: gameState?.tally.crib
            // }}
          />
        </Modal>
      )}
      <div className="relative">
        <PlayField gameId={game.gameId} />

        {canStartGame() && isHost(player) && (
          <Button
            handler={dealHandler}
            buttonColor="secondary"
            buttonSize="lg"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-radiate">
            START GAME
          </Button>
        )}
      </div>
    </>
  );
};

export default GamePage;
