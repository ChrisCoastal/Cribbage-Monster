import React, { FC, ReactNode, useEffect } from 'react';
import {
  CardBoxHeight,
  CardBoxWidth,
  CardOverlap,
  CardsIndex,
  CardSize,
  CardType,
  AvatarSize,
  PlayerPos,
  Tally,
  TallyPoints,
  ScoreType
} from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';
import CardBox from 'src/components/CardBox/CardBox';
import PlayerTallyScore from 'src/components/PlayerTallyScore/PlayerTallyScore';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';
import { getCardValues } from 'src/utils/helpers';
import anime from 'animejs';
import Card from 'src/components/UI/Card';

type PlayerTallyProps = {
  // displayName: string;
  // avatar: string;
  // cards: CardsIndex;
  tally: Tally;
  score: ScoreType;
  cut: CardType;
  // scores: ReactNode;
  // total: ReactNode;
  handType: 'hand' | 'crib';
  className?: string;
  children?: ReactNode;
};

const PlayerTally: FC<PlayerTallyProps> = ({
  // displayName,
  // avatar,
  // cards,
  tally,
  score,
  cut,
  // scores,
  // total,
  handType,
  className
}) => {
  const cardValues = getCardValues(tally.cards) as CardType[];

  // const { gameState } = useGameContext();

  function renderCards(
    cards: CardType[] = [],
    faceUp: boolean,
    cardSize: CardSize,
    overlap: CardOverlap
  ) {
    return cards.map((card, i) => (
      <PlayingCard
        key={card.id}
        isFaceUp={faceUp}
        cardSize={cardSize}
        cardIndex={i}
        card={card}
        overlap={overlap}
      />
    ));
  }

  const playerCards = renderCards(cardValues, true, CardSize.MD, CardOverlap.HALF);
  const cutCard = (
    <PlayingCard
      isFaceUp={true}
      cardSize={CardSize.MD}
      cardIndex={0}
      card={cut}
      overlap={CardOverlap.NONE}
    />
  );

  // const playerScores = {
  //   prev: gameState.score[playerPos].prev,
  //   hand: gameState.score[playerPos].prev + player.points.totalPoints,
  //   crib:
  //     gameState.score[playerPos].prev +
  //     player.points.totalPoints +
  //     (playerIsDealer ? crib.points.totalPoints : 0)
  // };

  // const opponentScores = {
  //   prev: gameState.score[opponent.playerPos].prev,
  //   hand: gameState.score[opponent.playerPos].prev + opponent.points.totalPoints,
  //   crib:
  //     gameState.score[opponent.playerPos].prev +
  //     opponent.points.totalPoints +
  //     (!playerIsDealer ? crib.points.totalPoints : 0)
  // };

  useEffect(() => {
    setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        anime({
          targets: `.animate-item-${i}`,
          translateY: [
            { value: 60, duration: 0, delay: 0 },
            { value: 0, duration: 800, delay: 120 * i }
          ],
          opacity: [
            { value: 0, duration: 0, delay: 0 },
            { value: 1, duration: 800, delay: 120 * i }
          ],

          easing: 'spring(0.5, 100, 10, 0)'
        });
      }
    }, 800);

    setTimeout(() => {
      anime({
        targets: `.board-position`,
        scale: [
          { value: 0, duration: 100 },
          { value: 1.4, delay: 800 },
          { value: 1, delay: 500 }
        ],
        opacity: [
          { value: 0, duration: 0, delay: 0 },
          { value: 1, duration: 300, delay: 120 }
        ],

        easing: 'spring(0.5, 100, 10, 0)'
      });
    }, 1200);
  }, []);

  function renderScoreItems(score: TallyPoints) {
    const scores = Object.entries(score).filter(
      (score) => score[1] !== 0 || score[0] === 'totalPoints'
    );
    // const delay = playerPos === dealer ? scores.length + 2 : 1;
    const scoreItems = scores.map((score, i) => {
      const [key, value] = score;
      // const animate = count === i + delay ? 'animate-text-grow' : '';
      if (key === 'totalPoints')
        return (
          <li
            key={key}
            className={`relative inline text-2xl tracking-wide animate-item-${i} opacity-0`}>
            <span>{key.slice(0, 5).toUpperCase() + ': '}</span>
            <span className={` font-semibold`}>{value}</span>
          </li>
        );
      else
        return (
          <li key={key} className={`relative inline tracking-wide animate-item-${i} opacity-0`}>
            <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
            <span className={`font-semibold`}>{value}</span>
          </li>
        );
    });

    return scoreItems;
  }

  const renderScores = renderScoreItems(tally.points);
  const totalScore = renderScores.splice(-1, 1);
  // const renderOpponentScores = renderScoreItems(opponent.playerPos, opponent.points);
  // const opponentTotal = renderOpponentScores.splice(-1, 1);
  // const renderCribScores = renderScoreItems(dealer, crib.points);
  // const cribTotal = renderCribScores.splice(-1, 1);

  return (
    <>
      <Card padding="md" className={`${className}`}>
        <div className="flex items-center gap-2">
          <div>
            <Avatar className={AvatarSize.MD} avatar={tally.avatar} />
          </div>
          <h3 className="text-lg tracking-wide">
            {tally.displayName}&apos;s {handType}
          </h3>
        </div>
        <div className="flex justify-center gap-4 py-12">
          <CardBox
            maxCards={4}
            size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_FOUR_HALF }}
            overlap={CardOverlap.HALF}>
            {playerCards}
          </CardBox>
          <CardBox
            maxCards={0}
            size={{ height: CardBoxHeight.MD, width: CardBoxWidth.MD_ONE }}
            overlap={CardOverlap.NONE}>
            {cutCard}
          </CardBox>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {/* <ul className="grid grid-cols-2 justify-items-start gap-x-4 text-xs">{scores}</ul> */}
            <ul className="mb-6 flex flex-col gap-3 text-sm">{renderScores}</ul>
            <ul className="flex items-center justify-between text-2xl font-bold">{totalScore} </ul>
          </div>
          <div className="mr-4 flex h-24 w-24 items-center justify-center rounded-full border border-purple-500 text-xl font-bold">
            <PlayerTallyScore score={score} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default PlayerTally;
