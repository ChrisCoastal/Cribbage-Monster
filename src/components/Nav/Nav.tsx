import Button from 'src/ui/Button';

import { getAuth } from 'firebase/auth';

const Nav = () => {
  function loginHandler() {
    console.log('login');
  }
  function signupHandler() {
    console.log('login');
  }

  return (
    <div className="flex items-center fixed top-0 justify-between w-full h-12 px-4">
      <span>CRIB</span>
      <ul className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-white"></div>
        <div className="w-6 h-6 rounded-full bg-white"></div>
        <Button handler={signupHandler}>join</Button>
        <Button handler={loginHandler}>login</Button>
      </ul>
    </div>
  );
};

export default Nav;
