import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import CustomInput from '../Input/CustomInput';

import './styles.css';
import Button from '../Button/Button';
import { isEmailValid, isPasswordValid } from '../../utils/validator';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';

const SignupWithEmail = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = (e) => {
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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User =>', user);
        toast.success('User created!');
        setIsLoading(false);
        // setName('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('');
        createDoc(user);
        navigate('/dashboard');

        // Create a document with user id as the following id
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoading(false);
      });
  };

  const createDoc = (user) => {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc
  };

  const signupWithGoogle = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
            onClick={signupWithGoogle}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupWithEmail;
