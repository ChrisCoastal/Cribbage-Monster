import { CardBoxSize } from 'src/@types';

import Cards from 'src/components/Cards/Cards';
import CardBox from '../CardBox/CardBox';

import useGameContext from 'src/hooks/useGameContext';

const Avatar = () => {
  const { gameState, dispatchGame } = useGameContext();
  const opponentHand = ['card', 'card', 'card', 'card'];
  const cards = opponentHand.map((card, i) => <span key={i} className="w-6 h-8 bg-red-300"></span>);

  return (
    <div className="flex flex-col items-center col-start-3">
      <p className="text-sm">opponent</p>
      <div className=" w-10 h-10 mb-2 bg-slate-400 rounded-full border border-black overflow-hidden">
        <img src="" alt="" />
      </div>
      {/* <CardBox size={CardBoxSize.SM} numCards={gameState.hands.opponent.inHand.length} /> */}
      <CardBox size={CardBoxSize.SM} numCards={0} />
      {/* <div className="flex gap-1">{cards}</div> */}
    </div>
  );
};

export default Avatar;
