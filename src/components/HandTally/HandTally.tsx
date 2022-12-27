import { nanoid } from 'nanoid';
import React, { FC, useEffect, useState } from 'react';
import {
  CardBoxHeight,
  CardBoxWidth,
  CardOverlap,
  CardsIndex,
  CardType,
  PlayerPos,
  Tally,
  TallyPoints
} from 'src/@types';
import { useInterval } from 'src/hooks/useInterval';
import Avatar from 'src/components/Avatar/Avatar';
import CardBox from 'src/components/CardBox/CardBox';
import PlayerTally from 'src/components/PlayerTally/PlayerTally';
import { getPone } from 'src/utils/helpers';

type HandTallyProps = {
  dealer: PlayerPos;
  cut: CardType;
  player: Tally;
  opponent: Tally;
  crib: TallyPoints;
};

const HandTally: FC<HandTallyProps> = ({ dealer, cut, player, opponent, crib }) => {
  const [count, setCount] = useState<number>(0);
  useInterval(() => setCount((prev) => prev + 1), 1000);
  const pone = getPone;

  function renderScoreItems(playerPos: PlayerPos, score: TallyPoints) {
    const scores = Object.entries(score);
    const delay = playerPos === dealer ? scores.length + 1 : 1;
    const scoreItems = scores.map((score, i) => {
      const [key, value] = score;
      const animate = count === i + delay ? 'animate-text-grow' : '';
      if (key === 'totalPoints')
        return (
          <li key={key} className="relative inline">
            <span>{key.slice(0, 5).toUpperCase() + ': '}</span>
            {count >= i + delay ? (
              <span className={`${animate} absolute left-[104%] text-3xl font-bold`}>{value}</span>
            ) : (
              `  `
            )}
          </li>
        );
      else
        return (
          <li key={key} className="relative inline">
            <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
            {count >= i + delay ? (
              <span className={`${animate} absolute left-[104%] font-bold`}>{value}</span>
            ) : (
              `  `
            )}
          </li>
        );
    });

    return scoreItems;
  }

  const playerScores = renderScoreItems(player.playerPos, player.score);
  const playerTotal = playerScores.splice(-1, 1);
  const opponentScores = renderScoreItems(opponent.playerPos, opponent.score);
  const opponentTotal = opponentScores.splice(-1, 1);

  return (
    <div>
      <div className="flex flex-col gap-4 pt-2">
        <PlayerTally
          displayName={player.displayName}
          cards={player.cards}
          cut={cut}
          scores={playerScores}
          total={playerTotal}
        />

        <PlayerTally
          displayName={opponent.displayName}
          cards={opponent.cards}
          cut={cut}
          scores={opponentScores}
          total={opponentTotal}
        />

        <div className="self-end text-sm">...next round in {16 - count > 0 ? 16 - count : 0}</div>
      </div>
    </div>
  );
};

export default HandTally;
