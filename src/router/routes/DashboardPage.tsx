import { useEffect, useState } from 'react';

import { onValue } from 'firebase/database';

import { GameBrief } from 'src/@types';

import CreateGame from 'src/components/CreateGame/CreateGame';
import useAuthContext from 'src/hooks/useAuthContext';
import GamesList from 'src/components/GamesList/GamesList';
import { getGamesList } from 'src/utils/helpers';
import Carousel from 'src/components/UI/Carousel';
import Badges from 'src/components/Badges/Badges';

const DashboardPage = () => {
  const [games, setGames] = useState<GameBrief[]>([]);
  const { userAuth } = useAuthContext();

  useEffect(() => {
    const gamesListRef = getGamesList();
    const unsubscribe = onValue(
      gamesListRef,
      (snapshot) => {
        const updatedGames: GameBrief[] = [];
        const gameBriefs = (snapshot.val() as { [key: string]: GameBrief }) || {};
        const values = Object.values(gameBriefs);
        values.forEach((value) => {
          updatedGames.push(value);
        });
        setGames(() => updatedGames);

        // dispatchGame({ type: GameReducerTypes.UPDATE, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );

    return unsubscribe;
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid w-full grid-cols-4 gap-4 rounded-lg bg-stone-600 p-6 md:w-3/4">
        <div className="">
          <p>{`${userAuth?.displayName}`}</p>
        </div>
        <div className=" col-span-3 col-start-2">
          <Carousel />
        </div>
        <GamesList games={games} />
        <CreateGame />
        <Badges />
      </div>
    </div>
  );
};

export default DashboardPage;
