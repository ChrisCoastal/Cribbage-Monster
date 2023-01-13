import React, { FC } from 'react';
import { DailyGames } from 'src/@types';
import BarChart from 'src/components/UI/BarChart';
import Card from 'src/components/UI/Card';
import SubHeading from 'src/components/UI/SubHeading';
import { MILLISEC_PER_DAY } from 'src/utils/constants';

type GamesPlayedProps = {
  dailyGames: { date: string; played: number; won: number }[];
};

const GamesPlayed: FC<GamesPlayedProps> = ({ dailyGames }) => {
  const colLabels = daysOfWeek().reverse();
  const barValues = dailyGames.map((games) => ({
    totalValue: games.played,
    won: games.won
  }));

  function daysOfWeek() {
    const days: any[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(Date.now() + i * MILLISEC_PER_DAY).toDateString().slice(0, 3);
      days.push(day);
    }
    return days;
  }

  return (
    <Card customStyles="w-full">
      <div className="h-full">
        <SubHeading>GAMES PLAYED</SubHeading>
        <BarChart barValues={barValues} colLabels={colLabels} />
      </div>
    </Card>
  );
};

export default GamesPlayed;
