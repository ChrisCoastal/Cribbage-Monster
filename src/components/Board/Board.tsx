import BoardSection from 'src/components/BoardSection/BoardSection';
import BoardSectionBend from 'src/components/BoardSectionBend/BoardSectionBend';
import BoardPegHole from '../BoardPegHole/BoardPegHole';

const Board = () => {
  function renderSections() {
    const sections = [];
    for (let i = 0; i < 21; i++) {
      const customStyles = i > 18 ? 'border-b-[1px]' : '';
      sections.push(<BoardSection key={i} customStyles={customStyles} />);
    }
    return sections;
  }

  return (
    <div className="grid w-28 grid-cols-1 grid-rows-[0.2fr,_1fr,_7fr,_1fr]">
      <div className="grid grid-cols-[2fr,_1fr] gap-x-4 px-1">
        <ul className="col-start-2 justify-self-center">
          <BoardPegHole />
        </ul>
      </div>
      <div className="grid grid-cols-[2fr,_1fr] gap-x-4 px-1">
        <BoardSectionBend />
        <BoardSection />
      </div>
      <div className={`grid grid-cols-3 grid-rows-[repeat(7,_minmax(0,_1fr))] gap-x-2 px-1`}>
        {renderSections()}
      </div>
      <div className="grid grid-cols-[1fr,_2fr] gap-x-4 px-1">
        <BoardSection numPegHoles={2} />
        <BoardSectionBend rotate={true} />
      </div>
    </div>
  );
};

export default Board;
