import React from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { rtdb } from 'src/firestore.config';
import { ref, serverTimestamp, set } from 'firebase/database';

import { GameBrief, GameReducerTypes, IsActive } from 'src/@types';
import { INITIAL_GAME_STATE } from 'src/utils/constants';
import { getGameFromList, getGameRef } from 'src/utils/helpers';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';

import Button from 'src/components/UI/Button';
import useSettingsContext from 'src/hooks/useSettingsContext';

const CreateGame = () => {
  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();

  const { dispatchGame } = useGameContext();
  const navigate = useNavigate();

  async function createGameHandler() {
    try {
      if (!userAuth) throw new Error('no user to create game');
      const { uid, displayName } = userAuth;

      const gameId = nanoid();
      const newGame = {
        ...INITIAL_GAME_STATE,
        gameId,
        // TODO: dealer should be decided by cutting deck
        players: {
          ...INITIAL_GAME_STATE.players,
          player1: {
            id: uid,
            displayName: displayName!,
            avatar: userSettingsState.avatar,
            activePlayer: IsActive.NOT_ACTIVE
          }
        }
      };
      const gameBrief: GameBrief = {
        gameId,
        player1: {
          displayName: displayName!,
          avatar: userSettingsState.avatar
        },
        player2: {
          displayName: '',
          avatar: ''
        },
        scoreToWin: 121
      };
      const gameFromListRef = getGameFromList(gameId);
      const gameRef = getGameRef(gameId);
      set(gameFromListRef, gameBrief);
      set(gameRef, newGame).then(() => {
        dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: newGame });
        navigate(`/game/${gameId}`);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button handler={createGameHandler} customStyles="font-bold text-2xl">
      +
    </Button>
  );
};

export default CreateGame;
