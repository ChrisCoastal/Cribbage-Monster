import React, { FC } from 'react';
import { AvatarSize } from 'src/@types';

import Avatar from 'src/components/Avatar/Avatar';

import { AVATARS } from 'src/utils/constants';

type AvatarPickerProps = {
  userAvatar: string;
  setSelection: (avatar: string) => void;
  selection: string | null;
};

const AvatarPicker: FC<AvatarPickerProps> = ({ selection, setSelection, userAvatar }) => {
  function changeAvatarHandler(avatar: string) {
    setSelection(avatar);
  }

  const avatars = AVATARS.map((avatar, i) => {
    const curAvatar = selection ? avatar === selection : avatar === userAvatar;
    return (
      <div
        key={i}
        onClick={() => changeAvatarHandler(avatar)}
        className={`${
          curAvatar ? 'outline-3 animate-pulse rounded-full outline outline-emerald-300' : ''
        } ${AvatarSize.MD} cursor-pointer`}>
        <Avatar className={AvatarSize.MD} avatar={avatar} />
      </div>
    );
  });

  return (
    <div>
      <div className="grid grid-cols-6 gap-3 rounded-md bg-stone-900 p-8">{avatars}</div>
    </div>
  );
};

export default AvatarPicker;
