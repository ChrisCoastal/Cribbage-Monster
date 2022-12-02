import Avatar from 'src/components/Avatar/Avatar';
import Board from 'src/components/Board/Board';
import Cards from 'src/components/Cards/Cards';
import Deck from 'src/components/Deck/Deck';

const PlayField = () => {
  return (
    <div className="relative grid items-center justify-items-center grid-cols-3 grid-rows-[auto,_1fr,_1fr,_1fr,_2fr] py-12 px-4 h-screen">
      <Avatar />
      <Deck />
      <Board />
      <Cards />
      <div className="absolute left-0 w-2/3 h-full rounded-t-full bg-teal-700 translate-x-1/4 -z-40"></div>
    </div>
  );
};

export default PlayField;
