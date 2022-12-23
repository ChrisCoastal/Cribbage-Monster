import React, { FC } from 'react';
import { Tally, TallyPoints } from 'src/@types';

type HandTallyProps = {
  player: Tally;
  opponent: Tally;
  crib: TallyPoints;
};

const HandTally: FC<HandTallyProps> = ({ player, opponent, crib }) => {
  function renderScore(playerTally: Tally) {
    return (
      <>
        <div>
          <h3>{playerTally.displayName}</h3>
        </div>
        <div>
          <ul>
            {playerTally.score.fifteens && (
              <li>
                <p>
                  fifteens for <span>{playerTally.score.fifteens}</span>
                </p>
              </li>
            )}
            {playerTally.score.runs && (
              <li>
                <p>
                  runs for <span>{playerTally.score.runs}</span>
                </p>
              </li>
            )}
            {playerTally.score.pairs && (
              <li>
                <p>
                  pairs for <span>{playerTally.score.pairs}</span>
                </p>
              </li>
            )}
            {playerTally.score.flush && (
              <li>
                <p>
                  flush for <span>{playerTally.score.flush}</span>
                </p>
              </li>
            )}
            {playerTally.score.jack && (
              <li>
                <p>
                  suited jack for <span>{playerTally.score.jack}</span>
                </p>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex">
        {renderScore(player)}
        {renderScore(opponent)}
      </div>
    </div>
  );
};

export default HandTally;
