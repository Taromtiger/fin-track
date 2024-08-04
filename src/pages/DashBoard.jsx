import { useState } from 'react';
import Cards from '../components/Cards/Cards.jsx';
import Header from '../components/Header/Header';

import AddIncomeModal from '../components/Modal/AddIncomeModal.jsx';
import AddExpenseModal from '../components/Modal/AddExpenseModal.jsx';

const DashBoard = () => {
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

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

  return (
    <>
      <Header />
      <div className="container">
        <Cards
          showIncomeModal={showIncomeModal}
          showExpenseModa={showExpenseModal}
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
      </div>
    </>
  );
};

export default DashBoard;
