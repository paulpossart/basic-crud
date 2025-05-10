import './App.css';
import Dashboard from './components/Dashboard';
import AuthPage from './components/AuthPage';
import { useAuth } from './context/AuthContext';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/*NAVBAR*/}
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
      </Routes>
    </Router>
  )
}

export default App
