const Nav = () => {
  return (
    <div className="flex items-center fixed top-0 justify-between w-full h-12 px-4">
      <span>CRIB</span>
      <ul className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-white"></div>
        <div className="w-6 h-6 rounded-full bg-white"></div>
        <button>menu</button>
      </ul>
    </div>
  );
};

export default Nav;
