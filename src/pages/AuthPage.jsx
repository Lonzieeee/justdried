import React, { useState } from 'react';
import { supabase } from '../supabase';
import '../styles/Auth.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Login successful!');
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Signup successful! Check your email for verification.');
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setError(error.message);
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button
                className={mode === 'login' ? 'active' : ''}
                onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
                className={mode === 'signup' ? 'active' : ''}
                onClick={() => setMode('signup')}
            >
              Signup
            </button>
          </div>
          <h2>{mode === 'login' ? 'Login' : 'Signup'}</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
              {loading
                  ? mode === 'login'
                      ? 'Logging in...'
                      : 'Signing up...'
                  : mode === 'login'
                      ? 'Login'
                      : 'Signup'}
            </button>
          </form>
          <div className="divider">or</div>
          <button onClick={handleGoogleAuth} className="google-btn">
            <img src="/google-logo.svg" alt="Google Logo" className="google-logo" />
            {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
          </button>
        </div>
      </div>
  );
};

export default AuthPage;
