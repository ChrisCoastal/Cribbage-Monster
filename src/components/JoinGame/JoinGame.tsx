import React, { FC } from 'react';
import { rtdb } from 'src/firestore.config';
import { update, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

import { GameId, GameStatus, IsActive, Player } from 'src/@types';

import { findPlayerPos, getGameFromList, getGameRef } from 'src/utils/helpers';

import Button from 'src/components/UI/Button';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';

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
      get(gamePlayersRef).then((snapshot) => {
        if (!snapshot.exists()) throw new Error('Sorry that game is not available');
        const players = snapshot.val() as {
          player1: Player;
          player2: Player;
        };

        // check for a vacant spot or if the player is already in the game
        const playerPos = findPlayerPos(players, uid);
        if (!playerPos) throw new Error('Sorry that game already has 2 players');

        const gameFromListRef = getGameFromList(gameId);
        const gameRef = getGameRef(gameId);
        const updates = {
          ['/players']: {
            ...players,
            [playerPos]: {
              avatar: userSettingsState.avatar,
              id: uid,
              displayName: displayName!,
              activePlayer: IsActive.NOT_ACTIVE
            }
          },
          ['/status']: GameStatus.JOINED
        };
        update(gameFromListRef, { [playerPos]: { displayName, avatar: userSettingsState.avatar } });
        update(gameRef, updates).then(() => {
          navigate(`/game/${gameId}`);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button handler={joinGameHandler} className="text-sm font-medium">
      Join
    </Button>
  );
};

export default JoinGame;
