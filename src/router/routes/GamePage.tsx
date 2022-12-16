import { FC, useEffect } from 'react';

import { collection, doc, onSnapshot } from 'firebase/firestore';
import { rtdb } from 'src/firestore.config';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';

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
  const { gameState, dispatchGame } = useGameContext();
  const game = useLoaderData() as GameState;
  // const { gameId } = useParams();
  if (!game.gameId) throw new Error('no gameId');
  console.log('gameId', game.gameId);

  useEffect(() => {
    // FIXME: this is undefined
    // if (!gameState.gameId) return;
    const gameRef = ref(rtdb, 'games/' + game.gameId);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      console.log(snapshot.val());
      dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
    });

    // console.log(gameState.gameId);

    // const unsubscribe = onSnapshot(gameRef, (snapshot: any) => {
    //   console.log(snapshot.docs);

    // snapshot.docs.forEach((doc: any) => {
    //   console.log(doc);
    // booksFromOnSnapshot.push({ ...doc.data(), id: doc.id });
    // });
    // });

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
