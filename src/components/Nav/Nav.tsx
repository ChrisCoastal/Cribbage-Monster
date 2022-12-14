import { Link } from 'react-router-dom';

import Button from 'src/components/UI/Button';

import { firebaseAuth } from 'src/firestore.config';
import useAuthContext from 'src/hooks/useAuthContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';

const Nav = () => {
  const { userAuth } = useAuthContext();
  const { logoutUser } = useFirebaseAuth();

  function loginHandler() {
    console.log('login');
  }
  // function logoutHandler() {
  //   console.log('login');
  // }
  function signupHandler() {
    console.log('login');
  }

  return (
    <div className="fixed top-0 flex h-12 w-full items-center justify-between px-4">
      <span>CRIB</span>
      <ul className="flex items-center gap-3">
        <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li>
        <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li>
        {userAuth ? (
          <>
            <li>
              <button className="h-6 rounded-full bg-white">MENU</button>
            </li>
            <li>
              <button
                onClick={() => logoutUser(() => console.log('OUT!'))}
                className="h-6 rounded-full bg-white"
              >
                LOGOUT
              </button>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}

        {/* <Button handler={signupHandler}>join</Button>
        <Button handler={loginHandler}>login</Button> */}
      </ul>
    </div>
  );
};

export default Nav;
