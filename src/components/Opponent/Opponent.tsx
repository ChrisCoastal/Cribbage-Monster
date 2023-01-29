import { FC } from 'react';
import { AvatarSize } from 'src/@types';

import Avatar from '../Avatar/Avatar';

type OpponentProps = {
  displayName: string;
  avatar?: string;
};

const Opponent: FC<OpponentProps> = ({ displayName, avatar = '' }) => {
  return (
    <div className="col-start-3 flex flex-col items-center justify-center pb-1 md:pb-3">
      <p className="h-5 text-sm font-medium text-stone-50">{displayName}</p>
      <Avatar className={`${AvatarSize.MD} md:h-20 md:w-20 md:text-[4.2rem]`} avatar={avatar} />
    </div>
  );
};

export default Opponent;
