import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Initial State:
const emailInitialState = {
  value: '',
  isValid: null
};

const passwordInitialState = {
  value: '',
  isValid: null
};

// Reducer Functions:
const emailReducer = (prevState, action) => {

  if (action.type === 'EMAIL_INPUT_VALUE') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    };
  }

  if (action.type === 'EMAIL_INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@')
    };
  }

  return emailInitialState;
};

const passwordReducer = (prevState, action) => {

  if (action.type === 'PASSWORD_INPUT_VALUE') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    };
  }

  if (action.type === 'PASSWORD_INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6
    };
  }

  return passwordInitialState;

};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, emailInitialState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, passwordInitialState);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'EMAIL_INPUT_VALUE',
      val: event.target.value
    });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'PASSWORD_INPUT_VALUE',
      val: event.target.value
    });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'EMAIL_INPUT_BLUR'
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: 'PASSWORD_INPUT_BLUR'
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
