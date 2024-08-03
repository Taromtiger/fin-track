import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const createDoc = async (user, setIsLoading, name) => {
  console.log(user);

  if (!user) return;

  const useRef = doc(db, 'users', user.uid);
  const userData = await getDoc(useRef);

  if (!userData.exists()) {
    try {
      await setDoc(doc(db, 'users', user.uid), {
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
    toast.error('Document already exists');
    setIsLoading(false);
  }
};

export { createDoc };

// Make sure that the doc with the uid doesn't exist
// Create a doc
