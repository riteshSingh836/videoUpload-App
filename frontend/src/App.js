// import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import Login from './Pages/Login/Login';
import UploadData from './Pages/UploadData/UploadData';
import ProtectedRoute from './Components/ProtectedRoute';
import ListingPage from './Pages/ListingPage/ListingPage';
import UserVideosPage from './Pages/UserVideosPage/UserVideosPage';

function App() {
  const browserRouter = createBrowserRouter([
    {path: '/', element: <CreateAccount/>},
    {path: '/login', element: <Login/>},
    {path: '/upload-data', element: <ProtectedRoute><UploadData/></ProtectedRoute> },
    {path: '/listing', element: <ProtectedRoute><ListingPage/></ProtectedRoute> },
    {path: '/users/:userId/videos', element: <ProtectedRoute><UserVideosPage/></ProtectedRoute> }
  ]);
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
