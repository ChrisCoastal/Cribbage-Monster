import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { db, rtdb } from 'src/firestore.config';
import { addDoc, collection } from 'firebase/firestore';
import { getDatabase, update, ref, set, get, runTransaction } from 'firebase/database';

import useAuthContext from 'src/hooks/useAuthContext';
import useGameContext from 'src/hooks/useGameContext';
import { INITIAL_GAME_STATE } from 'src/utils/constants';
import { findPlayerPos } from 'src/utils/helpers';

import Button from 'src/components/UI/Button';
import { GameId, GameReducerTypes, GameState, Player, PlayerPos, UserId } from 'src/@types';

type JoinGameProps = {
  gameId: GameId;
};

const JoinGame: FC<JoinGameProps> = ({ gameId }) => {
  const { userAuth } = useAuthContext();
  const { gameState, dispatchGame } = useGameContext();
  const navigate = useNavigate();

  async function joinGameHandler() {
    if (!userAuth) throw new Error('no user to join game; please login again');
    const { uid, displayName } = userAuth;
    try {
      const gamePlayersRef = ref(rtdb, `games/${gameId}/players`);
      const gamelistRef = ref(rtdb, `gameslist/${gameId}`);

      get(gamePlayersRef).then((snapshot) => {
        if (!snapshot.exists()) throw new Error('Sorry that game is not available');

        console.log(snapshot.val());
        const players = snapshot.val() as {
          player1: Player;
          player2: Player;
        };

        // will check for a vacant spot or if the player is already in the game
        const PlayerPos = findPlayerPos(players, uid);

        if (!PlayerPos) throw new Error('Sorry that game already has 2 players');
        update(gamelistRef, { [PlayerPos]: displayName! });
        update(gamePlayersRef, {
          ...players,
          [PlayerPos]: {
            ...players[PlayerPos],
            id: uid,
            displayName: displayName!
          }
        }).then(() => {
          navigate(`/game/${gameId}`);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return <Button handler={joinGameHandler}>Join Game</Button>;
};

export default JoinGame;
