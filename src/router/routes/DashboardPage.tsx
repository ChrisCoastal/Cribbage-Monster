import React from 'react';
import CreateGame from 'src/components/CreateGame/CreateGame';
import useAuthContext from 'src/hooks/useAuthContext';
import Button from 'src/components/UI/Button';
import JoinGame from 'src/components/JoinGame/JoinGame';
import GamesList from 'src/components/GamesList/GamesList';

const DashboardPage = () => {
  const { userAuth } = useAuthContext();
  console.log(userAuth);

  return (
    <div className="grid">
      <div className="">
        <p>{`Hey ${userAuth?.displayName}`}</p>
        <Button handler={() => console.log(userAuth)}>USER?</Button>
        <GamesList />
        <CreateGame />
        <JoinGame gameId="JJWHiQQn7dHzDKiEuDhQZ" />
      </div>
    </div>
  );
};

export default DashboardPage;
