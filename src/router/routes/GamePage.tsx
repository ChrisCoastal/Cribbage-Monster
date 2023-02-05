import { useCallback, useEffect } from 'react';
import { LoaderFunctionArgs, useLoaderData, useBeforeUnload, useNavigate } from 'react-router-dom';

import { get, onValue, set, update } from 'firebase/database';

import {
  GameReducerTypes,
  GameState,
  IsActive,
  Status,
  PlayerPos,
  GameStatus,
  UserStats
} from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import useModal from 'src/hooks/useModal';

import Button from 'src/components/UI/Button';
import Confetti from 'src/components/UI/Confetti';

import HandTally from 'src/components/HandTally/HandTally';
import PlayField from 'src/components/PlayField/PlayField';

import {
  dealHands,
  getGameFromList,
  getGameRef,
  getGameStatusRef,
  getPlayerOpponent,
  getPlayerRef,
  getPone,
  getUserStatsRef,
  isHost,
  isWinner
} from 'src/utils/helpers';
import { INITIAL_GAME_STATE, INITIAL_USER_STATS } from 'src/utils/constants';
import Avatar from 'src/components/Avatar/Avatar';
import GameWinner from 'src/components/GameWinner/GameWinner';

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
  const navigate = useNavigate();
  const gameRef = getGameRef(game.gameId);

  const { gameState, dispatchGame } = useGameContext();

  const { userAuth } = useAuthContext();
  const uid = userAuth!.uid!;
  const { player, opponent } = getPlayerOpponent(gameState.players, uid);
  const playerWins = isWinner(gameState.score[player].cur);
  const opponentWins = isWinner(gameState.score[opponent].cur);
  const pone = getPone(gameState.dealer);
  // useInterval(() => update(presenceRef, { presence: serverTimestamp() }), 5000); // TODO: uncomment to add updating timestamp
  // console.log(playerWins, opponentWins);

  const { Modal: TallyModal, isModal: isTallyModal, modalHandler: tallyModalHandler } = useModal();
  const { Modal: WinModal, isModal: isWinModal, modalHandler: winModalHandler } = useModal();

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
    if (gameState.status === GameStatus.TALLY && !isTallyModal) {
      console.log(isTallyModal, 'effect setting tally');

      tallyModalHandler(true);
    }
    if (gameState.status !== GameStatus.TALLY) {
      tallyModalHandler(false);
    }
    if (gameState.status === GameStatus.DEAL) {
      // tallyModalHandler(false);
      isHost(player) && dealHandler();
    }
    if (gameState.status === GameStatus.WINNER) {
      console.log('winner');
      winGameHandler();
    }
  }, [gameState.status]);

  function canStartGame() {
    return (
      Boolean(gameState.players.player1.displayName.length) &&
      Boolean(gameState.players.player2.displayName.length) &&
      !gameState.handNum &&
      !Object.keys(gameState.playerCards.player1.inHand).length
    );
  }

  async function dealHandler(newGame = false) {
    if (!isHost(player)) return;
    const deal = dealHands();
    const state = newGame ? INITIAL_GAME_STATE : gameState;
    const update: GameState = {
      ...state,
      status: GameStatus.LAY_CRIB,
      handNum: state.handNum + 1,
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

  function winnerData() {
    if (playerWins)
      return {
        avatar: gameState.players[player].avatar,
        displayName: gameState.players[player].displayName
      };
    if (opponentWins)
      return {
        avatar: gameState.players[opponent].avatar,
        displayName: gameState.players[opponent].displayName
      };
    return {
      // avatar: '',
      // displayName: ''
      avatar: gameState.players[player].avatar,
      displayName: gameState.players[player].displayName
    };
  }

  async function updatePlayerStats(isWinner: boolean, uid: string) {
    const playerStatsRef = getUserStatsRef(uid);
    const playerStats: UserStats = await get(playerStatsRef).then((snapshot) => snapshot.val());
    const curDate = new Date(Date.now()).toDateString().replaceAll(' ', '_');
    const { date, won, played } = playerStats.dailyGames.at(-1) ?? {
      ...INITIAL_USER_STATS.dailyGames[0],
      date: curDate
    };

    let dailyGames;
    if (date === curDate)
      dailyGames = playerStats.dailyGames.splice(-1, 1, {
        date: curDate,
        won: isWinner ? won + 1 : won,
        played: played + 1
      });
    if (date !== curDate)
      dailyGames = playerStats.dailyGames.push({ date: curDate, won: isWinner ? 1 : 0, played: 1 });

    const gamesWon = isWinner ? (playerStats?.gamesWon || 0) + 1 : playerStats?.gamesWon || 0;
    const gamesPlayed = playerStats.gamesPlayed + 1;
    const updatedPlayerStats = { gamesPlayed, gamesWon, dailyGames };

    set(playerStatsRef, updatedPlayerStats);
  }

  function winGameHandler() {
    winModalHandler(true);
    updatePlayerStats(playerWins, uid);
  }

  function quitGameHandler() {
    winModalHandler(false);
    leaveGameHandler();
    navigate(`/dashboard/${uid}`);
  }

  function playAgainHandler() {
    winModalHandler(false);
    dealHandler(true);
  }

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
      {isTallyModal && (
        <TallyModal
          isVisible={isTallyModal}
          className={'w-full bg-stone-800 text-stone-50'}
          clickAway={false}>
          <HandTally player={player} opponent={opponent} dealer={gameState.dealer} pone={pone} />
        </TallyModal>
      )}
      {isWinModal && (
        <WinModal
          isVisible={true}
          className={'w-full bg-stone-800 text-stone-50'}
          clickAway={false}>
          <GameWinner
            winner={winnerData()}
            playerIsWinner={true}
            quitHandler={quitGameHandler}
            playHandler={playAgainHandler}
          />
        </WinModal>
      )}
      <div className="relative">
        <PlayField gameId={game.gameId} />

        {canStartGame() && isHost(player) && (
          <Button
            handler={() => dealHandler()}
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
