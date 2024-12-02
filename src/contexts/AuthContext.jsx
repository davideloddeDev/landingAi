import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/common/Loading';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve essere usato all\'interno di AuthProvider');
  }
  return context;
};