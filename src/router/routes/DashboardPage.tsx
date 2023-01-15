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
import SubHeading from 'src/components/UI/SubHeading';

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

  const dailyValues = [
    { date: '', won: 16, played: 18 },
    { date: '', won: 0, played: 7 },
    { date: '', won: 1, played: 3 },
    { date: '', won: 3, played: 10 },
    { date: '', won: 0, played: 0 },
    { date: '', won: 1, played: 3 },
    { date: '', won: 3, played: 9 }
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 justify-items-center gap-4 rounded-lg p-2 md:w-3/4 md:grid-cols-3 md:grid-rows-2">
          <Card>
            <div className="flex flex-col items-center gap-4">
              {isUser ? (
                <AvatarModal isModal={isModal} Modal={Modal} modalHandler={modalHandler} />
              ) : (
                <Avatar size={AvatarSize.XL} avatar={userSettings.avatar || ''} />
              )}

              <SubHeading>{`${userSettings.displayName}`}</SubHeading>
              <Badges />
            </div>
          </Card>
          <Carousel />
          <GamesWon gamesPlayed={userStats.gamesPlayed} gamesWon={userStats.gamesWon} />
          <GamesPlayed dailyGames={dailyValues} />
          <GamesList />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
