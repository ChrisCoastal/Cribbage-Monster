import React, { FC, useEffect, useState, useRef } from 'react';
import { set } from 'firebase/database';

import { GameStatus, PlayerPos, Tally } from 'src/@types';
import PlayerTally from 'src/components/PlayerTally/PlayerTally';

import { getGameRef, isHost, isScorePoints, scoreCap } from 'src/utils/helpers';

import useGameContext from 'src/hooks/useGameContext';
type HandTallyProps = {
  player: PlayerPos;
  opponent: PlayerPos;
  dealer: PlayerPos;
  pone: PlayerPos;
};

const HandTally: FC<HandTallyProps> = ({ player, opponent, pone, dealer }) => {
  const { gameState } = useGameContext();
  const [tallyIndex, setTallyIndex] = useState<number>(0);
  const [tallyPoints, setTallyPoints] = useState<null | Tally>(null);
  const [updatedScore, setUpdatedScore] = useState<{
    player1: { prev: number; cur: number };
    player2: { prev: number; cur: number };
  }>({ player1: gameState.score.player1, player2: gameState.score.player2 });

  console.log('tallyIndex', tallyIndex);

  useEffect(() => {
    console.log('tallyIndex', tallyIndex);

    const orderOfCount = [pone, dealer, dealer];
    const playerPos = orderOfCount[tallyIndex];
    const isCrib = tallyIndex === 2;
    const endTally = tallyIndex === 3;

    if (endTally) {
      const gameRef = getGameRef(gameState.gameId);
      console.log(updatedScore);

      isHost(player) &&
        set(gameRef, { ...gameState, status: GameStatus.DEAL, score: updatedScore });
      return;
    }

    const points = isCrib
      ? isScorePoints(gameState.crib, gameState.deckCut.card!, 'crib')
      : isScorePoints(gameState.playerCards[playerPos].played, gameState.deckCut.card!);

    console.log(points);

    const tally: Tally = {
      displayName: gameState.players[playerPos].displayName,
      avatar: gameState.players[playerPos].avatar,
      cards: isCrib ? gameState.crib : gameState.playerCards[playerPos].played,
      playerPos: playerPos,
      points
    };
    setTallyPoints(tally);
    const updatedCurScore = scoreCap(updatedScore[playerPos].cur + points.totalPoints);
    console.log('updatedCur', updatedCurScore);

    points.totalPoints &&
      setUpdatedScore((prevScore) => ({
        ...prevScore,
        [playerPos]: {
          prev: prevScore[playerPos].cur,
          cur: scoreCap(prevScore[playerPos].cur + points.totalPoints)
        }
      }));

    const timer = setTimeout(() => {
      setTallyPoints(null);
      updatedCurScore >= 121 ? setTallyIndex(3) : setTallyIndex((prev) => prev + 1);
    }, 4600);

    return () => clearTimeout(timer);
  }, [tallyIndex]);

  return (
    <div>
      <div className="relative overflow-hidden pt-2 sm:w-[26rem]">
        {tallyPoints && (
          <div>
            <PlayerTally
              cut={gameState.deckCut.card!}
              tally={tallyPoints}
              score={updatedScore[tallyPoints.playerPos]}
              handType={tallyIndex === 2 ? 'crib' : 'hand'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HandTally;
