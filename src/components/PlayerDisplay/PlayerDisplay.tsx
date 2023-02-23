import React, { useEffect, useState } from 'react';

import { IsActive, GameStatus, PeggingType, PlayerPos } from 'src/@types';

import Player from '../Player/Player';
import useGameContext from 'src/hooks/useGameContext';
import useAuthContext from 'src/hooks/useAuthContext';
import { getPlayerOpponent } from 'src/utils/helpers';
import MessageTail from '../UI/icons/MessageTail/MessageTail';
import anime from 'animejs';

const PlayerDisplay = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { gameState } = useGameContext();
  const { userAuth } = useAuthContext();
  const uid = userAuth!.uid!;

  const { player, opponent } = getPlayerOpponent(gameState.players, uid);
  const playerPegging = Object.values(gameState.pegging[player]);
  const opponentPegging = Object.values(gameState.pegging[opponent]);
  const dealer = gameState.dealer;
  const isDealer = player === dealer;

  useEffect(() => {
    updateStatusHandler(gameState.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.status]);

  useEffect(() => {
    if (
      gameState.players[player].activePlayer === IsActive.NOT_ACTIVE &&
      message === "👋 Hey! It's our turn to play a card."
    )
      setMessage('Nice play! I was almost 😴.');
    if (gameState.players[player].activePlayer === IsActive.NOT_ACTIVE) return;
    const timer = setTimeout(() => {
      setMessage("👋 Hey! It's our turn to play a card.");
    }, 18000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.players[player].activePlayer, gameState.players[opponent].activePlayer]);

  useEffect(() => {
    if (!playerPegging.length) return;
    const pegging = playerPegging.at(-1)!;
    updatePeggingHandler(pegging, player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPegging.length]);

  useEffect(() => {
    if (!opponentPegging.length) return;
    const pegging = opponentPegging.at(-1)!;
    updatePeggingHandler(pegging, opponent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opponentPegging.length]);

  function updateStatusHandler(status: GameStatus) {
    switch (status) {
      case GameStatus.NEW: {
        if (!gameState.players[opponent].displayName.length) {
          setMessage(`${gameState.players[player].avatar} Waiting for opponent...`);
        }
        break;
      }

      case GameStatus.JOINED: {
        if (gameState.players[opponent].displayName.length) {
          setMessage(
            `${gameState.players[opponent].avatar} ${gameState.players[opponent].displayName} joined.`
          );
        }

        break;
      }

      case GameStatus.LAY_CRIB: {
        const dealerArticle = isDealer ? 'our' : `${gameState.players[dealer].displayName}'s`;
        const newMessage = `It's ${dealerArticle} crib! Pick 2 cards to add.`;
        if (message === newMessage) return;
        setMessage(`It's ${dealerArticle} crib! Pick 2 cards to add.`);
        break;
      }

      case GameStatus.PONE_CUT: {
        if (!isDealer) {
          setMessage('Okay! Cut the deck!');
        }
        if (isDealer) {
          setMessage(`Nice choice! ${gameState.players[opponent].avatar} is cutting the deck!`);
        }
        break;
      }

      case GameStatus.IS_CUT: {
        const poneArticle = !isDealer ? 'We' : `${gameState.players[opponent].displayName}`;
        setMessage(
          `${poneArticle} cut the ${
            gameState.deckCut.card?.name
          } of ${gameState.deckCut.card?.suit.toLowerCase()}.`
        );
        break;
      }

      case GameStatus.WINNER: {
        setMessage(null);
        break;
      }
      default:
        break;
    }
  }

  function updatePeggingHandler(pegging: PeggingType, playerPos: PlayerPos) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalPoints, ...points } = pegging;
    const pegText: string[] = [];

    for (const point in points) {
      const pointKey = point as keyof typeof points;
      if (points[pointKey] === 0) null;
      else pegText.push(`${pointKey === 'go' ? 'a GO' : pointKey} for ${points[pointKey]}`);
    }

    const isPlayer = playerPos === player;
    const playerArticle = isPlayer ? 'We' : `${gameState.players[opponent].displayName}`;
    setMessage(
      `${playerArticle} pegged ${pegText.join(' and ')}${
        isPlayer ? '! ' + gameState.players[playerPos].avatar + '🎉' : '.'
      }`
    );
  }

  useEffect(() => {
    anime({
      targets: '.animate-message',
      scale: [
        { value: 0, duration: 0 },
        { value: 1.05, duration: 200 },
        { value: 1, duration: 200 }
      ],
      translateX: [-8, 0],
      translateY: [8, 0],
      easing: 'spring(0.5, 100, 10, 0)'
    });
  }, [message]);

  return (
    <div className="flex w-[376px] gap-4 rounded-md border border-stone-400 py-2 pl-10 pr-4 sm:py-2">
      <Player
        playerPos={player}
        isDealer={isDealer}
        displayName={gameState.players[player].displayName}
        avatar={gameState.players[player].avatar}
        isActive={gameState.players[player].activePlayer === IsActive.ACTIVE}
      />
      <div className="flex-shrink">
        <ul className="mt-1 flex max-h-20 flex-col-reverse gap-1 sm:max-h-[6.5rem]">
          {message && (
            <li className="animate-message relative inline-block origin-bottom-left rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-sm text-stone-800">
              {message}
              <MessageTail height="36" width="36" className="absolute left-0" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlayerDisplay;
