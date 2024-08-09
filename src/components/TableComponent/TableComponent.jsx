import PropTypes from 'prop-types';
import { Button, Space, Table } from 'antd';
import { handleExportCsv, handleImportCsv } from '../../utils/exportImportCsv';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { deleteDocfromDb } from '../../firebase/deleteDocfromDb';

const TableComponent = ({
  transactions,
  search,
  typeValue,
  sortValue,
  setIsIncomeModalVisible,
  setIsExpenseModalVisible,
  setCurrentTransaction,
  setIsEditing,
}) => {
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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ width: '100px' }}>
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                if (record.type === 'income') {
                  setIsIncomeModalVisible(true);
                } else if (record.type === 'expense') {
                  setIsExpenseModalVisible(true);
                }

                setCurrentTransaction(record);
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="danger"
              onClick={() => deleteDocfromDb(user, record.id)}
            >
              Remove
            </Button>
          </Space>
        </div>
      ),
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
    <Table
      dataSource={sortedTransactions}
      columns={columns}
      rowKey="id"
      title={CustomTableTitle}
    />
  );
};

TableComponent.propTypes = {
  transactions: PropTypes.array,
  search: PropTypes.string,
  typeValue: PropTypes.string,
  sortValue: PropTypes.string,
  setCurrentTransaction: PropTypes.func,
  setIsEditing: PropTypes.func,
  setIsIncomeModalVisible: PropTypes.func,
  setIsExpenseModalVisible: PropTypes.func,
};

export default TableComponent;
