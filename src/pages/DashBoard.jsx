import { useEffect, useState } from 'react';
import Cards from '../components/Cards/Cards.jsx';
import Header from '../components/Header/Header';

import AddIncomeModal from '../components/Modal/AddIncomeModal.jsx';
import AddExpenseModal from '../components/Modal/AddExpenseModal.jsx';
import { getAllDocsFromDb } from '../firebase/getAllDocsFromDb.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Spinner from '../components/Spinner/Spinner.jsx';
import TransactionsTable from '../components/TransactionsTable/TransactionsTable.jsx';
import LineChart from '../components/ChartComponent/LineChart.jsx';
import EmptyPlug from '../components/EmptyPlug/EmptyPlug.jsx';
import { PieChart } from '../components/ChartComponent/PieChart.jsx';
import { deleteAllDocs } from '../firebase/deleteAllDocs.js';
const DashBoard = () => {
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [user] = useAuthState(auth);
  const [loading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleResetBalance = () => {
    deleteAllDocs(user);
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `/users/${user.uid}/transactions`));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change.type);
          if (change.type === 'added') {
            getAllDocsFromDb(user, setTransactions);
          }
          if (change.type === 'removed') {
            getAllDocsFromDb(user, setTransactions);
            setCurrentBalance(0);
            setTotalIncomes(0);
            setTotalExpenses(0);
          }
        });
      });

      setIsLoading(false);
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    const calculateBalance = () => {
      let incomesTotal = 0;
      let expensesTotal = 0;

      transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          incomesTotal += Number(transaction.amount);
        } else {
          expensesTotal += Number(transaction.amount);
        }
      });

      setCurrentBalance(incomesTotal - expensesTotal);
      setTotalIncomes(incomesTotal);
      setTotalExpenses(expensesTotal);
    };

    if (transactions.length > 0) {
      calculateBalance();
      setIsLoading(false);
    }
  }, [transactions]);

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <div className="spinner">
            <Spinner />
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            <Cards
              showIncomeModal={showIncomeModal}
              showExpenseModa={showExpenseModal}
              currentBalance={currentBalance}
              totalIncomes={totalIncomes}
              totalExpenses={totalExpenses}
              resetBalance={handleResetBalance}
            />
            <AddIncomeModal
              visible={isIncomeModalVisible}
              title={'Add Income'}
              cancelHandler={handleIncomeCancel}
              footer={null}
            >
              Income
            </AddIncomeModal>
            <AddExpenseModal
              visible={isExpenseModalVisible}
              title={'Add Expense'}
              cancelHandler={handleExpenseCancel}
              footer={null}
            >
              Expense
            </AddExpenseModal>
            {transactions.length === 0 ? (
              <EmptyPlug />
            ) : (
              <div className="chart-box">
                <LineChart transactions={transactions} />
                <PieChart transactions={transactions} />
              </div>
            )}
            <TransactionsTable transactions={transactions} />
          </>
        )}
      </div>
    </>
  );
};

export default DashBoard;
