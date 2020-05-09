import React, { useEffect, useState } from "react";

import { signInWithGoogle, auth } from "database";

const SignIn = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(async (nextUser) => {
      console.log("User changed to: ", nextUser);
      if (auth.currentUser) {
        setUser(auth.currentUser);
      } else {
        setUser({});
      }
    });
  }, []);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-md">
      <div className="flex justify-center">
        {Object.keys(user).length
          ? user.displayName
          : "Please sign in with google"}
      </div>
      <button
        className="bg-blue w-full bg-blue-600 mb-2"
        onClick={signInWithGoogle}
      >
        Sign in With Google
      </button>

      <button className="bg-blue w-full bg-red-600" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
};

export default SignIn;
