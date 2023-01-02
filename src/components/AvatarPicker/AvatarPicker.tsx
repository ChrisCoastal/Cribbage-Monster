import React, { useState } from 'react';

import { AvatarSize } from 'src/@types';

import { AVATARS } from 'src/utils/constants';
import Avatar from '../Avatar/Avatar';
type Props = {
  //
};

const AvatarPicker = () => {
  const [selected, setSelected] = useState<number>(0);

  function changeAvatarHandler(avatarIndex: number) {
    setSelected(avatarIndex);
  }

  const curAvatar = 'cur';

  const avatars = AVATARS.map((avatar, i) => (
    <div
      key={i}
      onClick={() => changeAvatarHandler(i)}
      className={`${
        i === selected ? 'outline-3 animate-pulse rounded-full outline outline-emerald-300' : ''
      } cursor-pointer`}>
      <Avatar size={AvatarSize.MD} avatar={avatar} />
    </div>
  ));

  return (
    <div>
      <div>
        <h3>avatars</h3>
        <div className="grid grid-cols-6 gap-3 rounded-md bg-stone-900 p-8">{avatars}</div>
        <div></div>
        <h3>background color</h3>
      </div>
    </div>
  );
};

export default AvatarPicker;
