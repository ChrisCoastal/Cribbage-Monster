import React, { FC, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { rtdb } from 'src/firestore.config';
type GamesListProps = {
  // games:
};

const GamesList: FC<GamesListProps> = () => {
  useEffect(() => {
    const gamesListRef = ref(rtdb, `gameslist`);
    const unsubscribe = onValue(gamesListRef, (snapshot) => {
      console.log(snapshot.val());
      // dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
    });
    return unsubscribe;
  }, []);

  return <div>GamesList</div>;
};

export default GamesList;
