import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';

import './styles.css';

const TransactionsTable = ({
  transactions,
  setIsIncomeModalVisible,
  setIsExpenseModalVisible,
  setCurrentTransaction,
  setIsEditing,
}) => {
  const [search, setSearch] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const { Option } = Select;

  return (
    <>
      <div className="filter-box">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name"
          className="filter-input"
        />
        <Select
          className="select-tag"
          value={typeValue}
          onChange={(value) => setTypeValue(value)}
          placeholder="Filter"
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>

        <Select
          className="select-sort"
          value={sortValue}
          onChange={(value) => setSortValue(value)}
          placeholder="Filter"
        >
          <Option value="">No Sort</Option>
          <Option value="dateAsc">By Date (Asc)</Option>
          <Option value="dateDesc">By Date (Desc)</Option>
          <Option value="amountAsc">By Amount (Asc)</Option>
          <Option value="amountDesc">By Amount (Desc)</Option>
        </Select>
      </div>
      <TableComponent
        transactions={transactions}
        search={search}
        typeValue={typeValue}
        sortValue={sortValue}
        setIsIncomeModalVisible={setIsIncomeModalVisible}
        setIsExpenseModalVisible={setIsExpenseModalVisible}
        setCurrentTransaction={setCurrentTransaction}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
  setCurrentTransaction: PropTypes.func,
  setIsEditing: PropTypes.func,
  setIsIncomeModalVisible: PropTypes.func,
  setIsExpenseModalVisible: PropTypes.func,
};

export default TransactionsTable;
