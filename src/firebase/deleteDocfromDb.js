import { deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteDocfromDb = async (user, id) => {
  try {
    const transactionsCollection = collection(
      db,
      `users/${user.uid}/transactions`
    );
    const querySnapshot = await getDocs(transactionsCollection);

    querySnapshot.forEach((doc) => {
      if (doc.data().id === id) {
        const docRef = doc.ref;

        deleteDoc(docRef)
          .then(() =>
            console.log(`Document with ID ${id} deleted successfully.`)
          )
          .catch((error) => console.error('Error deleting document:', error));
      }
    });
  } catch (error) {
    console.error('Error getting document IDs:', error);
  }
};
