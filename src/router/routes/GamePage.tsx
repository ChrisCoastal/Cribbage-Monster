import { useCallback, useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData, useBeforeUnload } from 'react-router-dom';

import { get, onValue, set, update, onDisconnect, serverTimestamp, push } from 'firebase/database';

import { GameReducerTypes, GameState, IsActive, Status, PlayerPos } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import useModal from 'src/hooks/useModal';

import Button from 'src/components/UI/Button';
import HandTally from 'src/components/HandTally/HandTally';
import PlayFieldFlex from 'src/components/PlayField/PlayField';

import {
  dealHands,
  getConnectionRef,
  getGameFromList,
  getGameRef,
  getPlayerOpponent,
  getPlayerPresenceRef,
  getPlayerRef,
  getPone,
  getPresenceRef,
  getUserStatusRef
} from 'src/utils/helpers';
import { INITIAL_GAME_STATE } from 'src/utils/constants';
import { useInterval } from 'src/hooks/useInterval';

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
  const presenceRef = getPlayerPresenceRef(game.gameId, player);
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
  }, [gameState.tally]);

  // useEffect(() => {
  //   console.log('rendering useEffect');

  //   const presenceRef = getPresenceRef();
  //   const statusRef = getUserStatusRef(uid);
  //   // const disconnect = onDisconnect(statusRef);
  //   // disconnect.set('disconnected');
  //   // Write a string when this client loses connection
  //   // set(statusRef, true).then(() => console.log('Online presence set'));

  //   // Remove the node whenever the client disconnects
  //   // onDisconnect(statusRef)
  //   //   .remove()
  //   //   .then(() => console.log('On disconnect function configured.'));

  //   const connectionRef = getConnectionRef();
  //   const unsubConnection = onValue(connectionRef, (snapshot) => {
  //     if (snapshot.val() === true) {
  //       console.log('connected');
  //       onDisconnect(presenceRef)
  //         .set('I disconnected!')
  //         .then(() => console.log('disconnected'));
  //       const status = push(statusRef);
  //       // onDisconnect(presenceRef).set('I disconnected!');
  //     } else {
  //       console.log('not connected');
  //     }
  //   });
  //   return unsubConnection;
  // }, []);
  // useEffect(() => {
  //   console.log('rendering useEffect');
  //   if (!uid) return;
  //   const { player } = getPlayerOpponent(gameState.players, uid);
  //   const playerRef = getPlayerRef(game.gameId, player);

  //   if (!gameState.players[player].id)
  //     update(playerRef, {
  //       id: uid,
  //       displayName: userAuth?.displayName,
  //       activePlayer: IsActive.NOT_ACTIVE
  //     }).then(() => console.log('readded player'));
  //   const presenceRef = getPresenceRef();
  //   const gameStatusRef = getUserStatusRef(uid);
  //   set(presenceRef, true);
  //   // const disconnect = onDisconnect(statusRef);
  //   // disconnect.set('disconnected');
  //   // Write a string when this client loses connection
  //   // set(statusRef, true).then(() => console.log('Online presence set'));

  //   // Remove the node whenever the client disconnects
  //   // onDisconnect(statusRef)
  //   //   .remove()
  //   //   .then(() => console.log('On disconnect function configured.'));
  //   // onDisconnect(presenceRef)
  //   //   .set(false)
  //   //   .then(() => console.log('disconnected'));

  //   function disconnect() {
  //     // update(playerRef, INITIAL_GAME_STATE.players[player]);
  //     onDisconnect(presenceRef)
  //       .set(false)
  //       .then(() => console.log('disconnected'));
  //   }
  //   // const connectionRef = getConnectionRef();
  //   // const unsubConnection = onValue(connectionRef, (snapshot) => {
  //   //   if (snapshot.val() === true) {
  //   //     console.log('connected');
  //   //     onDisconnect(presenceRef)
  //   //       .set('I disconnected!')
  //   //       .then(() => console.log('disconnected'));
  //   //     const status = push(statusRef);
  //   //     // onDisconnect(presenceRef).set('I disconnected!');
  //   //   } else {
  //   //     console.log('not connected');
  //   //   }
  //   // });
  //   // return unsubConnection;
  //   return disconnect();
  // }, []);
  function leaveGameHandler() {
    const ref = getUserStatusRef(uid);

    const playerRef = getPlayerRef(game.gameId, player);
    const gameListRef = getGameFromList(game.gameId);
    const gameRef = getGameRef(game.gameId);

    // if (gameState.players[opponent].displayName === '') {
    //   set(gameRef, null);
    //   set(gameListRef, null);
    // }

    update(gameListRef, { [player]: { displayName: '', avatar: '', presence: '' } });
    update(playerRef, { id: '', displayName: '', activePlayer: IsActive.NOT_ACTIVE });
  }

  window.onpopstate = () => leaveGameHandler();

  return (
    <>
      {isModal && gameState.tally && (
        <Modal isVisible={isModal} title={'Hand Tally'} customStyles={'bg-stone-800 text-white'}>
          <HandTally
            dealer={gameState.dealer}
            cut={gameState.deckCut.card!}
            player={{
              displayName: gameState.players[player].displayName,
              playerPos: player,
              cards: gameState.playerCards[player].played,
              points: gameState?.tally[player]
            }}
            opponent={{
              displayName: gameState.players[opponent].displayName,
              playerPos: opponent,
              cards: gameState.playerCards[opponent].played,
              points: gameState?.tally[opponent]
            }}
            crib={gameState?.tally.crib}
          />
        </Modal>
      )}
      <div className="relative">
        <div>
          <PlayFieldFlex gameId={game.gameId} />
        </div>
        {canStartGame() && player === PlayerPos.P_ONE && (
          <Button
            handler={dealHandler}
            customStyles="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
            START
          </Button>
        )}
      </div>
    </>
  );
};

export default GamePage;
