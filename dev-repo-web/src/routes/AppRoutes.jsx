import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from  "react-router-dom";

import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';

import { Authprovider } from '../contexts/auth';
import { useAuth } from './../hooks/useAuth';



const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useAuth();

    if(loading) {
      return (
        <div className="loading">Carregando...</div>
      );
    }

    if(!authenticated) {
      return <Navigate to='/login' />
    }

    return children;
  }

  const Redirect = ({ children }) => {
    const { authenticated } = useAuth();

    if(authenticated) {
      return <Navigate to='/' />
    }

    return children;
  }


  return (
    <Router>
      <Authprovider>
        <Routes>
          <Route exact path="/" element={
            <Private>
              <MainPage />
            </Private>
          } />
          <Route exact path="/login" element={
            <Redirect>
              <LoginPage />
            </Redirect>
          } />
        </Routes>
      </Authprovider>
    </Router>
  );
}


export default AppRoutes;