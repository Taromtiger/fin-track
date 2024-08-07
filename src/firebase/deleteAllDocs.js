import { collection, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

export const deleteAllDocs = async (user) => {
  const collectionRef = collection(db, `users/${user.uid}/transactions`);
  const querySnapshot = await getDocs(collectionRef);

  const batch = writeBatch(db);
  alert(
    'Are tou realy want to reset your ballance? It will delete all you incomes and expenses records!'
  );
  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Collection deleted successfully`);
};
