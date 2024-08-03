import { useState } from 'react';
import './styles.css';
import SignupWithEmail from '../SignupWithEmail/SignupWithEmail';
import LoginWithEmail from '../LoginWithEmail/LoginWithEmail';

const SignupSignin = () => {
  const [loginForm, setLoginForm] = useState(false);

  return (
    <div className="signup-wrapper">
      {loginForm ? <LoginWithEmail /> : <SignupWithEmail />}
      <p className="bottom-text">
        {loginForm
          ? "Don't Have An Account Yet? "
          : 'Have An Account Already? '}
        <button className="btn-switch" onClick={() => setLoginForm(!loginForm)}>
          Click Here
        </button>
      </p>
    </div>
  );
};

export default SignupSignin;
