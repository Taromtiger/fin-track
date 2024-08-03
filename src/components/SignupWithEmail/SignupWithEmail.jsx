import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../Input/CustomInput';
import './styles.css';
import Button from '../Button/Button';
import { isEmailValid, isPasswordValid } from '../../utils/validator';
import { toast } from 'react-toastify';

import { handleCreateNewUser } from '../../firebase/createUserWithEmailAndPassword';
import { signupWithGoogle } from '../../firebase/signupWithGoogle';

const SignupWithEmail = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmailValid(email)) {
      toast.error('Invalid email format', {});
    }

    if (!isPasswordValid(password)) {
      toast.error('Invalid password', {});
      setIsLoading(false);
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Password and confirm password don't match", {});
      setIsLoading(false);
      return;
    }
    // Authenticate new usser, or basically create a new account using email and password

    await handleCreateNewUser(email, password, setIsLoading, navigate, name);
  };

  return (
    <div>
      <h2 className="title">
        Sign Up on <span style={{ color: 'var(--theme)' }}>FinTrack.</span>
      </h2>

      <form>
        <CustomInput
          label={'full name'}
          state={name}
          setState={setName}
          placeholder={'Ivan Dorn'}
          type={'text'}
        />

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

        <CustomInput
          label={'Confirm Password'}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={'Example@123'}
          type={'password'}
        />

        <div className="bottom-wrapper">
          <Button
            text={isLoading ? 'Sign up...' : 'Sign Up with Email and Password'}
            onClick={signupWithEmail}
            disabled={isLoading}
          />

          <span className="bottom-text">or</span>

          <Button
            text={isLoading ? 'Sign up...' : 'Sign Up with Google'}
            blue={true}
            onClick={() => signupWithGoogle(navigate, setIsLoading)}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupWithEmail;
