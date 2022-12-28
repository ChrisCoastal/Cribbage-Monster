import React, { FC } from 'react';

type AvatarProps = {
  imageUrl?: string;
};

const Avatar: FC<AvatarProps> = ({ imageUrl }) => {
  return (
    <div className=" mb-2 h-10 w-10 overflow-hidden rounded-full border border-white bg-slate-400"></div>
  );
};

export default Avatar;
