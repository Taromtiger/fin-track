import PropTypes from 'prop-types';
import { Button, Input, Select, Table } from 'antd';
import { useState } from 'react';

import './styles.css';
import { handleExportCsv, handleImportCsv } from '../../utils/exportImportCsv';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [sortValue, setSortValue] = useState('');
  const { Option } = Select;
  const [user] = useAuthState(auth);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
  ];

  const filteredTransactions = [...transactions].filter(
    (transaction) =>
      transaction.name?.toLowerCase().includes(search.toLocaleLowerCase()) &&
      transaction.type?.includes(typeValue)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortValue) {
      case 'dateAsc':
        return new Date(a.date) - new Date(b.date);
      case 'dateDesc':
        return new Date(b.date) - new Date(a.date);
      case 'amountAsc':
        return a.amount - b.amount;
      case 'amountDesc':
        return b.amount - a.amount;
      default:
        return 0;
    }
  });

  const CustomTableTitle = () => (
    <div className="custon-header">
      <span>My Transactions</span>
      <div className="btn-box">
        <Button onClick={() => handleExportCsv(transactions)}>
          Export to csv
        </Button>
        <p className="custom-input">
          <label htmlFor="import">
            Import from csv
            <input
              id="import"
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={(e) => handleImportCsv(e, user)}
            />
          </label>
        </p>
        {/* <Button>Import from csv</Button> */}
      </div>
    </div>
  );

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

      <Table
        dataSource={sortedTransactions}
        columns={columns}
        rowKey="id"
        title={CustomTableTitle}
      />
    </>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
};

export default TransactionsTable;
