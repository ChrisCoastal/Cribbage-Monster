import React, { FC } from 'react';
import Card from 'src/components/UI/Card';
import Doughnut from 'src/components/UI/Doughnut';
import SubHeading from 'src/components/UI/SubHeading';
import ToolTip from 'src/components/UI/ToolTip';

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
        <SubHeading>WIN RATIO</SubHeading>
        <div className="relative">
          <ToolTip text={`${gamesWon} / ${gamesPlayed}`} />
          <Doughnut degFill={winRatio} centerText={centerText} />
        </div>
      </div>
    </Card>
  );
};

export default GamesWon;
