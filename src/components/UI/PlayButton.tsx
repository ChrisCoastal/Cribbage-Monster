import React, { FC } from 'react';
import Button from 'src/components/UI/Button';

import useAuthContext from 'src/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

type PlayButtonProps = {
  buttonText?: string;
  className?: string;
};

const PlayButton: FC<PlayButtonProps> = ({ buttonText, className }) => {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  const playButtonHandler = () => {
    if (userAuth?.uid) navigate(`/dashboard/${userAuth?.uid}`);
    if (!userAuth?.uid) navigate(`/login`);
  };

  return (
    <Button
      className={`${className}`}
      buttonSize="md"
      buttonColor="secondary"
      handler={playButtonHandler}>
      {buttonText || 'PLAY NOW'}
    </Button>
  );
};

export default PlayButton;
