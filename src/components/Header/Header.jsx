import './styles.css';
const Header = () => {
  const logoutHandler = () => {
    alert('logout');
  };

  return (
    <div className="navbar">
      <p className="logo">Financial Tracker.</p>
      <button className="logo logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Header;
