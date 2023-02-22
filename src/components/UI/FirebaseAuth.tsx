import { FC, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import { firebaseAuth } from 'src/firestore.config';

interface FirebaseAuthProps {
  uiCallback?(ui: firebaseui.auth.AuthUI): void;
  className?: string;
}

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/dashboard',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

const FirebaseAuth: FC<FirebaseAuthProps> = ({ className, uiCallback }) => {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Get or Create a firebaseUI instance.
    const firebaseUIWidget =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
    if (uiConfig.signInFlow === 'popup') firebaseUIWidget.reset();

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user && userSignedIn) firebaseUIWidget.reset();
      setUserSignedIn(!!user);
    });

    // Trigger the callback if any was set.
    if (uiCallback) uiCallback(firebaseUIWidget);

    // Render the firebaseUi Widget.
    if (elementRef !== null) firebaseUIWidget.start(elementRef.current as Element, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUIWidget.reset();
    };
  }, [uiCallback, userSignedIn]);

  return <div className={className} ref={elementRef} />;
};

export default FirebaseAuth;
