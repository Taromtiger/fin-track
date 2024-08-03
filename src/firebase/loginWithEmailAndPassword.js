import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';

export const handleLoginWithEmailAndPassword = async (
  email,
  password,
  setIsLoading,
  navigate
) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      toast.success('User successfully logged in');
      setIsLoading(false);
      navigate('/dashboard');

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsLoading(false);
    });
};
