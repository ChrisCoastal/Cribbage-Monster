import React, { FC, useEffect, useState } from 'react';
import { update } from 'firebase/database';

import { AvatarSize } from 'src/@types';

import useSettingsContext from 'src/hooks/useSettingsContext';

import Button from 'src/components/UI/Button';
import AvatarPicker from 'src/components/AvatarPicker/AvatarPicker';
import useAuthContext from 'src/hooks/useAuthContext';

import { getUserSettingsRef } from 'src/utils/helpers';
import Avatar from 'src/components/Avatar/Avatar';

type AvatarModalProps = {
  isModal: boolean;
  modalHandler: (isVisible: boolean) => void;
  Modal: FC<any>;
};

const AvatarModal: FC<AvatarModalProps> = ({ Modal, isModal, modalHandler }) => {
  const [avatarSelection, setAvatarSelection] = useState<string | null>(null);

  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  // const { isModal, Modal, modalHandler } = useModal();

  function saveAvatarHandler() {
    modalHandler(false);
    const userSettingsRef = getUserSettingsRef(userAuth!.uid!);
    update(userSettingsRef, { avatar: avatarSelection });
  }

  function changeAvatar() {
    modalHandler(true);
  }

  useEffect(() => {
    !isModal && setAvatarSelection(null);
  }, [isModal]);

  return (
    <>
      <div onClick={changeAvatar} className="group relative cursor-pointer">
        <Avatar
          avatar={userSettingsState.avatar}
          className={`${AvatarSize.XL} lg:h-48 lg:w-48 lg:text-[8.8rem]`}
        />
        <p className="absolute left-1/2 bottom-2 -translate-x-1/2 cursor-pointer text-xs text-stone-50 opacity-50 transition-all duration-300 group-hover:opacity-90">
          edit
        </p>
      </div>
      {isModal && (
        <Modal
          isVisible={isModal}
          title={'Choose a character'}
          className={'bg-stone-800 text-stone-50'}>
          <div className="flex flex-col gap-4">
            <AvatarPicker
              userAvatar={userSettingsState.avatar}
              setSelection={setAvatarSelection}
              selection={avatarSelection}
            />
            <div className="flex justify-end">
              <Button handler={saveAvatarHandler}>save</Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AvatarModal;
