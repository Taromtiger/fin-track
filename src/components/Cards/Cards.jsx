import './styles.css';

import { Card } from 'antd';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const CardComponent = ({
  totalBalance,
  totalIncome,
  totalExpenses,
  showIncomeModal,
  showExpenseModa,
}) => {
  return (
    <div className="card-container">
      <Card className="card">
        <h2>Current Ballance</h2>
        <p>$ {totalBalance}</p>
        <Button text={'Reset Ballance'} blue={true} />
      </Card>

      <Card className="card">
        <h2>Total Income</h2>
        <p>$ {totalIncome}</p>
        <Button text={'Add Income'} blue={true} onClick={showIncomeModal} />
      </Card>

      <Card className="card">
        <h2>Total Expenses</h2>
        <p>$ {totalExpenses}</p>
        <Button text={'Add Expense'} blue={true} onClick={showExpenseModa} />
      </Card>
    </div>
  );
};

CardComponent.propTypes = {
  totalBalance: PropTypes.string,
  totalIncome: PropTypes.string,
  totalExpenses: PropTypes.string,
  showExpenseModa: PropTypes.func,
  showIncomeModal: PropTypes.func,
};

export default CardComponent;
