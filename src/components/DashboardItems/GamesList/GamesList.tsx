import React, { FC, useEffect, useState } from 'react';

import { onValue } from 'firebase/database';

import { GameBrief, AvatarSize } from 'src/@types';
import JoinGame from 'src/components/JoinGame/JoinGame';

import { getGamesList } from 'src/utils/helpers';
import CreateGame from 'src/components/CreateGame/CreateGame';
import Avatar from 'src/components/Avatar/Avatar';
import Card from 'src/components/UI/Card';

type GamesListProps = {
  //
};

const GamesList: FC<GamesListProps> = () => {
  const [games, setGames] = useState<GameBrief[]>([]);

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

  const gamesListItems = games
    .filter((game) => game.player1.displayName.length || game.player2.displayName.length)
    .map((game) => {
      const inProgress = game.player1.displayName.length && game.player2.displayName.length;
      return (
        <li
          key={game.gameId}
          className="flex items-center justify-between gap-4 rounded-full bg-gradient-to-br from-stone-700 to-stone-800 p-2 text-xs">
          <span className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1">
              <Avatar size={AvatarSize.SM} avatar={game.player1.avatar} />
              <p>{game.player1.displayName}</p>
            </span>
            <p>{game.scoreToWin}</p>
          </span>
          {inProgress ? <p>In Progress</p> : <JoinGame gameId={game.gameId} />}
          {/* {!vacantPlayer && <JoinGame gameId={game.gameId} />} */}
        </li>
      );
    });

  return (
    <Card>
      <div className="w-full text-white">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-lg font-bold">GAMES</h2>
          <CreateGame />
        </div>
        <ul className="flex max-h-56 flex-col gap-2 overflow-scroll">
          {gamesListItems.length ? gamesListItems : <li>no games available</li>}
        </ul>
      </div>
    </Card>
  );
};

export default GamesList;
