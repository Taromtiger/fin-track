import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../Input/CustomInput';
import './styles.css';
import Button from '../Button/Button';
import { isEmailValid, isPasswordValid } from '../../utils/validator';
import { toast } from 'react-toastify';

import { handleLoginWithEmailAndPassword } from '../../firebase/loginWithEmailAndPassword';

const LoginWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginUsingEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmailValid(email)) {
      toast.error('Invalid email format', {});
    }

    if (!isPasswordValid(password)) {
      toast.error('Invalid password', {});
    }

    await handleLoginWithEmailAndPassword(
      email,
      password,
      setIsLoading,
      navigate
    );
  };

  const signupWithGoogle = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div>
      <h2 className="title">
        Login on <span style={{ color: 'var(--theme)' }}>FinTrack.</span>
      </h2>
      <form>
        <CustomInput
          label={'email'}
          state={email}
          setState={setEmail}
          placeholder={'ivandorn@mail.com'}
          type={'email'}
        />

        <CustomInput
          label={'Password'}
          state={password}
          setState={setPassword}
          placeholder={'Example@123'}
          type={'password'}
        />

        <div className="bottom-wrapper">
          <Button
            text={isLoading ? 'Log in...' : 'Log in with Email and Password'}
            onClick={loginUsingEmail}
            disabled={isLoading}
          />

          <span className="bottom-text">or</span>

          <Button
            text={isLoading ? 'Log in...' : 'Log in with Google'}
            blue={true}
            onClick={signupWithGoogle}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginWithEmail;
