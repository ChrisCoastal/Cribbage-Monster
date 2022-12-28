import { useEffect, useState } from 'react';

import { onValue } from 'firebase/database';

import { GameBrief } from 'src/@types';

import CreateGame from 'src/components/CreateGame/CreateGame';
import useAuthContext from 'src/hooks/useAuthContext';
import Button from 'src/components/UI/Button';
import GamesList from 'src/components/GamesList/GamesList';
import { getGamesList } from 'src/utils/helpers';

const DashboardPage = () => {
  const [games, setGames] = useState<GameBrief[]>([]);
  const { userAuth } = useAuthContext();

  useEffect(() => {
    const games: GameBrief[] = [];
    const gamesListRef = getGamesList();
    const unsubscribe = onValue(gamesListRef, (snapshot) => {
      const gameBriefs = (snapshot.val() as { [key: string]: GameBrief }) || {};
      const keys = Object.keys(gameBriefs);
      keys.forEach((key) => {
        games.push(gameBriefs[key]);
      });
      setGames(() => games);

      // dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
    });
    return unsubscribe;
  }, []);

  return (
    <div className="grid">
      <div className="">
        <p>{`Hey ${userAuth?.displayName}`}</p>
        <Button handler={() => console.log(userAuth)}>USER?</Button>
        <GamesList games={games} />
        <CreateGame />
      </div>
    </div>
  );
};

export default DashboardPage;
