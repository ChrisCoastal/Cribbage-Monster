import { CardType, GameReducerActions, GameReducerTypes, GameState } from 'src/@types';

const gameReducer = (state: GameState, action: GameReducerActions): GameState => {
  const { type, payload } = action;

  switch (type) {
    case GameReducerTypes.CREATE_GAME: {
      return payload;
    }
    case GameReducerTypes.JOIN_PLAYER: {
      return payload;
    }

    case GameReducerTypes.UPDATE: {
      // structured this way b/c realtime database discards empty arrays/null values
      // FIXME: can't empty array (once all cards are played, local state is kept)
      // also overwrites any new game joined
      const { players, playerCards } = state;
      const updatedState = {
        gameId: payload.gameId || state.gameId,
        dealer: payload.dealer || state.dealer,
        players: {
          player1: {
            id: payload.players.player1.id || players.player1.id,
            displayName: payload.players.player1.displayName || players.player1.displayName,
            activePlayer: payload.players.player1.activePlayer || players.player1.activePlayer
          },
          player2: {
            id: payload.players.player2.id || players.player2.id,
            displayName: payload.players.player2.displayName || players.player2.displayName,
            activePlayer: payload.players.player2.activePlayer || players.player2.activePlayer
          }
        },
        playerCards: {
          player1: {
            inHand: payload?.playerCards?.player1?.inHand || playerCards.player1.inHand,
            played: payload?.playerCards?.player1?.played || playerCards.player1.played
          },
          player2: {
            inHand: payload?.playerCards?.player2?.inHand || playerCards.player2.inHand,
            played: payload?.playerCards?.player2?.played || playerCards.player2.played
          }
        },
        crib: payload.crib || state.crib,
        starterCard: payload.starterCard || state.starterCard,
        score: {
          player1: {
            cur: payload.score.player1.cur,
            prev: payload.score.player1.prev
          },
          player2: {
            cur: payload.score.player2.cur,
            prev: payload.score.player2.prev
          }
        },
        turn: {
          cardsPlayed: payload.turn.cardsPlayed || state.turn.cardsPlayed,
          cardTotal: payload.turn.cardTotal
        }
      };
      console.log(updatedState);

      return updatedState;
    }
    // case GameReducerTypes.DEAL: {
    //   return {
    //     ...state,
    //     hands: {
    //       player: { inHand: payload.player, played: [] },
    //       opponent: { inHand: payload.opponent, played: [] }
    //     }
    //   };
    // }
    // case GameReducerTypes.PLAY_CARD: {
    //   //TODO: placeholder only
    //   const cardIndex = state.hands.player.inHand.findIndex((card) => card.id === payload.id);
    //   // const hand: CardType[] = [];
    //   const handArr = state.hands.player.inHand
    //     .slice(0, cardIndex)
    //     .concat(state.hands.player.inHand.slice(cardIndex + 1));
    //   console.log(handArr);

    //   const played = state.hands.player.inHand[cardIndex];
    //   // state.hands.player.inHand.forEach((card) =>
    //   //   card.id === payload.card.id ? (cardPlayed = card) : hand.push(card)
    //   // );
    //   // FIXME: this also needs to update cardsPlayed / total
    //   return {
    //     ...state,
    //     hands: {
    //       player: { inHand: handArr, played: [...state.hands.player.played, played as CardType] },
    //       opponent: state.hands.opponent
    //     }
    //   };
    // }

    default:
      return state;
  }
};

export default gameReducer;
