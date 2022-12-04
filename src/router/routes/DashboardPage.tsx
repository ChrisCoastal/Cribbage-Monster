import React from 'react';
import useAuthContext from 'src/hooks/useAuthContext';

const DashboardPage = () => {
  const { userAuth } = useAuthContext();

  return (
    <div>
      <p>{`Hey ${userAuth?.displayName}`}</p>
      <button onClick={() => console.log(userAuth)}>USER?</button>
    </div>
  );
};

export default DashboardPage;
