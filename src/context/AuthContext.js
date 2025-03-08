import { supabase } from '../supabase'; // ✅ Adjust the path if needed

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // ✅ Simulating login
  };

  const logout = () => {
    setUser(null); // ✅ Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to access authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
