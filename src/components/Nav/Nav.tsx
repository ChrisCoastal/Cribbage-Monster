import { Link } from 'react-router-dom';

import Button from 'src/ui/Button';

import { auth } from 'src/firestore.config';

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
        <li>
          <div className="w-6 h-6 rounded-full bg-white"></div>
        </li>
        <li>
          <div className="w-6 h-6 rounded-full bg-white"></div>
        </li>
        <li>
          <Link to={'signup'} className="h-6 rounded-full bg-white">
            JOIN
          </Link>
        </li>
        <li>
          <Link to={'login'} className="h-6 rounded-full bg-white">
            LOGIN
          </Link>
        </li>

        {/* <Button handler={signupHandler}>join</Button>
        <Button handler={loginHandler}>login</Button> */}
      </ul>
    </div>
  );
};

export default Nav;
