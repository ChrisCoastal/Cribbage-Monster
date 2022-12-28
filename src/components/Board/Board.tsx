import { PlayerPos } from 'src/@types';
import BoardSection from 'src/components/BoardSection/BoardSection';
import BoardSectionBend from 'src/components/BoardSectionBend/BoardSectionBend';
import BoardPegHole from '../BoardPegHole/BoardPegHole';

import useGameContext from 'src/hooks/useGameContext';

const Board = () => {
  const { gameState } = useGameContext();

  const sectionCol = ['col-start-1', 'col-start-2', 'col-start-3'];
  const sectionRow = [
    'row-start-1',
    'row-start-2',
    'row-start-3',
    'row-start-4',
    'row-start-5',
    'row-start-6',
    'row-start-7'
  ];

  function renderSections() {
    const sections = [];
    for (let i = 0; i < 21; i++) {
      const colIndex = Math.floor(i / 7);
      const col = sectionCol[colIndex];
      const row = colIndex === 1 ? sectionRow[i - 7] : sectionRow[Math.abs(Math.floor(i % 7) - 6)];
      const bendBorder = i === 7 || i === 14 ? 'border-b-[1px]' : '';
      sections.push(
        <BoardSection
          key={i}
          sectionIndex={i + colIndex}
          score={gameState.score}
          rotate={colIndex === 1}
          customStyles={`${col} ${row} ${bendBorder} index-${i + colIndex}`}
        />
      );
    }
    return sections;
  }

  const winner = gameState.score.player1.cur >= 121 || gameState.score.player2.cur >= 121;

  return (
    <div className="grid w-28 grid-cols-1 grid-rows-[0.2fr,_1fr,_7fr,_1fr]">
      <div className="grid grid-cols-[2fr,_1fr] gap-x-4 px-1">
        <ul className="col-start-2 justify-self-center">
          <BoardPegHole track={[PlayerPos.P_ONE, PlayerPos.P_TWO]} isPeg={winner} />
        </ul>
      </div>
      <div className="grid grid-cols-[2fr,_1fr] gap-x-4 px-1">
        <BoardSectionBend score={gameState.score} sectionIndex={7} />
        <BoardSection score={gameState.score} sectionIndex={24} />
      </div>
      <div className={`grid grid-cols-3 grid-rows-[repeat(7,_minmax(0,_1fr))] gap-x-2 px-1`}>
        {renderSections()}
      </div>
      <div className="grid grid-cols-[1fr,_2fr] gap-x-4 px-1">
        <BoardSection score={gameState.score} sectionIndex={-1} numPegHoles={2} />
        <BoardSectionBend score={gameState.score} rotate={true} sectionIndex={15} />
      </div>
    </div>
  );
};

export default Board;
