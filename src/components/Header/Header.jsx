import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

import './styles.css';
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  const logoutHandler = () => {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar">
      <p className="logo">Financial Tracker.</p>
      {user && (
        <button className="logo logout-btn" onClick={logoutHandler}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
