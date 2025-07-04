import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-avatar">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="2"/><path strokeWidth="2" d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"/></svg>
      </div>
      <h2>Sign Up</h2>
      {success ? (
        <div style={{textAlign: 'center'}}>
          <p style={{color: '#43a047', fontWeight: 500}}>Signup successful! Please <Link to="/login">log in</Link>.</p>
        </div>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M16 21v-2a4 4 0 00-8 0v2"/><circle cx="12" cy="7" r="4" strokeWidth="2"/></svg>
            <input type="email" placeholder="Username" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="8" rx="4" strokeWidth="2"/><path strokeWidth="2" d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit">SIGN UP</button>
          {error && <p className="error">{error}</p>}
          <div className="auth-extras">
            <label>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me
            </label>
          </div>
        </form>
      )}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup; 