import React, { FC } from 'react';
import { Player, PlayerPos } from 'src/@types';

type PlayerMessagesProps = {
  dealerName: string;
  player: Player;
  opponent: Player;
  messages: string[];
};

const PlayerMessages: FC<PlayerMessagesProps> = ({ dealerName, player, opponent, messages }) => {
  const isDealer = player.displayName === dealerName;
  const dealerArticle = isDealer ? 'our' : `${dealerName}'s`;

  return <div></div>;
};

export default PlayerMessages;
