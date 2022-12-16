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
      const updatedState = {
        gameId: payload.gameId || state.gameId,
        players: {
          player1: {
            id: payload.players.player1.id || state.players.player1.id,
            activePlayer:
              payload.players.player1.activePlayer || state.players.player1.activePlayer,
            role: payload.players.player1.role || state.players.player1.role
          },
          player2: {
            id: payload.players.player2.id || state.players.player2.id,
            activePlayer:
              payload.players.player2.activePlayer || state.players.player2.activePlayer,
            role: payload.players.player2.role || state.players.player2.role
          }
        },
        playerCards: {
          player1: {
            inHand: payload?.playerCards?.player1.inHand || state.playerCards.player1.inHand,
            played: payload?.playerCards?.player1.played || state.playerCards.player1.played
          },
          player2: {
            inHand: payload?.playerCards?.player2.inHand || state.playerCards.player2.inHand,
            played: payload?.playerCards?.player2.played || state.playerCards.player2.played
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
