import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "alexson@hotmail.com",
    password: "123456",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoolgeLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={handleLogin}
      >
        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <button
          disabled={loading}
          className='btn btn-primary btn-block'
          type='submit'
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div onClick={handleGoolgeLogin} className='google-btn'>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className='link' to='/auth/register'>
          Create new account
        </Link>
      </form>
    </>
  );
};
