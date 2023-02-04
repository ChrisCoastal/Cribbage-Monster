import { FC } from 'react';
import { AvatarSize, PlayerPos } from 'src/@types';

import Avatar from '../Avatar/Avatar';

type PlayerProps = {
  playerPos: PlayerPos;
  displayName: string;
  avatar?: string;
  className?: string;
};

const Player: FC<PlayerProps> = ({ playerPos, displayName, avatar = '', className }) => {
  const playerColor =
    playerPos === PlayerPos.P_ONE ? 'bg-red-500 ring-red-500' : 'bg-emerald-400 ring-emerald-400';
  return (
    <div className={`${className} col-start-3 flex flex-col items-center justify-center`}>
      <div className="flex items-center gap-1">
        <span
          className={`${playerColor} h-2 w-2 rounded-full ring-1 ring-offset-1 ring-offset-stone-800`}></span>
        <p className="text-sm font-medium text-stone-50">{displayName}</p>
      </div>
      <Avatar className={`${AvatarSize.MD} md:h-20 md:w-20 md:text-[4.2rem]`} avatar={avatar} />
    </div>
  );
};

export default Player;
