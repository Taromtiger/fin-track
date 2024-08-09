import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const editDocument = async (user, id, updatedTransaction) => {
  try {
    const transactionsCollection = collection(
      db,
      `users/${user.uid}/transactions`
    );
    const querySnapshot = await getDocs(transactionsCollection);

    querySnapshot.forEach((doc) => {
      if (doc.data().id === id) {
        const docRef = doc.ref;
        updateDoc(docRef, updatedTransaction);
      }
    });
  } catch (error) {
    console.error('Error getting document IDs:', error);
  }
};
