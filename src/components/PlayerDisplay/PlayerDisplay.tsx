import React from 'react';

import { IsActive } from 'src/@types';

import Player from '../Player/Player';
import useGameContext from 'src/hooks/useGameContext';
import useAuthContext from 'src/hooks/useAuthContext';
import { getPlayerOpponent } from 'src/utils/helpers';

const PlayerDisplay = () => {
  const { gameState } = useGameContext();
  const { userAuth } = useAuthContext();
  const uid = userAuth!.uid!;

  const { player, opponent } = getPlayerOpponent(gameState.players, uid);
  const dealer = gameState.dealer;
  const isDealer = player === dealer;
  const dealerArticle = isDealer ? 'our' : `${gameState.players[dealer].displayName}'s`;

  return (
    <div className="flex w-[376px] gap-4 rounded-md border border-stone-400/60 py-2 pl-10 pr-2 sm:py-2">
      <Player
        playerPos={player}
        isDealer={isDealer}
        displayName={gameState.players[player].displayName}
        avatar={gameState.players[player].avatar}
        isActive={gameState.players[player].activePlayer === IsActive.ACTIVE}
      />
      <div className="flex-1 rounded-md p-1">
        <ul className="overflow-y-scroll leading-tight">
          <li className="relative inline-block rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-500 py-1 px-2 text-xs leading-tight text-stone-800 sm:text-sm">
            {dealer ? `It's ${dealerArticle} crib. Pick two cards to add.` : 'no dealer'}
          </li>
          <li className="relative inline-block rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-500 px-2 text-xs text-stone-800 sm:text-sm"></li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerDisplay;
