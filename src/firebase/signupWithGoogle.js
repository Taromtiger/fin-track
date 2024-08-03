import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { toast } from 'react-toastify';
import { createDoc } from './createUsersDocument';

export const signupWithGoogle = async (navigate, setIsLoading) => {
  setIsLoading(true);
  try {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        createDoc(user, setIsLoading);
        setIsLoading(false);
        // toast.success('User successfully logged in');
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setIsLoading(false);
      });
  } catch (error) {
    toast.error(error.message);
    setIsLoading(false);
  }
};
