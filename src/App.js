import './App.css';
import Layout from './component/Layout';
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
// import UserContext from './context/UserContext';
import { UserContextProvider } from './context/UserContext';
import CreatePost from './pages/CreatePost';
import Page from './pages/Page';
import EditPage from './pages/EditPage';

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post/:id' element={<Page />} />
            <Route path='/edit/:id' element={<EditPage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
