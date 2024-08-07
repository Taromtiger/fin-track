import { Line } from '@ant-design/charts';
import PropTypes from 'prop-types';

export const ChartComponent = ({ transactions }) => {
  const formattedTransactions = transactions.map((transaction) => ({
    ...transaction,
    amount: parseFloat(transaction.amount), // Ensure amount is a number
  }));

  const sortedTransactions = formattedTransactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = sortedTransactions.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
    type: transaction.type,
  }));

  const config = {
    data,
    width: 1300,
    height: 500,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
    seriesField: 'type',
    colorField: 'type',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
      },
    },
  };

  return (
    <div style={{ marginBottom: '3rem', backgroundColor: 'fff' }}>
      <Line {...config} />
    </div>
  );
};

ChartComponent.propTypes = {
  transactions: PropTypes.array,
};

export default ChartComponent;
