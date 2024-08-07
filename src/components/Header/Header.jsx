import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, doc } from '../../firebase';
import userImg from '../../assets/user.svg';

import './styles.css';
import { getDoc } from 'firebase/firestore';

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      const fetchUserData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
        } else {
          console.log('No such document!');
        }
      };
      fetchUserData();
    }
  }, [user]);

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
          <img
            src={user.photoURL === null ? userImg : user.photoURL}
            alt="user logo"
            className="user-logo"
          />
          {`Logout ${name}`}
        </button>
      )}
    </div>
  );
};

export default Header;
