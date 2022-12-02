const Avatar = () => {
  const opponentHand = ['card', 'card', 'card', 'card'];
  const cards = opponentHand.map((card, i) => <span key={i} className="w-6 h-8 bg-red-300"></span>);

  return (
    <div className="flex flex-col items-center col-start-2">
      <p className="text-sm">opponent</p>
      <div className=" w-10 h-10 mb-2 bg-slate-400 rounded-full border-2 border-black overflow-hidden">
        <img src="" alt="" />
      </div>
      <div className="flex gap-1">{cards}</div>
    </div>
  );
};

export default Avatar;
