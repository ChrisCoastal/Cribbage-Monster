import BoardSection from 'src/components/BoardSection/BoardSection';
import BoardSectionBend from 'src/components/BoardSectionBend/BoardSectionBend';

const Board = () => {
  function renderSections() {
    const sections = [];
    for (let i = 0; i < 21; i++) sections.push(<BoardSection key={i} />);
    return sections;
  }

  return (
    <div className="grid w-28 grid-cols-1 grid-rows-[1fr,_7fr,_1fr]">
      <div className="grid grid-cols-[2fr,_1fr] gap-x-4 px-1">
        <BoardSectionBend />
        <BoardSection />
      </div>
      <div className={`grid grid-cols-3 grid-rows-[repeat(7,_minmax(0,_1fr))] gap-x-2 px-1`}>
        {renderSections()}
      </div>
    </div>
  );
};

export default Board;
