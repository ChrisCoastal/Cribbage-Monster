import React, { FC, ReactNode, useEffect } from 'react';
import anime from 'animejs';

import {
  CardBoxHeight,
  CardBoxWidth,
  CardOverlap,
  CardSize,
  CardType,
  AvatarSize,
  PlayerPos,
  Tally,
  TallyPoints,
  ScoreType
} from 'src/@types';

import { getCardValues } from 'src/utils/helpers';

import Avatar from 'src/components/Avatar/Avatar';
import Card from 'src/components/UI/Card';
import CardBox from 'src/components/CardBox/CardBox';
import PlayerTallyScore from 'src/components/PlayerTallyScore/PlayerTallyScore';
import PlayingCard from 'src/components/PlayingCard/PlayingCard';

type PlayerTallyProps = {
  tally: Tally;
  score: ScoreType;
  cut: CardType;
  handType: 'hand' | 'crib';
  className?: string;
  children?: ReactNode;
};

const PlayerTally: FC<PlayerTallyProps> = ({ tally, score, cut, handType, className }) => {
  const cardValues = getCardValues(tally.cards) as CardType[];

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

    const scoreItems = scores.map((score, i) => {
      const [key, value] = score;
      if (key === 'totalPoints')
        return (
          <li key={key} className={`text-2xl tracking-wide animate-item-${i} opacity-0`}>
            <span>{key.slice(0, 5).toUpperCase() + ': '}</span>
            <span className={` font-semibold`}>{value}</span>
          </li>
        );
      else
        return (
          <li key={key} className={`tracking-wide animate-item-${i} opacity-0`}>
            <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
            <span className={`font-semibold`}>{value}</span>
          </li>
        );
    });

    return scoreItems;
  }

  const renderScores = renderScoreItems(tally.points);
  const totalScore = renderScores.splice(-1, 1);
  const scoreColor =
    tally.playerPos === PlayerPos.P_ONE ? 'outline-purple-500' : 'outline-emerald-400';

  return (
    <>
      <Card padding="md" className={`${className}`}>
        <div className="flex items-center gap-2">
          <div className={`relative `}>
            <span
              className={`absolute h-20 w-20 ${scoreColor} animate-pulse rounded-full outline outline-2
              `}></span>
            <Avatar className={`${AvatarSize.LG}`} avatar={tally.avatar} />
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
            <ul className="mb-6 flex flex-col gap-3 text-sm">{renderScores}</ul>
            <ul className="flex items-center justify-between text-2xl font-bold">{totalScore} </ul>
          </div>
          <div
            className={`mr-4 flex h-24 w-24 items-center justify-center rounded-full outline-double outline-1 ${scoreColor} text-xl font-bold`}>
            <PlayerTallyScore score={score} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default PlayerTally;
