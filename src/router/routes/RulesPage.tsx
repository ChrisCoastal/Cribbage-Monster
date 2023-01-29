import React from 'react';
import Heading from 'src/components/UI/Heading';
import SubHeading from 'src/components/UI/SubHeading';

const RulesPage = () => {
  return (
    <div className="mt-32 flex justify-center px-4 text-stone-50 sm:px-12">
      <div className="max-w-[40rem]">
        <Heading className="mb-12">Rules of Cribbage</Heading>
        <SubHeading className="mt-8">Rank of Cards</SubHeading>
        <p className="mb-2">A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</p>
        <p className="mb-2">The Ace is always low and counts 1.</p>
        <p className="mb-2">The Jack, Queen, King all count 10.</p>
        <SubHeading className="mt-8">Object of the Game</SubHeading>
        <p className="mb-2">
          The goal is to be the first player to score 121 points. Players earn points during play
          and for making various card combinations as described below. The play ends the moment
          either player reaches the agreed total, whether by pegging or counting their hand. The
          non-dealer counts before the dealer. If a player wins (reaching 121 points), and the
          losing player fails to pass the three-quarter mark (91 points) it is a skunk and the win
          counts for 2 games. It is a double skunk if the loser fails to pass the halfway mark (61
          points) and the game is worth 4 games.
        </p>
        <SubHeading className="mt-8">The Deal</SubHeading>
        <p className="mb-2">
          Each hand has a dealer. At the start of the hand, each player is dealt 6 cards. After each
          hand is played the deal alternates between the players.
        </p>
        <SubHeading className="mt-8">The Crib</SubHeading>
        <p className="mb-2">
          Before the hand is played the crib is laid away. The crib can be thought of as an
          additional hand that is comprised of two cards from each players hand. The cards are
          chosen contributed to the crib face down by the respective players. Following the hand,
          the dealer counts the points in the crib and adds them to their score.
        </p>
        <SubHeading className="mt-8">Cutting the Deck</SubHeading>
        <p className="mb-2">
          After the crib is laid away, the non-dealer cuts the deck. This card is called the
          starter. If the starter is a Jack, the dealer pegs (scores) 2 points immediately. The
          starter is not used in the play phase of Cribbage, but is used later for making various
          card combinations that score points.
        </p>
        <SubHeading className="mt-8">Card Play</SubHeading>
        <p className="mb-2">
          After the starter is turned, the non-dealer lays one of their cards face up on the table.
          The dealer similarly exposes a card, then non-dealer again, and so on - the hands are
          exposed card by card, alternately except for a Go, as noted below. Each player keeps their
          cards separate from those of their opponent. As each person plays, the running count of
          the cards is updated.
        </p>
        <SubHeading className="mt-8">Go!</SubHeading>
        <p className="mb-2">
          During play, the running total of cards may never be carried beyond 31. If a player cannot
          add another card without exceeding 31, it is a Go and the opponent pegs 1. Before gaining
          the Go, the opponent must first lay down any additional cards possible without exceeding
          31. Besides the point for Go, they may then score any additional points that can be made
          through pairs and runs (described later). If a player reaches exactly 31, they peg two
          instead of one for Go. Once the player has played all cards possible, play begins with the
          other player and the count starting back at zero. All possible scoring combinations are
          also reset (for example, a run cannot be made using cards played before and after the Go -
          the Go has interrupted the sequence).
        </p>
        <SubHeading className="mt-8">Pegging</SubHeading>
        <p className="mb-2">
          The object in play is to score points by pegging. In addition to a Go, a player may score
          for the following combinations:
        </p>
        <p className="mb-2">Fifteen: For adding a card that makes the count total 15 Peg 2.</p>
        <p className="mb-2">
          Pair: For adding a card of the same rank as the card just played Peg 2. Face cards pair
          only by actual rank: Jack with Jack, but not Jack with Queen.
        </p>
        <p className="mb-2">Triple: For adding the second card of the same rank. Peg 6</p>
        <p className="mb-2">Pairs Royal: For adding the fourth card of the same rank Peg 12</p>
        <p className="mb-2">
          Run (Sequence): For adding a card that forms, with those just played:
        </p>
        <p className="mb-2">For a sequence of three, Peg 3</p>
        <p className="mb-2">For a sequence of four, Peg 4</p>
        <p className="mb-2">For a sequence of five, Peg 5</p>
        <p className="mb-2">
          (Peg one point more for each extra card of a sequence. Note that runs are independent of
          suits, but go strictly by rank; to illustrate: 9, 10, J, or J, 9, 10 is a run but 9, 10, Q
          is not.)
        </p>
        <p className="mb-2">
          It is important to keep track of the order in which cards are played to determine whether
          what looks like a sequence or a run has been interrupted by a "foreign card." Example:
          Cards are played in this order: 8, 7, 7, 6. The dealer pegs 2 for 15, and the opponent
          pegs 2 for pair, but the dealer cannot peg for run because of the extra seven (foreign
          card) that has been played. Example: Cards are played in this order: 9, 6, 8, 7. The
          dealer pegs 2 for fifteen when he or she plays the six and pegs 4 for run when he plays
          the seven (the 6, 7, 8, 9 sequence). The cards were not played in sequential order, but
          they form a true run with no foreign card.
        </p>
        <SubHeading className="mt-8">Counting Order</SubHeading>
        <p className="mb-2">
          When play ends, the three hands are counted in the order: the non-dealer hand, then the
          dealer hand, and finally the crib. The starter (cut card) is considered to be a part of
          each hand (so that all hands in counting comprise of five cards).
        </p>
        <SubHeading className="mt-8">Counting Points</SubHeading>
        <p className="mb-2">Fifteen. Each combination of cards that totals 15 2</p>
        <p className="mb-2">Pair. Each pair of cards of the same rank 2</p>
        <p className="mb-2">
          Run. Each combination of three or more 1 cards in sequence (for each card in the sequence)
        </p>
        <p className="mb-2">
          Flush. Four cards of the same suit in hand scores 4. If the starter is also the same suit,
          the flush scores 5 points. There is no count for four card flush in the crib. All 4 cards
          in the crib and the starter must be the same suit.
        </p>
        <p className="mb-2">A Jack in hand (or crib) that is the same suit as starter scores 1.</p>
      </div>
    </div>
  );
};

export default RulesPage;
