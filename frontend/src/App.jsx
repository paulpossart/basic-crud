import Header from './components/1_Header/Header';
import SignInPage from './components/2_Auth/SignInPage';
import RegPage from './components/3_Users/CreateUser';
import Todos from './components/4_Todos/Todos';
import Settings from './components/3_Users/Settings';
import NotFound from './components/2_Auth/NotFound';

import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';

function App() {
  const { user, loading } = useAuth();

  console.log(user)

  if (loading) {
    return <p>loading</p>
  }

  return (
    <Router>
      <div className="App">
        <Header className='header' />

        <Routes>

          <Route
            path='/auth'
            element={
              !user ? <SignInPage className='main' /> : <Navigate to='/' />
            }
          />

          <Route
            path='/new-user-reg'
            element={
            !user ? <RegPage className='main' /> : <Navigate to='/' />
          }
          />

           <Route
            path='/'
            element={
              user ? <Todos className='main' /> : <Navigate to='/auth' />
            }
          />

          <Route
            path='/settings'
            element={
              user ? <Settings className='main' /> : <Navigate to='/auth' />
            }
          />  

          <Route
            path='*'
            element={<NotFound />}
          />  

        </Routes>

      </div>
    </Router>
  )
}

export default App
