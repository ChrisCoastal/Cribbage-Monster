import React, { FC, useEffect, useState } from 'react';
import { CardType, PlayerPos, Tally, TallyPoints } from 'src/@types';
import { useInterval } from 'src/hooks/useInterval';
import PlayerTally from 'src/components/PlayerTally/PlayerTally';
import anime from 'animejs';

import useGameContext from 'src/hooks/useGameContext';
type HandTallyProps = {
  dealer: PlayerPos;
  cut: CardType;
  player: Tally;
  opponent: Tally;
  crib: Tally;
};

const HandTally: FC<HandTallyProps> = ({ dealer, cut, player, opponent, crib }) => {
  const [count, setCount] = useState<number>(0);
  useInterval(() => setCount((prev) => prev + 1), 6000, 2);
  const { gameState } = useGameContext();
  const playerIsDealer = dealer === player.playerPos;

  function renderScoreItems(playerPos: PlayerPos, score: TallyPoints) {
    const scores = Object.entries(score).filter((score) => score[1] !== 0);
    // const delay = playerPos === dealer ? scores.length + 2 : 1;
    const scoreItems = scores.map((score, i) => {
      const [key, value] = score;
      // const animate = count === i + delay ? 'animate-text-grow' : '';
      if (key === 'totalPoints')
        return (
          <li key={key} className="relative inline">
            <span>{key.slice(0, 5).toUpperCase() + ': '}</span>
            <span className={`text-3xl font-bold`}>{value}</span>
          </li>
        );
      else
        return (
          <li key={key} className="relative inline">
            <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
            <span className={`font-bold`}>{value}</span>
          </li>
        );
    });

    return scoreItems;
  }

  const playerScores = renderScoreItems(player.playerPos, player.points);
  const playerTotal = playerScores.splice(-1, 1);
  const opponentScores = renderScoreItems(opponent.playerPos, opponent.points);
  const opponentTotal = opponentScores.splice(-1, 1);
  const cribScores = renderScoreItems(dealer, crib.points);
  const cribTotal = cribScores.splice(-1, 1);

  // useEffect(() => {
  //   // anime({
  //   //   targets: '.pone-tally',
  //   //   translateX: [1000, 0],
  //   //   opacity: [0, 1],
  //   //   direction: 'alternate',
  //   //   autoplay: true,
  //   //   easing: 'easeInOutSine',
  //   //   duration: 3000
  //   // });

  //   const timeline = anime.timeline({
  //     easing: 'easeOutExpo',
  //     duration: 16000
  //   });

  //   timeline.add({
  //     targets: ['.pone-tally'],
  //     translateX: [1000, 0],
  //     height: [0, '100%'],
  //     opacity: [0, 1],
  //     loop: 1,
  //     direction: 'alternate',
  //     duration: 6000
  //   });

  //   timeline.add({
  //     targets: ['.dealer-tally'],
  //     width: [0, '100%'],
  //     height: [0, '100%'],
  //     translateX: [1000, 0],
  //     opacity: [0, 1],
  //     loop: 1,
  //     direction: 'alternate',
  //     duration: 6000
  //   });

  //   timeline.add({
  //     targets: ['.crib-tally'],
  //     translateX: [1000, 0],
  //     height: [0, '100%'],
  //     opacity: [0, 1],
  //     loop: 1,
  //     direction: 'alternate',
  //     duration: 6000
  //   });
  // }, [count]);

  return (
    <div>
      <div className="relative mx-auto h-96 w-96 overflow-hidden pt-2">
        {count === 0 && (
          <>
            <p>player</p>
            <PlayerTally
              className={`animate-slide-in-out opacity-0`}
              // className={`${playerIsDealer ? 'dealer-tally' : 'pone-tally'}`}
              displayName={player.displayName}
              avatar={player.avatar}
              cards={player.cards}
              cut={cut}
              scores={playerScores}
              total={playerTotal}
            />
          </>
        )}
        {count === 1 && (
          <>
            <p>opponent</p>
            <PlayerTally
              className={`animate-slide-in-out opacity-0`}
              // className={`${playerIsDealer ? 'pone-tally' : 'dealer-tally'}`}
              displayName={opponent.displayName}
              avatar={opponent.avatar}
              cards={opponent.cards}
              cut={cut}
              scores={opponentScores}
              total={opponentTotal}
            />
          </>
        )}
        {count === 2 && (
          <>
            <p>crib</p>
            <PlayerTally
              className={`animate-slide-in-out opacity-0`}
              // className={`crib-tally`}
              displayName={crib.displayName}
              avatar={crib.avatar}
              cards={crib.cards}
              cut={cut}
              scores={cribScores}
              total={cribTotal}
            />
          </>
        )}

        {/* <div className="self-end text-sm">...next round in {16 - count > 0 ? 16 - count : 0}</div> */}
      </div>
    </div>
  );
};

export default HandTally;
