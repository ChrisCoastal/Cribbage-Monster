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
  const winLossRatio = Math.round(gamesWon / (gamesPlayed || 1));
  const winRatio = winLossRatio * 360;
  const centerText = `${winLossRatio * 100}%`;

  return (
    <Card padding="md">
      <div>
        <SubHeading>WIN RATIO</SubHeading>
        <div className="relative">
          <ToolTip text={`${gamesWon} wins | ${gamesPlayed} played`}>
            <Doughnut degFill={winRatio} centerText={centerText} />
          </ToolTip>
        </div>
      </div>
    </Card>
  );
};

export default GamesWon;
