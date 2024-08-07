import emptyPlug from '../../assets/transactions.svg';
import './styles.css';

const EmptyPlug = () => {
  return (
    <div className="plug-box">
      <img src={emptyPlug} alt="no transactions" className="plug-img" />
      <p className="plug-text">You Have No Transactions Currently</p>
    </div>
  );
};

export default EmptyPlug;
