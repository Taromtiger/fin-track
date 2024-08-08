import { doc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteDocfromDb = async (user, id) => {
  try {
    const transactionsCollection = collection(
      db,
      `users/${user.uid}/transactions`
    );
    const querySnapshot = await getDocs(transactionsCollection);
    let docId = '';

    querySnapshot.docs.map((doc) => {
      if (
        Object.values(doc._document.data.value.mapValue.fields.id).includes(id)
      ) {
        docId = doc.id;
      }
    });

    const docRef = doc(db, `users/${user.uid}/transactions`, docId);

    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error getting document IDs:', error);
  }
};
