import React, { FC, useEffect, useState } from 'react';
import { onValue } from 'firebase/database';
import { GameBrief, AvatarSize } from 'src/@types';

import { getGamesList } from 'src/utils/helpers';

import AddIcon from 'src/components/UI/icons/AddIcon/AddIcon';
import Avatar from 'src/components/Avatar/Avatar';
import Card from 'src/components/UI/Card';
import CreateGame from 'src/components/CreateGame/CreateGame';
import JoinGame from 'src/components/JoinGame/JoinGame';
import SubHeading from 'src/components/UI/SubHeading';
import ToolTip from 'src/components/UI/ToolTip';

const GamesList: FC = () => {
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
      },
      (error) => console.log(error)
    );

    return unsubscribe;
  }, []);

  const gamesListItems = games
    .filter((game) => game.player1?.displayName.length || game.player2?.displayName.length)
    .map((game) => {
      const inProgress = game.player1.displayName.length && game.player2.displayName.length;
      return (
        <li
          key={game.gameId}
          className="flex items-center justify-between gap-4 rounded-md bg-stone-900 py-2 px-4 font-light text-stone-50">
          <div className="relative flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <Avatar
                className={AvatarSize.SM}
                avatar={game.player1.avatar.length ? game.player1.avatar : ''}
              />
              <p className="text-sm font-medium">
                {game.player1.displayName.length ? game.player1.displayName : ''}
              </p>
            </span>
            <span className="flex items-center gap-2">
              <Avatar
                className={AvatarSize.SM}
                avatar={game.player2.avatar.length ? game.player2.avatar : ''}
              />
              <p className="text-sm font-medium">
                {game.player2.displayName.length ? game.player2.displayName : ''}
              </p>
            </span>
          </div>

          <div className="flex items-center justify-between gap-8">
            <span className=" text-center">
              <p className="text-xs font-medium">🏆</p>
              <p className="text-xs font-medium">{game.scoreToWin}</p>
            </span>
            {inProgress ? (
              <p className="text-xs">In Progress</p>
            ) : (
              <JoinGame gameId={game.gameId} />
            )}
          </div>
        </li>
      );
    });

  return (
    <Card padding="md">
      <div className="h-full overflow-hidden">
        <div className="flex items-center justify-between pb-6">
          <SubHeading>GAMES</SubHeading>
          <CreateGame className="cursor-pointer rounded-full bg-black bg-gradient-to-br from-purple-400/90 to-purple-700/90 tracking-wide text-stone-50 shadow-sm transition-all duration-300 hover:bg-slate-100 hover:shadow-md">
            <ToolTip text="create game">
              <AddIcon height="32" width="32" />
            </ToolTip>
          </CreateGame>
        </div>
        <ul className="flex max-h-80 flex-col gap-2 overflow-scroll text-stone-50">
          {gamesListItems.length ? (
            gamesListItems
          ) : (
            <li className="text-center ">No games available</li>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default GamesList;
