import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { createDoc } from './createUsersDocument';

export const handleCreateNewUser = async (
  email,
  password,
  setIsLoading,
  navigate,
  name
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success('User created!');
      setIsLoading(false);

      createDoc(user, setIsLoading, name);
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
