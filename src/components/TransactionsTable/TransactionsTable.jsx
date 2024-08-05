import PropTypes from 'prop-types';
import { Input, Select, Table } from 'antd';
import { useState } from 'react';
import './styles.css';

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState('');
  const [selectType, setSelectType] = useState('');
  const { Option } = Select;

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

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
      transaction.type.includes(selectType)
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
          className="select-input"
          value={selectType}
          onChange={(value) => setSelectType(value)}
          allowClear
          placeholder="Filter"
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>

      <Table
        dataSource={filteredTransactions}
        columns={columns}
        rowKey={`id`}
      />
    </>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
};

export default TransactionsTable;
