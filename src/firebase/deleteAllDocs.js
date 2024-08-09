import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteAllDocs = async (user) => {
  const collectionRef = collection(db, `users/${user.uid}/transactions`);
  const querySnapshot = await getDocs(collectionRef);

  console.log(querySnapshot.docs.length);

  const batch = writeBatch(db);
  if (querySnapshot.docs.length === 0) {
    alert(
      'Your balance is currently 0. To change your balance, add income and expenses.'
    );
    return;
  }

  alert(
    'Are you really want to reset your balance? It will delete all you incomes and expenses records!'
  );
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Collection deleted successfully`);
};
