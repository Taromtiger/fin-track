import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const getAllDocsFromDb = async (user, setTransactions) => {
  if (user) {
    const q = query(collection(db, `/users/${user.uid}/transactions`));

    try {
      const querySnapshot = await getDocs(q);

      let transactionsArr = [];
      querySnapshot.forEach((doc) => {
        transactionsArr.push(doc.data());
      });
      setTransactions(transactionsArr);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  }
};
