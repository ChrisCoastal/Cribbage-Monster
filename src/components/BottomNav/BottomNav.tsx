const BottomNav = () => {
  return (
    <div className="flex items-center fixed bottom-0 w-full h-12 px-4 bg-red-200 rounded-t-lg">
      <ul className="flex items-center justify-around w-full">
        <li className="w-8 h-8 rounded-full bg-white"></li>
        <li className="w-8 h-8 rounded-full bg-white"></li>
        <li className="w-8 h-8 rounded-full bg-white"></li>
        <li className="w-8 h-8 rounded-full bg-white"></li>
      </ul>
    </div>
  );
};

export default BottomNav;
