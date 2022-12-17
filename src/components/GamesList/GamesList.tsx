import React, { FC, ReactNode, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { rtdb } from 'src/firestore.config';
import { GameBrief } from 'src/@types';
import JoinGame from '../JoinGame/JoinGame';
type GamesListProps = {
  // games:
};

const GamesList: FC<GamesListProps> = () => {
  const [games, setGames] = useState<GameBrief[]>([]);

  function renderGameListItem(game: GameBrief) {
    return (
      <>
        <li className="flex gap-4 py-1">
          <p>{game.gameId}</p>
          <JoinGame gameId={game.gameId} />
        </li>
      </>
    );
  }

  useEffect(() => {
    const games: GameBrief[] = [];
    const gamesListRef = ref(rtdb, `gameslist`);
    const unsubscribe = onValue(gamesListRef, (snapshot) => {
      console.log(snapshot.val());
      const gameBriefs = snapshot.val() as { [key: string]: GameBrief };
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
    <div>
      <ul className="border border-solid border-black p-2">
        {games.map((game) => renderGameListItem(game))}
      </ul>
    </div>
  );
};

export default GamesList;
