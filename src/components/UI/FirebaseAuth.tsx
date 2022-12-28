import { FC, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import { firebaseAuth } from 'src/firestore.config';

interface FirebaseAuthProps {
  // The Firebase UI Web UI Config object.
  // See: https://github.com/firebase/firebaseui-web#configuration
  // uiConfig: firebaseui.auth.Config;
  // Callback that will be passed the FirebaseUi instance before it is
  // started. This allows access to certain configuration options such as
  // disableAutoSignIn().
  uiCallback?(ui: firebaseui.auth.AuthUI): void;
  // The Firebase App auth instance to use.
  // firebaseAuth: any; // As firebaseui-web
  className?: string;
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // signInFlow: 'popup',
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    // FIXME: popup not connecting to host
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
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
  }, [firebaseui, uiConfig]);

  return <div className={className} ref={elementRef} />;
};

export default FirebaseAuth;
