import React, { FC, ReactNode, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { rtdb } from 'src/firestore.config';
import { GameBrief } from 'src/@types';
import JoinGame from '../JoinGame/JoinGame';
type GamesListProps = {
  games: GameBrief[];
};

const GamesList: FC<GamesListProps> = ({ games }) => {
  const gamesListItems = games.map((game) => {
    console.log('rendering gamelist', game);

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
  // check this might be a dev server issue

  return (
    <div>
      <ul className="border border-solid border-black p-2">{gamesListItems}</ul>
    </div>
  );
};

export default GamesList;
