import React from 'react';
import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';
import { db } from 'src/firestore.config';
import { addDoc, collection } from 'firebase/firestore';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { INITIAL_GAME_STATE } from 'src/utils/constants';

import Button from 'src/UI/Button';
import { GameReducerTypes } from 'src/@types';

const CreateGame = () => {
  const { userAuth } = useAuthContext();
  const { gameState, dispatchGame } = useGameContext();
  const navigate = useNavigate();

  async function createGame() {
    const gamesRef = collection(db, 'games');
    const gameId = nanoid();
    const newGame = { ...INITIAL_GAME_STATE, gameId };
    console.log('creating game');
    await addDoc(gamesRef, newGame)
      .then((data) => {
        console.log(data, data.id);
        // const gameId = data.id;
        dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: newGame });
        navigate(`/game/${gameId}`);
      })
      .catch((err) => console.log(err));
  }

  return <Button handler={createGame}>Create Game</Button>;
};

export default CreateGame;
