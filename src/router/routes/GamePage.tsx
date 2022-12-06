import { useEffect } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'src/firestore.config';

import PlayField from 'src/components/PlayField/PlayField';
import BottomNav from 'src/components/BottomNav/BottomNav';

import { GameProvider } from 'src/context/GameProvider/GameProvider';
import useGameContext from 'src/hooks/useGameContext';

const GamePage = () => {
  const { gameState } = useGameContext();

  useEffect(() => {
    const gameRef = collection(db, `game/${gameState.gameId}`);
    const unsubscribe = onSnapshot(gameRef, (snapshot: any) => {
      console.log(snapshot.docs);

      // snapshot.docs.forEach((doc: any) => {
      //   console.log(doc);
      // booksFromOnSnapshot.push({ ...doc.data(), id: doc.id });
      // });
    });

    return unsubscribe;
  }, []);

  return (
    <GameProvider>
      <div className="relative grid h-screen max-h-screen grid-rows-[3rem_minmax(1fr)_3rem_3rem] bg-teal-100">
        <div>
          <PlayField />
        </div>
        <BottomNav />
      </div>
    </GameProvider>
  );
};

export default GamePage;
