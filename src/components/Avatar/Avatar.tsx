import React, { FC } from 'react';

type AvatarProps = {
  avatar?: string;
  className?: string;
};

const Avatar: FC<AvatarProps> = ({ avatar, className }) => {
  return (
    <div
      className={`${className} flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-stone-900`}>
      <p className={`pt-2`}>{avatar}</p>
    </div>
  );
};

export default Avatar;
