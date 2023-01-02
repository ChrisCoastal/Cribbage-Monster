import { useEffect, useState } from 'react';

import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { get, onValue } from 'firebase/database';
import { HexColorPicker } from 'react-colorful';

import { AvatarSize, GameBrief, UserSettingsState } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useModal from 'src/hooks/useModal';

import CreateGame from 'src/components/CreateGame/CreateGame';
import GamesList from 'src/components/GamesList/GamesList';
import Carousel from 'src/components/UI/Carousel';
import Badges from 'src/components/Badges/Badges';
import Avatar from 'src/components/Avatar/Avatar';
import { getGamesList } from 'src/utils/helpers';
import AvatarPicker from 'src/components/AvatarPicker/AvatarPicker';

import { getUserSettingsRef } from 'src/utils/helpers';

export async function dashboardLoader({ params }: LoaderFunctionArgs) {
  try {
    const userSettingsRef = getUserSettingsRef(params.uid!);
    const userSettings = await get(userSettingsRef);

    return userSettings.val();
  } catch (err) {
    console.log(err);
  }
}

const DashboardPage = () => {
  const { userAuth } = useAuthContext();
  const userSettings = useLoaderData() as UserSettingsState;
  console.log(userSettings);

  const { Modal, isModal, modalHandler } = useModal();

  function changeAvatar() {
    modalHandler(true);
  }

  return (
    <>
      {isModal && (
        <Modal isVisible={isModal} title={''} customStyles={'bg-stone-800 text-white'}>
          <div className="flex flex-col gap-4">
            <AvatarPicker />
            <div className="flex">
              <HexColorPicker className="w-full" />
            </div>
          </div>
        </Modal>
      )}
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 rounded-lg p-2 md:w-3/4 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <div onClick={changeAvatar} className="group relative cursor-pointer">
              <Avatar size={AvatarSize.XL} avatar={userSettings?.avatar || ''} />
              <p className="absolute left-1/2 bottom-2 -translate-x-1/2 cursor-pointer text-xs text-white opacity-60 transition-all duration-300 group-hover:opacity-90">
                edit
              </p>
            </div>
            <Carousel customStyles="" />
            <p className="text-lg text-white">{`${userAuth?.displayName}`}</p>
          </div>

          <Badges />
          <GamesList />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
