const Board = () => {
  const boardPos =
    'col-start-4 row-span-3 row-start-2 h-full w-24 justify-self-end rounded-sm border border-red-200';
  return <div className={`${boardPos} grid grid-cols-3 grid-rows-4`}>Board</div>;
};

export default Board;
