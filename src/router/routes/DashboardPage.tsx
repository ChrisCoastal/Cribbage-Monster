import { useEffect, useState } from 'react';

import { LoaderFunctionArgs, useNavigate, useLoaderData } from 'react-router-dom';

import { get, onValue } from 'firebase/database';
import { HexColorPicker } from 'react-colorful';

import {
  AvatarSize,
  GameBrief,
  SettingsReducerTypes,
  UserSettingsState,
  UserStats
} from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useGameContext from 'src/hooks/useGameContext';
import useModal from 'src/hooks/useModal';

import CreateGame from 'src/components/CreateGame/CreateGame';
import GamesList from 'src/components/DashboardItems/GamesList/GamesList';
import Carousel from 'src/components/UI/Carousel';
import Badges from 'src/components/Badges/Badges';
import Avatar from 'src/components/Avatar/Avatar';
import { getGamesList, getUserStatsRef } from 'src/utils/helpers';
import AvatarPicker from 'src/components/AvatarPicker/AvatarPicker';

import { getUserSettingsRef } from 'src/utils/helpers';
import Button from 'src/components/UI/Button';
import AvatarModal from 'src/components/AvatarModal/AvatarModal';
import Doughnut from 'src/components/UI/Doughnut';
import GamesWon from 'src/components/DashboardItems/GamesWon/GamesWon';
import Card from 'src/components/UI/Card';
import CardBox from 'src/components/CardBox/CardBox';
import BarChart from 'src/components/UI/BarChart';
import GamesPlayed from 'src/components/DashboardItems/GamesPlayed/GamesPlayed';

export async function dashboardLoader({ params }: LoaderFunctionArgs) {
  try {
    const userSettingsRef = getUserSettingsRef(params.uid!);
    const userStatsRef = getUserStatsRef(params.uid!);
    const userSettings = await get(userSettingsRef).then((snapshot) => snapshot.val());
    const userStats = await get(userStatsRef).then((snapshot) => snapshot.val());
    const dashData = {
      userSettings,
      userStats
    };
    return dashData;
  } catch (err) {
    console.log(err);
  }
}

const DashboardPage = () => {
  const { userAuth } = useAuthContext();
  const { userSettingsState, dispatchSettings } = useSettingsContext();
  // const [gameState, dispatchGame] = useGameContext();
  const { userSettings, userStats } = useLoaderData() as {
    userSettings: UserSettingsState;
    userStats: UserStats;
  };
  const { Modal, isModal, modalHandler } = useModal();
  const isUser = userSettings.uid === userAuth?.uid;
  const navigate = useNavigate();

  function changeAvatar() {
    modalHandler(true);
  }

  useEffect(() => {
    if (!userSettings) navigate('/');
    if (userSettings.uid !== userAuth?.uid) console.log('no match');

    const userSettingsRef = getUserSettingsRef(userAuth!.uid!);
    const unsubscribe = onValue(
      userSettingsRef,
      (snapshot) => {
        dispatchSettings({ type: SettingsReducerTypes.UPDATE_SETTINGS, payload: snapshot.val() });
      },
      (error) => console.log(error)
    );
    return unsubscribe;
  }, []);

  const barTestValues = [
    { won: 16, totalValue: 18 },
    { won: 0, totalValue: 7 },
    { won: 1, totalValue: 3 },
    { won: 3, totalValue: 10 },
    { won: 0, totalValue: 0 },
    { won: 1, totalValue: 3 },
    { won: 3, totalValue: 9 }
  ];
  const dailyValues = [
    { date: '', won: 16, played: 18 },
    { date: '', won: 0, played: 7 },
    { date: '', won: 1, played: 3 },
    { date: '', won: 3, played: 10 },
    { date: '', won: 0, played: 0 },
    { date: '', won: 1, played: 3 },
    { date: '', won: 3, played: 9 }
  ];

  const barColLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 rounded-lg p-2 md:w-3/4 md:grid-cols-3 md:grid-rows-2">
          <div className="flex flex-col items-center">
            {isUser ? (
              // <div onClick={changeAvatar} className="group relative cursor-pointer">
              //   <Avatar size={AvatarSize.XL} avatar={userSettings.avatar || ''} />
              //   <p className="absolute left-1/2 bottom-2 -translate-x-1/2 cursor-pointer text-xs text-white opacity-60 transition-all duration-300 group-hover:opacity-90">
              //     edit
              //   </p>
              // </div>
              <AvatarModal isModal={isModal} Modal={Modal} modalHandler={modalHandler} />
            ) : (
              <Avatar size={AvatarSize.XL} avatar={userSettings.avatar || ''} />
            )}

            <Carousel customStyles="" />
            <p className="text-lg text-white">{`${userSettings.displayName}`}</p>
          </div>

          <Badges />
          <GamesList />
          <GamesWon gamesPlayed={userStats.gamesPlayed} gamesWon={userStats.gamesWon} />
          <GamesPlayed dailyGames={dailyValues} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
