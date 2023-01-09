import React, { FC } from 'react';
import { AvatarSize } from 'src/@types';

type AvatarProps = {
  size: AvatarSize;
  avatar?: string;
};

const Avatar: FC<AvatarProps> = ({ size = AvatarSize.SM, avatar }) => {
  return (
    <div
      className={`${size} flex items-center justify-center overflow-hidden rounded-full border border-stone-600 bg-gradient-to-br from-emerald-300 to-emerald-700`}>
      <p className="pt-2">{avatar}</p>
    </div>
  );
};

export default Avatar;
