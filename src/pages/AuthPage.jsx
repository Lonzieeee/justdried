import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState(''); //stores email 
  const [password, setPassword] = useState(''); //stores pasword
  const [loading, setLoading] = useState(false); //show loading state
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Added to enable navigation

  // LOGIN HANDLEr
  const handleLogin = async (e) => {
    e.preventDefault(); //to preevnt default form submission
    setLoading(true); // to show that an operation is in progress
    setError(''); //clears previous errors

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Login successful!');
      navigate('/'); // Redirect to home page after successful login
    }
    setLoading(false); //reset loading state
  };

  //SIGNUP HANDLER
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Signup successful! Check your email for verification.');
      // Optionally, you can redirect after signup if desired:
      // navigate('/');
    }
    setLoading(false);
  };

  //GOOGLE HANDLER  <Needs to enable gogle on supabase>
  
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
