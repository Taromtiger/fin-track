import { useState } from 'react';
import CustomInput from '../Input/CustomInput';

import './styles.css';
import Button from '../Button/Button';
const SignupSignin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = () => {};

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: 'var(--theme)' }}>FinTrack.</span>
      </h2>
      <form>
        <CustomInput
          label={'full name'}
          state={name}
          setState={setName}
          placeholder={'Ivan Dorn'}
        />
        <CustomInput
          label={'email'}
          state={email}
          setState={setEmail}
          placeholder={'ivandorn@mail.com'}
        />
        <CustomInput
          label={'Password'}
          state={password}
          setState={setPassword}
          placeholder={'Example@123'}
        />
        <CustomInput
          label={'Confirm Password'}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={'Example@123'}
        />
        <div className="bottom-wrapper">
          <Button
            text={'Sign Up with Email and Password'}
            onClick={handleClick}
          />
          <span className="bottom-text">or</span>
          <Button text={'Sign Up with Google'} blue={true} />
          <p className="bottom-text">Or Have An Account Already? Click Here</p>
        </div>
      </form>
    </div>
  );
};

export default SignupSignin;
