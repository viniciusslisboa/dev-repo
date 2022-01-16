import React from 'react';
import { useAuth } from './../../hooks/useAuth';

const Nav = ({ onLogout }) => {
  const { user } = useAuth();
  return (
    <nav className="nav">
        <h1 className="logo">SisRepo</h1>
        <h5 className="userLogged">{user.email.substring(0, user.email.indexOf('@'))}</h5>
        <button onClick={onLogout}>Sair</button>
    </nav>
  );
}

export default Nav;
