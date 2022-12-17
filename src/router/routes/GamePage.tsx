import { FC, useEffect } from 'react';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { rtdb } from 'src/firestore.config';
import { getDatabase, ref, child, get, onValue, update } from 'firebase/database';

import PlayFieldFlex from 'src/components/PlayField/PlayFieldFlex';
import BottomNav from 'src/components/BottomNav/BottomNav';

import useGameContext from 'src/hooks/useGameContext';
import { GameId, GameReducerTypes, GameState } from 'src/@types';
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom';

export async function gameLoader({ params }: LoaderFunctionArgs) {
  try {
    console.log('go loader!');

    const game = await get(ref(rtdb, `games/${params.gameId}`));
    return game.val();
  } catch (err) {
    console.log(err);
  }
}

const GamePage = () => {
  const game = useLoaderData() as GameState;
  const { gameState, dispatchGame } = useGameContext();
  // const { gameId } = useParams();
  // if (!game.gameId) throw new Error('no gameId');
  useEffect(() => {
    const gameRef = ref(rtdb, `games/${game.gameId}`);
    // dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: game });

    const unsubscribe = onValue(
      gameRef,
      (snapshot) => {
        console.log(snapshot.val());
        dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, []);

  return (
    <div className="relative grid h-screen max-h-screen grid-rows-[3rem_minmax(1fr)_3rem_3rem] bg-teal-100">
      <div>
        <PlayFieldFlex gameId={game.gameId} />
      </div>
      <BottomNav />
    </div>
  );
};

export default GamePage;
