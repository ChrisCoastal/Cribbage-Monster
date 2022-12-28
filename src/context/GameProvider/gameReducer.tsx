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
      const updatedState = {
        ...payload,
        handNum: payload?.handNum || 0,
        playerCards: {
          player1: {
            inHand: payload?.playerCards?.player1?.inHand || {},
            played: payload?.playerCards?.player1?.played || {}
          },
          player2: {
            inHand: payload?.playerCards?.player2?.inHand || {},
            played: payload?.playerCards?.player2?.played || {}
          }
        },
        crib: payload?.crib || {},
        deckCut: payload.deckCut || null,
        turn: {
          cardsPlayed: payload?.turnTotals?.cardsPlayed || {},
          cardTotal: payload.turnTotals.cardTotal
        }
      };

      return updatedState;
    }

    case GameReducerTypes.HAND_TALLY: {
      const updatedState = {
        ...state,
        tally: {
          ...state.tally,
          player1: payload.player1,
          player2: payload.player2,
          crib: payload.crib
        }
      };
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
