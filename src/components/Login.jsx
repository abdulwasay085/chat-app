import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/chat');
  };

  return (
    <div className="auth-container">
      <div className="auth-avatar">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="2"/><path strokeWidth="2" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"/></svg>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M16 21v-2a4 4 0 00-8 0v2"/><circle cx="12" cy="7" r="4" strokeWidth="2"/></svg>
          <input type="email" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="8" rx="4" strokeWidth="2"/><path strokeWidth="2" d="M7 11V7a5 5 0 0110 0v4"/></svg>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">LOGIN</button>
        {error && <p className="error">{error}</p>}
        <div className="auth-extras">
          <label>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
          </label>
          <a href="#">Forgot your password?</a>
        </div>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login; 