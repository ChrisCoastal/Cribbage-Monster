import { FC } from 'react';
import { AvatarSize, PlayerPos } from 'src/@types';

import Avatar from '../Avatar/Avatar';

type PlayerProps = {
  playerPos: PlayerPos;
  displayName: string;
  isDealer: boolean;
  avatar?: string;
  isActive?: boolean;
  className?: string;
};

const Player: FC<PlayerProps> = ({
  playerPos,
  displayName,
  isDealer,
  avatar = '',
  isActive = false,
  className
}) => {
  const playerColor =
    playerPos === PlayerPos.P_ONE
      ? 'bg-purple-500 ring-purple-500'
      : 'bg-emerald-400 ring-emerald-400';

  const playerOutline =
    playerPos === PlayerPos.P_ONE ? 'outline-purple-500' : 'outline-emerald-400';
  return (
    <div className={`${className} col-start-3 flex flex-col items-center justify-center gap-1`}>
      <div className="flex items-center gap-1">
        {displayName.length ? (
          <>
            <span
              className={`${playerColor} h-2 w-2 rounded-full ring-1 ring-offset-1 ring-offset-stone-800`}></span>
            <p className="text-sm font-medium text-stone-50">{displayName || 'k'}</p>
          </>
        ) : (
          <p className="text-sm font-medium text-stone-800">{displayName || 'no player'}</p>
        )}
      </div>
      <div className={`relative `}>
        <span
          className={`absolute h-16 w-16 md:h-20 md:w-20 ${
            isActive ? `${playerOutline} animate-pulse rounded-full outline outline-2` : ''
          }`}></span>
        <Avatar
          className={`${AvatarSize.MD} ${
            !displayName.length ? 'from-stone-700 to-stone-900' : ''
          } shadow-md md:h-20 md:w-20 md:text-[4.2rem]`}
          avatar={avatar}
        />
        {isDealer ? (
          <div className="absolute -bottom-[2px] right-1/2 translate-x-1/2 rounded-full bg-emerald-300 px-2 text-2xs font-semibold text-stone-900">
            <p>DEALER</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Player;
