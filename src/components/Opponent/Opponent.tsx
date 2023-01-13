import { FC } from 'react';
import { AvatarSize } from 'src/@types';

import Avatar from '../Avatar/Avatar';

type OpponentProps = {
  displayName: string;
  avatar?: string;
};

const Opponent: FC<OpponentProps> = ({ displayName, avatar = '' }) => {
  return (
    <div className="col-start-3 flex flex-col items-center justify-center pb-1">
      <p className="h-5 text-sm text-white">{displayName}</p>
      <Avatar size={AvatarSize.SM} avatar={avatar} />
    </div>
  );
};

export default Opponent;
