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
import { GameId, GameReducerTypes, Player, PlayerNum } from 'src/@types';

type JoinGameProps = {
  gameId: GameId;
};

const JoinGame = () => {
  const { userAuth } = useAuthContext();
  const { gameState, dispatchGame } = useGameContext();
  const navigate = useNavigate();

  async function joinGame() {
    // const gamesRef = collection(db, 'games');
    const user = userAuth?.uid;
    if (!user) throw new Error('no user to create game');

    const gameId = nanoid();
    const newGame = {
      ...INITIAL_GAME_STATE,
      gameId,
      // TODO: dealer should be decided by cutting deck
      dealer: PlayerNum.P_ONE,
      players: {
        ...INITIAL_GAME_STATE.players,
        player1: { id: user, activePlayer: false }
      }
    };
    try {
      console.log('creating game');
      const gameRef = ref(rtdb, 'games/' + gameId);
      await set(gameRef, newGame).then(() => {
        console.log('complete');
        // dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: newGame });
        navigate(`/game/${gameId}`);
      });
    } catch (err) {
      console.log(err);
    }
    // await addDoc(gamesRef, newGame)
    //   .then((data) => {
    //     console.log(data, data.id);
    //     // const gameId = data.id;
    //     dispatchGame({ type: GameReducerTypes.CREATE_GAME, payload: newGame });
    //     navigate(`/game/${gameId}`);
    //   })
    //   .catch((err) => console.log(err));
  }

  return <Button handler={joinGame}>Join Game</Button>;
};

export default JoinGame;
