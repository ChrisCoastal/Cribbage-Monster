import React from 'react';
import { useNavigate } from 'react-router-dom';

import { nanoid } from 'nanoid';
import { db, rtdb } from 'src/firestore.config';
import { addDoc, collection } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { INITIAL_GAME_STATE } from 'src/utils/constants';

import Button from 'src/components/UI/Button';
import { GameBrief, GameReducerTypes, Player, PlayerPos } from 'src/@types';

const CreateGame = () => {
  const { userAuth } = useAuthContext();
  const { gameState, dispatchGame } = useGameContext();
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
            ...INITIAL_GAME_STATE.players.player1,
            id: uid,
            displayName: displayName!
          }
        }
      };
      const gameBrief: GameBrief = {
        gameId,
        player1: displayName!,
        player2: '',
        scoreToWin: 121
      };
      const gameslistRef = ref(rtdb, `gamesList/${gameId}`);
      const gameRef = ref(rtdb, `games/${gameId}`);
      set(gameslistRef, gameBrief);
      set(gameRef, newGame).then(() => {
        dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: newGame });
        navigate(`/game/${gameId}`);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return <Button handler={createGameHandler}>Create Game</Button>;
};

export default CreateGame;
