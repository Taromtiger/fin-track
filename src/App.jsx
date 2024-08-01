import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import DashBoard from './pages/DashBoard';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
