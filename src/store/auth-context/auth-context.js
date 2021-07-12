import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {} // Added for auto-complete in our IDE.
});

export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn, 
        onLogin: loginHandler, 
        onLogout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



/*

===== Creating useContext =====

1) import React object from 'react'.
2) call createContext() on the React object.

React.createContext():

This creates a context object.

CONTEXT_OBJECT: Most of the time you pass an object into creatContext(),
and that object is your global state.

==== useContext Constant ====

We then store this object into a constant, and that constant is what gets exported.

EXPORT: We need to export this context object into the components that need to use it.

** NOTE: Think of your context as an object that contains components.

*/