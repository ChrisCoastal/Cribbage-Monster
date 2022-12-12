const Deck = () => {
  return (
    <div className="relative h-32 w-32">
      <span className="absolute top-[14px] h-16 w-12  rounded-sm border border-black bg-red-200"></span>
      <span className="absolute top-[12px] left-[2px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
      <span className="absolute top-[10px] left-[4px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
      <span className="absolute top-[8px] left-[6px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
      <span className="absolute top-[6px] left-[8px] h-16 w-12 rounded-sm border border-black bg-red-200"></span>
    </div>
  );
};

export default Deck;
