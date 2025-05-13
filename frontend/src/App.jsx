import Navbar from './components/1_Nav/Navbar';
import Dashboard from './components/3_Main/Dashboard';
import AuthPage from './components/2_Auth/AuthPage';
import RegPage from './components/2_Auth/RegPage';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar className='navbar' />
        <Routes>
          <Route
            path='/'
            element={
              user ? <Dashboard className='main' /> : <Navigate to='/auth' />
            } />
          <Route
            path='/auth'
            element={
              !user ? <AuthPage className='main' /> : <Navigate to='/' />
            } />
          <Route path='/new-user-reg' element={<RegPage className='main' />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
