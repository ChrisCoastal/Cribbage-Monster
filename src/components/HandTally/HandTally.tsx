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

type HandTallyProps = {
  dealer: PlayerPos;
  cut: CardType;
  player: Tally;
  opponent: Tally;
  crib: TallyPoints;
};

const HandTally: FC<HandTallyProps> = ({ dealer, cut, player, opponent, crib }) => {
  const [count, setCount] = useState<number>(0);
  const playerCards = useInterval(() => setCount((prev) => prev + 1), 1000);

  function renderScoreItems(playerTally: Tally) {
    const { totalPoints, ...points } = playerTally.score;
    const scores = Object.entries(points);
    const delay = playerTally.playerPos === dealer ? scores.length : 0;
    console.log(scores);

    const scoreItems = scores.map((score, i) => {
      const [key, value] = score;
      const animate = count === i + delay ? 'animate-text-grow' : '';
      console.log('value', typeof value);

      return (
        <li key={nanoid()} className="relative inline">
          <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
          {count >= i + delay ? (
            <span className={`${animate} absolute left-[104%] text-sm font-bold`}>
              {value.toString()}
            </span>
          ) : (
            `  `
          )}
        </li>
      );
    });

    return scoreItems;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 pt-2">
        <PlayerTally cards={player.cards} cut={cut}>
          {renderScoreItems(player)}
        </PlayerTally>
        <PlayerTally cards={opponent.cards} cut={cut}>
          {renderScoreItems(opponent)}
        </PlayerTally>
        <div className="self-end text-sm">...next round in {12 - count}</div>
      </div>
    </div>
  );
};

export default HandTally;
