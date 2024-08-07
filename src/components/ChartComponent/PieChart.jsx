import { Pie } from '@ant-design/plots';
import PropTypes from 'prop-types';

export const PieChart = ({ transactions }) => {
  const reduceData = transactions.reduce((acc, transaction) => {
    const tag = transaction.tag;
    const amount = parseFloat(transaction.amount);

    if (!acc[tag]) {
      acc[tag] = { tag, amount: 0 };
    }
    acc[tag].amount += amount;
    return acc;
  }, {});

  const data = Object.values(reduceData);

  const config = {
    data,
    width: 500,
    height: 500,
    autoFit: true,
    angleField: 'amount',
    colorField: 'tag',

    label: {
      text: 'tag',
      style: {
        fontWeight: 'normal',
      },
    },

    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  return <Pie {...config} />;
};

PieChart.propTypes = {
  transactions: PropTypes.array,
};
