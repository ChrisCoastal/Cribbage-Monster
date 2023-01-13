import React, { FC } from 'react';
import Card from 'src/components/UI/Card';
import Doughnut from 'src/components/UI/Doughnut';

type GamesWonProps = {
  gamesPlayed: number;
  gamesWon: number;
};

const GamesWon: FC<GamesWonProps> = ({ gamesPlayed, gamesWon }) => {
  const winRatio = Math.round((gamesWon / gamesPlayed) * 360);
  const centerText = `${Math.round((gamesWon / gamesPlayed) * 100)}%`;

  return (
    <Card customStyles="w-full h-full">
      <div>
        <h3>WIN RATIO</h3>
        <Doughnut degFill={winRatio} centerText={centerText} />
      </div>
    </Card>
  );
};

export default GamesWon;
