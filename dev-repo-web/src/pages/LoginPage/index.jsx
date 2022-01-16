import React, { useState } from "react";

import "./styles.css"
import { useAuth } from './../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
  }

  return (
    <main id="login">
      <h1 className="title">Login</h1>
      <div className="form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Digite seu email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <div className="actions">
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;