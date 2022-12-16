import React from 'react';
import CreateGame from 'src/components/CreateGame/CreateGame';
import useAuthContext from 'src/hooks/useAuthContext';
import Button from 'src/components/UI/Button';

const DashboardPage = () => {
  const { userAuth } = useAuthContext();
  console.log(userAuth);

  return (
    <div className="grid">
      <div className="">
        <p>{`Hey ${userAuth?.displayName}`}</p>
        <Button handler={() => console.log(userAuth)}>USER?</Button>
        <CreateGame />
      </div>
    </div>
  );
};

export default DashboardPage;
