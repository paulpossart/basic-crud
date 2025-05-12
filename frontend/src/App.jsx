import './App.css';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import RegPage from './components/RegPage';
import { useAuth } from './context/AuthContext';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            user ? <Dashboard /> : <Navigate to='/auth' />
          } />
        <Route
          path='/auth'
          element={
            !user ? <AuthPage /> : <Navigate to='/' />
          } />
          <Route path='/new-user-reg' element={<RegPage />} />
      </Routes>
    </Router>
  )
}

export default App
