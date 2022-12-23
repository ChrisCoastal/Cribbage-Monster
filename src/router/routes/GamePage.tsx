import { FC, useEffect } from 'react';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { rtdb } from 'src/firestore.config';
import { getDatabase, ref, child, get, onValue, update } from 'firebase/database';

import PlayFieldFlex from 'src/components/PlayField/PlayFieldFlex';
import BottomNav from 'src/components/BottomNav/BottomNav';

import useGameContext from 'src/hooks/useGameContext';
import { GameId, GameReducerTypes, GameState } from 'src/@types';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';
import { getGameRef, getGameScoresRef } from 'src/utils/helpers';

export async function gameLoader({ params }: LoaderFunctionArgs) {
  try {
    const game = await get(ref(rtdb, `games/${params.gameId}`));
    return game.val();
  } catch (err) {
    console.log(err);
  }
}

const GamePage = () => {
  const game = useLoaderData() as GameState;
  const { gameState, dispatchGame } = useGameContext();

  useEffect(() => {
    const gameRef = getGameRef(game.gameId);
    const unsubscribeGame = onValue(
      gameRef,
      (snapshot) => {
        dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );
    // const gameScoresRef = getGameScoresRef(game.gameId);
    // const unsubscribeStats = onValue(
    //   gameScoresRef,
    //   (snapshot) => {
    //     dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
    //   },
    //   (error) => console.log(error)
    // );

    function unsubscriber() {
      unsubscribeGame();
      // unsubscribeStats();
    }

    return unsubscriber;
  }, []);

  return (
    <div className="relative h-screen bg-neutral-800">
      <div>
        <PlayFieldFlex gameId={game.gameId} />
      </div>
      {/* <BottomNav /> */}
    </div>
  );
};

export default GamePage;
