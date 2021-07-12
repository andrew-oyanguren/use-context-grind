import { Fragment, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context/auth-context';

function App() {
  
  const ctx = useContext(AuthContext);

  const { isLoggedIn, loginHandler, logoutHandler } = ctx;
  
  return (
      <Fragment>
        <MainHeader />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </Fragment>
  );
}

export default App;




/*

// ===== useContext ===== //

React 'Context' is a behind-the-scenes, component wide, state storage,
that is provided by React! (CONTEXT API)

STORING & NAMING CONVENTIONS:

1) Storing: Just like redux, you want to create a store folder, as a src sub-folder.
2) Naming Syntax: name-context.js

USE_CONTEXT USE_CASES:

You can create multiple context files to manage mulitiple golbal states in your app,
and you can also have just one bigger global state for your entire app.



// ===== Using Context ===== //

After you create your context object, you need to do two things to use it:

1) PROVIDE IT: By wrapping your components that should have access to it,
with the Provider, you are telling React these components can access it.

2) CONSUME IT: You need to hook into it, listen to it.

=== PROVIDE_CONTEXT_OBJECT: ===

Thanks to React, your context object has a provider property that you can access,
and allows you to wrap you components with it, granting them access to your context.

PROVIDER_SYNTAX: <YourContextObject.Provider></YourContextObject.Provider>

VALUE_PROP: The Provider wrapper, also needs an initial value, 
and that is possible using the value prop to pass in the initial value (object).

INITIAL_VALUE: Super important, to update the value, your initial state values
should not be hardcoded, but equal to themselves, this allows for updates to occurr when state changes.

=== CONSUMING/LISTENING ==

We can consume or listen to our context in two ways:

1) YourContext.Consumer: You can wrap parts of a component with your context wrapper, and you will
instead of .provider use .consumer.

YOURCONTEXT.CONSUMER: 

CONSUMER FUNCTION CHILD: The consumer take in its own child function, 
a dynamic function that takes in the context object as an argument, allowing you access,
and inside the function block is where you then add all the JSX that wants access.

SYNTAX: 

<YourContext.Consumer>
  {(ctx) => {
    ...JSX
  }}
</YourContext.Consumer>

** NOTE: The JSX in the code block then gets access to the ctx object.



2.) useContext() HOOK:

The useContext hook, provided by React, allows us to tap into a context and listen to it.

=== Using useContext() ===

Very simple, you call useContext() and pass the imported context that you want to use,
and then you store that into a constant 'ctx'.

** NOTE: using useContext is a bit more elegant, from using context.Consumer and it's arrow function.



=== Making Context Dynamic ===

You can also pass functions to other components, on top of regular data.

PASSING_FUNCTIONS: 

In our root component where we are wrapping our JSX with our context, we can also pass functions
from the value prop that will make that function a part of the ctx object.

** NOTE: for better auto-completed in your IDE, it's a good idea to add any functions and managed
data through you context object into your default context object.



=== Custom Context Provider Component ===

You can also, inside you context.js file, create a contextProvider component.

ContextProvider Component: Simply returns you <Context.Provider><Context.Provider>,
and returns props.children, through props.

This is so you can import useState and outsource your logic, currently in your root component,
and handle the login in the contextprovider component, leaving a cleaner/easier to read root.

VALUE_PROP: Then you can pass the data/functions through the 'value' (inital object) prop,
allowing the props.children to access it.

=== Wrapping entire <App/> ===

Inside of our index.js we can wrap our entire <app /> with our custom contextProvider component.

Then we can import useContext, and our AuthContext, and use any dynamic rendering needed in our <App/> JSX.

*/