import { useEffect } from 'react';

import { get, onValue } from 'firebase/database';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { AvatarSize, SettingsReducerTypes, UserSettingsState, UserStats } from 'src/@types';

import { getUserSettingsRef, getUserStatsRef } from 'src/utils/helpers';

import Avatar from 'src/components/Avatar/Avatar';
import Badges from 'src/components/Badges/Badges';

import AvatarModal from 'src/components/AvatarModal/AvatarModal';
import Card from 'src/components/UI/Card';
import DashCarousel from 'src/components/DashboardItems/DashCarousel/DashCarousel';
import Footer from 'src/components/Footer/Footer';
import GamesList from 'src/components/DashboardItems/GamesList/GamesList';
import GamesPlayed from 'src/components/DashboardItems/GamesPlayed/GamesPlayed';
import GamesWon from 'src/components/DashboardItems/GamesWon/GamesWon';
import SubHeading from 'src/components/UI/SubHeading';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useModal from 'src/hooks/useModal';

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
  const { dispatchSettings } = useSettingsContext();

  const { userSettings, userStats } = useLoaderData() as {
    userSettings: UserSettingsState;
    userStats: UserStats;
  };

  const { Modal, isModal, modalHandler } = useModal();
  const isUser = userSettings.uid === userAuth?.uid;

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="relative">
      <div className="absolute h-screen min-h-full w-full bg-cardbacks bg-cover opacity-[0.03]"></div>
      <div className="relative mx-auto grid w-full auto-rows-fr justify-items-center gap-4 rounded-lg px-4 pt-24 pb-16 md:w-[48rem] md:grid-cols-2 xl:w-[75rem] xl:grid-cols-3">
        <Card padding="md">
          <div className="flex flex-col items-center gap-4">
            {isUser ? (
              <AvatarModal isModal={isModal} Modal={Modal} modalHandler={modalHandler} />
            ) : (
              <Avatar
                className={`${AvatarSize.LG} lg:h-48 lg:w-48 lg:text-[8.8rem]`}
                avatar={userSettings.avatar || ''}
              />
            )}

            <SubHeading>{`${userSettings.displayName}`}</SubHeading>
            <Badges />
          </div>
        </Card>
        <GamesList />
        <DashCarousel className="sm:col-span-2 sm:row-start-2 sm:aspect-video" />
        <GamesWon gamesPlayed={userStats.gamesPlayed} gamesWon={userStats.gamesWon} />
        <GamesPlayed dailyGames={dailyValues} />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
