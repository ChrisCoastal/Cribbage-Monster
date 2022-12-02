const Deck = () => {
  return (
    <div className="relative self-center justify-self-center col-start-1 row-start-3 h-full w-full">
      <span className="absolute top-[14px] w-12 h-16  bg-red-200 border-black border rounded-sm"></span>
      <span className="absolute top-[12px] left-[2px] w-12 h-16 bg-red-200 border-black border rounded-sm"></span>
      <span className="absolute top-[10px] left-[4px] w-12 h-16 bg-red-200 border-black border rounded-sm"></span>
      <span className="absolute top-[8px] left-[6px] w-12 h-16 bg-red-200 border-black border rounded-sm"></span>
      <span className="absolute top-[6px] left-[8px] w-12 h-16 bg-red-200 border-black border rounded-sm"></span>
    </div>
  );
};

export default Deck;
