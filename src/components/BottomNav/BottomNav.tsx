const BottomNav = () => {
  return (
    <div className="fixed bottom-0 flex h-12 w-full items-center rounded-t-lg bg-red-200 px-4">
      <ul className="flex w-full items-center justify-around">
        <li className="h-8 w-8 rounded-full bg-white"></li>
        <li className="h-8 w-8 rounded-full bg-white"></li>
        <li className="h-8 w-8 rounded-full bg-white"></li>
        <li className="h-8 w-8 rounded-full bg-white"></li>
      </ul>
    </div>
  );
};

export default BottomNav;
