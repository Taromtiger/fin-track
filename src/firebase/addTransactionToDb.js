import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';

export const addTransactionToDb = async (user, transaction) => {
  try {
    const docRef = await addDoc(
      collection(db, `users/${user.uid}/transactions`),
      transaction
    );

    toast.success('Transactions added');
  } catch (error) {
    toast.error('Error adding document');
  }
};
