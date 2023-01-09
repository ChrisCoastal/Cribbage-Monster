import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { rtdb } from 'src/firestore.config';

import { update, ref, get } from 'firebase/database';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';

import { findPlayerPos, getGameFromList } from 'src/utils/helpers';

import Button from 'src/components/UI/Button';
import { GameId, Player } from 'src/@types';

type JoinGameProps = {
  gameId: GameId;
};

const JoinGame: FC<JoinGameProps> = ({ gameId }) => {
  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const navigate = useNavigate();

  async function joinGameHandler() {
    if (!userAuth) throw new Error('no user to join game; please login again');
    const { uid, displayName } = userAuth;
    try {
      const gamePlayersRef = ref(rtdb, `games/${gameId}/players`);
      const gameFromListRef = getGameFromList(gameId);

      get(gamePlayersRef).then((snapshot) => {
        if (!snapshot.exists()) throw new Error('Sorry that game is not available');
        const players = snapshot.val() as {
          player1: Player;
          player2: Player;
        };

        // will check for a vacant spot or if the player is already in the game
        const PlayerPos = findPlayerPos(players, uid);

        if (!PlayerPos) throw new Error('Sorry that game already has 2 players');
        update(gameFromListRef, { [PlayerPos]: { displayName, avatar: userSettingsState.avatar } });
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
