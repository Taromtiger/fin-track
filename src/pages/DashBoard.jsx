import Cards from '../components/Cards/Cards.jsx';
import Header from '../components/Header/Header';

const DashBoard = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Cards />
      </div>
    </>
  );
};

export default DashBoard;
