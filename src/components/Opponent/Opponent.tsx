import { FC } from 'react';

import Avatar from '../Avatar/Avatar';

type OpponentProps = {
  displayName: string;
};

const Opponent: FC<OpponentProps> = ({ displayName }) => {
  return (
    <div className="col-start-3 flex flex-col items-center justify-center">
      <p className="h-5 text-sm text-white">{displayName}</p>
      <Avatar />
    </div>
  );
};

export default Opponent;
