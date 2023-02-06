import React, { useEffect, useState } from 'react';

import { IsActive, GameStatus, PeggingType, PlayerPos } from 'src/@types';

import Player from '../Player/Player';
import useGameContext from 'src/hooks/useGameContext';
import useAuthContext from 'src/hooks/useAuthContext';
import { getPlayerOpponent } from 'src/utils/helpers';
import { nanoid } from 'nanoid';

const PlayerDisplay = () => {
  const [messagesNum, setMessagesNum] = useState<number>(8);
  const [messages, setMessages] = useState<string[]>([]);
  const { gameState } = useGameContext();
  const { userAuth } = useAuthContext();
  const uid = userAuth!.uid!;

  const { player, opponent } = getPlayerOpponent(gameState.players, uid);
  const dealer = gameState.dealer;
  const isDealer = player === dealer;

  useEffect(() => {
    updateStatusHandler(gameState.status);
  }, [gameState.status]);

  useEffect(() => {
    updateStatusHandler(gameState.status);
  }, [gameState.pegging.player1.length, gameState.pegging.player2.length]);

  function updateStatusHandler(status: GameStatus) {
    if (status === GameStatus.NEW) {
      setMessages((prev) =>
        maxMessagesLength([`${gameState.players[player].avatar} Waiting for opponent...`, ...prev])
      );
    }
    if (status === GameStatus.LAY_CRIB) {
      const dealerArticle = isDealer ? 'our' : `${gameState.players[dealer].displayName}'s`;
      setMessages((prev) =>
        maxMessagesLength([`It's ${dealerArticle} crib! Pick 2 cards to add.`, ...prev])
      );
    }
    if (status === GameStatus.PONE_CUT && !isDealer) {
      setMessages((prev) => maxMessagesLength(['Okay! Cut the deck!', ...prev]));
    }
    if (status === GameStatus.IS_CUT) {
      const dealerArticle = isDealer ? 'We' : `${gameState.players[dealer].displayName}`;
      setMessages((prev) =>
        maxMessagesLength([
          ` cut the ${gameState.deckCut.card?.name} of ${gameState.deckCut.card?.suit}`,
          ...prev
        ])
      );
    }
  }

  function updatePeggingHandler(points: PeggingType, playerPos: PlayerPos) {
    const pegText: string[] = [];
    for (const point in points) {
      const pointKey = point as keyof typeof points;
      if (points[pointKey] === 0) return;
      else pegText.push(`${pointKey === 'go' ? 'a go' : pointKey} for ${point}`);
    }
    setMessages((prev) =>
      maxMessagesLength([
        ...prev,
        `${gameState.players[playerPos].avatar} pegged ${pegText.join(' and ')}! `
      ])
    );
  }

  function maxMessagesLength(messages: string[]) {
    return messages.slice(-30);
  }

  console.log(messages.length);

  const renderMessages = messages.slice(-messagesNum).map((message) => (
    <li
      key={nanoid()}
      className="relative inline-block rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-xs text-stone-800">
      {message}
    </li>
  ));

  return (
    <div className="flex w-[376px] gap-4 rounded-md border border-stone-400 py-2 pl-10 pr-2 sm:py-2">
      <Player
        playerPos={player}
        isDealer={isDealer}
        displayName={gameState.players[player].displayName}
        avatar={gameState.players[player].avatar}
        isActive={gameState.players[player].activePlayer === IsActive.ACTIVE}
      />
      <div className="">
        <ul className="mt-1 flex max-h-20 flex-col-reverse gap-1 overflow-y-scroll sm:h-[6.2rem]">
          {/* <p className="w-40 animate-pulse rounded-md bg-stone-800 text-xs font-medium text-stone-50">
            {gameState.players[player].activePlayer === IsActive.ACTIVE
              ? `YOUR TURN`
              : `WAITING FOR OPPONENT...`}
          </p> */}
          {/* <li className="relative inline-block rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-xs text-stone-800 sm:text-sm sm:leading-tight">
            <span className="leading-below">
              {dealer ? `It's ${dealerArticle} crib. Pick 2 cards to add.` : 'no dealer'}
            </span>
          </li>
          <li className="relative inline-block rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-xs text-stone-800 sm:text-sm sm:leading-tight">
            Another message
          </li> */}
          {renderMessages}
        </ul>
      </div>
    </div>
  );
};

export default PlayerDisplay;
