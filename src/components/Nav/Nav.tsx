import { Link } from 'react-router-dom';

import { AvatarSize } from 'src/@types';

import useAuthContext from 'src/hooks/useAuthContext';
import useSettingsContext from 'src/hooks/useSettingsContext';
import useFirebaseAuth from 'src/hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import Avatar from 'src/components/Avatar/Avatar';
import CreateGame from '../CreateGame/CreateGame';

const Nav = () => {
  const { userAuth } = useAuthContext();
  const { userSettingsState } = useSettingsContext();
  const { logoutUser } = useFirebaseAuth();
  const navigate = useNavigate();

  console.log(userSettingsState);

  return (
    <div className="sticky z-50 flex h-16 w-full items-center justify-between bg-stone-900/40 px-4 md:px-8">
      <h1 className="cursor-pointer font-molle text-xl text-white md:text-2xl lg:text-3xl">
        Cribbage Monster
      </h1>
      <ul className="flex items-center gap-3">
        {/* <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li>
        <li>
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </li> */}
        {userAuth && userSettingsState ? (
          <>
            <li>
              <Avatar className={`${AvatarSize.SM}`} avatar={userSettingsState.avatar}></Avatar>
            </li>
            <li>
              <Button handler={() => logoutUser(() => navigate('/login'))}>LOGOUT</Button>
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
