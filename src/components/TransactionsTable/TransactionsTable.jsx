import PropTypes from 'prop-types';
import { Table } from 'antd';

const TransactionsTable = ({ transactions }) => {
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

  return <Table dataSource={transactions} columns={columns} rowKey={`id`} />;
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array,
};

export default TransactionsTable;
