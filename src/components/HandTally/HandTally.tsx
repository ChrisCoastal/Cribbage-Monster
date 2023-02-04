import React, { FC, useEffect, useState, useRef } from 'react';
import { set } from 'firebase/database';

import { AvatarSize, CardType, GameStatus, PlayerPos, Tally, TallyPoints } from 'src/@types';
import { useInterval } from 'src/hooks/useInterval';
import PlayerTally from 'src/components/PlayerTally/PlayerTally';
import Card from 'src/components/UI/Card';
import anime from 'animejs';

import {
  getGameStatusRef,
  getGameRef,
  getPlayerScoreRef,
  isHost,
  isScorePoints
} from 'src/utils/helpers';

import useGameContext from 'src/hooks/useGameContext';
import Avatar from 'src/components/Avatar/Avatar';
type HandTallyProps = {
  player: PlayerPos;
  opponent: PlayerPos;
  dealer: PlayerPos;
  pone: PlayerPos;
  // player: Tally;
  // opponent: Tally;
  // crib: Tally;
};

const HandTally: FC<HandTallyProps> = ({ player, opponent, pone, dealer }) => {
  const { gameState } = useGameContext();
  const [tallyIndex, setTallyIndex] = useState<number>(0);
  const [tallyPoints, setTallyPoints] = useState<null | Tally>(null);
  const [updatedScore, setUpdatedScore] = useState<{
    player1: { prev: number; cur: number };
    player2: { prev: number; cur: number };
  }>({ player1: gameState.score.player1, player2: gameState.score.player2 });
  // const [renderedScore, setRenderedScore] = useState<{ player: number; opponent: number }>({
  //   player: gameState.score[player].prev,
  //   opponent: gameState.score[opponent].prev
  // });
  // const prevPlayerScoreRef = useRef<HTMLSpanElement>(null);
  // const prevOpponentScoreRef = useRef<HTMLSpanElement>(null);

  // const playerIsDealer = dealer === player.playerPos ? 1 : 0;
  // const opponentIsDealer = dealer === opponent.playerPos ? 1 : 0;

  // const playerScores = {
  //   prev: gameState.score[player.playerPos].prev,
  //   hand: gameState.score[player.playerPos].prev + player.points.totalPoints,
  //   crib:
  //     gameState.score[player.playerPos].prev +
  //     player.points.totalPoints +
  //     (playerIsDealer ? crib.points.totalPoints : 0)
  // };
  // const opponentScores = {
  //   prev: gameState.score[opponent.playerPos].prev,
  //   hand: gameState.score[opponent.playerPos].prev + opponent.points.totalPoints,
  //   crib:
  //     gameState.score[opponent.playerPos].prev +
  //     opponent.points.totalPoints +
  //     (!playerIsDealer ? crib.points.totalPoints : 0)
  // };
  console.log('tallyIndex', tallyIndex);

  // function renderScoreItems(score: TallyPoints) {
  //   const scores = Object.entries(score).filter(
  //     (score) => score[1] !== 0 || score[0] === 'totalPoints'
  //   );
  //   // const delay = playerPos === dealer ? scores.length + 2 : 1;
  //   const scoreItems = scores.map((score, i) => {
  //     const [key, value] = score;
  //     // const animate = tallyIndex === i + delay ? 'animate-text-grow' : '';
  //     if (key === 'totalPoints')
  //       return (
  //         <li
  //           key={key}
  //           className={`relative inline text-2xl tracking-wide animate-item-${i} opacity-0`}>
  //           <span>{key.slice(0, 5).toUpperCase() + ': '}</span>
  //           <span className={` font-semibold`}>{value}</span>
  //         </li>
  //       );
  //     else
  //       return (
  //         <li key={key} className={`relative inline tracking-wide animate-item-${i} opacity-0`}>
  //           <span>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' for '}</span>
  //           <span className={`font-semibold`}>{value}</span>
  //         </li>
  //       );
  //   });

  //   return scoreItems;
  // }

  // const renderScore = renderScoreItems(player, player.points);
  // const scoreTotal = renderScore.splice(-1, 1);
  // const renderOpponentScores = renderScoreItems(opponent, opponent.points);
  // const opponentTotal = renderOpponentScores.splice(-1, 1);
  // const renderCribScores = renderScoreItems(dealer, crib.points);
  // const cribTotal = renderCribScores.splice(-1, 1);

  // function updateRenderScore(pos: 'player' | 'opponent') {
  //   setRenderedScore((prev) =>
  //     pos === 'player'
  //       ? { ...prev, player: prev.player + player.points.totalPoints }
  //       : { ...prev, opponent: prev.opponent + opponent.points.totalPoints }
  //   );
  // }
  // const updatePlayerScore = playerIsDealer ? 1 : 0;
  // const updateOpponentScore = !playerIsDealer ? 1 : 0;

  // function renderPlayerTally() {
  //   return (
  //     <PlayerTally
  //       player={player}
  //       dealer={dealer}
  //       score={renderedScore.player}
  //       scoreItems={renderPlayerScores}
  //       total={playerTotal}
  //     />
  //   );
  // }

  useEffect(() => {
    const orderOfCount = [pone, dealer, dealer];
    const curTally = orderOfCount[tallyIndex];
    const isCrib = tallyIndex === 2;
    const endTally = tallyIndex === 3;

    if (endTally) {
      const gameRef = getGameRef(gameState.gameId);
      // const playerScoreRef = getPlayerScoreRef(gameState.gameId, curTally);
      console.log(updatedScore);

      isHost(player) &&
        set(gameRef, { ...gameState, status: GameStatus.DEAL, score: updatedScore });
      return;
    }

    const tally = isCrib
      ? isScorePoints(gameState.crib, gameState.deckCut.card!, 'crib')
      : isScorePoints(gameState.playerCards[curTally].played, gameState.deckCut.card!);

    console.log(tally);

    const tallyPoints: Tally = {
      displayName: gameState.players[curTally].displayName,
      avatar: gameState.players[curTally].avatar,
      cards: isCrib ? gameState.crib : gameState.playerCards[curTally].played,
      playerPos: curTally,
      points: tally
    };
    setTallyPoints(tallyPoints);
    setUpdatedScore((prevScore) => ({
      ...prevScore,
      [curTally]: {
        prev: prevScore[curTally].cur,
        cur: prevScore[curTally].cur + tally.totalPoints
      }
    }));
    const playerScoreRef = getPlayerScoreRef(gameState.gameId, curTally);
    // isHost(player) &&
    //   set(playerScoreRef, {
    //     prev: gameState.score[curTally].cur,
    //     cur: gameState.score[curTally].cur + tally.totalPoints
    //   });

    const timer = setTimeout(() => {
      // TODO:
      setTallyPoints(null);
      setTallyIndex((prev) => prev + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [tallyIndex]);

  useEffect(() => {
    if (updatedScore.player1.cur >= 121) console.log('player 1 wins');
    if (updatedScore.player2.cur >= 121) console.log('player 2 wins');
  }, [updatedScore]);

  // useEffect(() => {
  //   for (let i = 0; i < 7; i++) {
  //     anime({
  //       targets: `.animate-item-${i}`,
  //       translateY: [
  //         { value: 60, duration: 0, delay: 0 },
  //         { value: 0, duration: 800, delay: 120 * i }
  //       ],
  //       opacity: [
  //         { value: 0, duration: 0, delay: 0 },
  //         { value: 1, duration: 800, delay: 120 * i }
  //       ],

  //       easing: 'spring(0.5, 100, 10, 0)'
  //     });
  //   }
  // }, [tallyIndex]);

  // const updateCribScore = 2;

  // function scoreHand() {
  //   const playerHandTally = isScorePoints(
  //     gameState.playerCards[player].played,
  //     gameState.deckCut.card!
  //   );
  //   const opponentHandTally = isScorePoints(
  //     gameState.playerCards[opponent].played,
  //     gameState.deckCut.card!
  //   );
  //   const cribTally = isScorePoints(gameState.crib, gameState.deckCut.card!, 'crib');

  //   return { playerHandTally, opponentHandTally, cribTally };
  // }

  // function getPlayerScores(
  //   playerHandTally: TallyPoints,
  //   opponentHandTally: TallyPoints,
  //   cribTally: TallyPoints
  // ) {
  //   const playerScore =
  //     player === dealer
  //       ? playerHandTally.totalPoints + cribTally.totalPoints
  //       : playerHandTally.totalPoints;
  //   const opponentScore =
  //     opponent === dealer
  //       ? opponentHandTally.totalPoints + cribTally.totalPoints
  //       : opponentHandTally.totalPoints;

  //   const updatedScore = {
  //     [player]: {
  //       cur: gameState.score[player].cur + playerScore,
  //       prev: gameState.score[player].cur
  //     },
  //     [opponent]: {
  //       cur: gameState.score[opponent].cur + opponentScore,
  //       prev: gameState.score[opponent].cur
  //     }
  //   } as { player1: ScoreType; player2: ScoreType };

  //   return updatedScore;
  // }

  // function tallyHand() {
  //   const score = scoreHand();
  //   const tally = {
  //     [player]: score.playerHandTally,
  //     [opponent]: score.opponentHandTally,
  //     crib: score.cribTally
  //   };
  //   // const updatedScore = getPlayerScores(
  //   //   score.playerHandTally,
  //   //   score.opponentHandTally,
  //   //   score.cribTally
  //   // );
  //   const winner = isWinner(updatedScore, dealer);
  //   const tallyRef = getTallyRef(gameId);
  //   const scoreRef = getScoreRef(gameId);
  //   set(tallyRef, tally).then(() => {
  //     // if the pone has won, dealer's score is not recorded (pone counts first)
  //     winner === pone
  //       ? update(scoreRef, { [pone]: updatedScore[pone] })
  //       : update(scoreRef, updatedScore);
  //   });
  //   return tally;
  // }

  // gameState.status === GameStatus.TALLY && playerPos === PlayerPos.P_ONE && tallyHand();

  return (
    <div>
      {/* <Card className="mb-8 grid grid-cols-2 items-center gap-4 rounded-md py-4">
        <div className="col-start-1 row-start-1 flex flex-col items-center justify-center">
          <p>{player.displayName}</p>
          <Avatar avatar={player.avatar} className={AvatarSize.SM} />
        </div>
        <div className="text-2xl font-bold">
          <span className="prev-score-player">{renderedScore.player}</span> / 121
        </div>

        <div className="col-start-1 row-start-2 flex flex-col  items-center justify-center">
          <p>{opponent.displayName}</p>
          <Avatar avatar={opponent.avatar} className={AvatarSize.SM} />
        </div>
        <div className="text-2xl font-bold">
          <span className="prev-score-opponent">{renderedScore.opponent}</span> / 121
        </div>
      </Card> */}
      <div className="relative overflow-hidden pt-2 sm:w-[26rem]">
        {tallyPoints && (
          <div className={`animate-slide-in-out opacity-0`}>
            <PlayerTally
              // className={`${playerIsDealer ? 'dealer-tally' : 'pone-tally'} opacity-0`}
              // displayName={tallyPoints.displayName}
              // avatar={tallyPoints.avatar}
              // cards={tallyPoints.cards}
              cut={gameState.deckCut.card!}
              tally={tallyPoints}
              // scores={renderScoreItems(tallyPoints.points)}
              handType={tallyIndex === 2 ? 'crib' : 'hand'}
              // total={scoreTotal}
            />
          </div>
        )}
        {/* {tallyIndex === updatePlayerScore && (
          <div className={`animate-slide-in-out opacity-0`}>
            <PlayerTally
              // className={`${playerIsDealer ? 'dealer-tally' : 'pone-tally'} opacity-0`}
              displayName={player.displayName}
              avatar={player.avatar}
              cards={player.cards}
              cut={cut}
              scores={renderPlayerScores}
              handType="hand"
              total={playerTotal}
            />
          </div>
        )}
        {tallyIndex === updateOpponentScore && (
          <div className={`animate-slide-in-out opacity-0`}>
            <PlayerTally
              // className={`${playerIsDealer ? 'pone-tally' : 'dealer-tally'} opacity-0`}
              displayName={opponent.displayName}
              avatar={opponent.avatar}
              cards={opponent.cards}
              cut={cut}
              scores={renderOpponentScores}
              handType="hand"
              total={opponentTotal}
            />
          </div>
        )}
        {tallyIndex === 2 && (
          <div className={`animate-slide-in-out opacity-0`}>
            <PlayerTally
              // className={`crib-tally opacity-0`}
              displayName={crib.displayName}
              avatar={crib.avatar}
              cards={crib.cards}
              cut={cut}
              scores={renderCribScores}
              handType="crib"
              total={cribTotal}
            />
          </div>
        )} */}

        {/* <div className="self-end text-sm">...next round in {16 - tallyIndex > 0 ? 16 - tallyIndex : 0}</div> */}
      </div>
    </div>
  );
};

export default HandTally;
