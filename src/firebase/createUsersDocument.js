import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const createDoc = (user, setIsLoading, name) => {
  if (!user) return;

  const useRef = doc(db, 'users', user.uid);
  const userData = getDoc(useRef);

  if (!userData) {
    try {
      setDoc(doc(db, 'users', user.uid), {
        name: user.displayName ? user.displayName : name,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : '',
        createdAt: new Date(),
      });
      toast.success('Document created');
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  } else {
    setIsLoading(false);
  }
};

export { createDoc };
