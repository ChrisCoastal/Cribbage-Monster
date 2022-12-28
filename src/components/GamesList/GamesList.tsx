import React, { FC } from 'react';
import { GameBrief } from 'src/@types';
import JoinGame from '../JoinGame/JoinGame';
type GamesListProps = {
  games: GameBrief[];
};

const GamesList: FC<GamesListProps> = ({ games }) => {
  const gamesListItems = games.map((game) => {
    return (
      <div key={game.gameId}>
        <li className="flex gap-4 py-1">
          <p>{game.gameId}</p>
          <JoinGame gameId={game.gameId} />
        </li>
      </div>
    );
  });

  // FIXME: not rendering new games, but games are in state

  return (
    <div>
      <ul className="border border-solid border-black p-2">{gamesListItems}</ul>
    </div>
  );
};

export default GamesList;
