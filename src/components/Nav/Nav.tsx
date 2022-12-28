import { Link } from 'react-router-dom';

import useAuthContext from 'src/hooks/useAuthContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const { userAuth } = useAuthContext();
  const { logoutUser } = useFirebaseAuth();
  const navigate = useNavigate();

  function loginHandler() {
    console.log('login');
  }

  function signupHandler() {
    console.log('login');
  }

  return (
    <div className="sticky z-50 flex h-12 w-full items-center justify-between px-4">
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
                onClick={() => logoutUser(() => navigate('/login'))}
                className="h-6 rounded-full bg-white">
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
