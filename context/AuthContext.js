import { createContext, useContext } from 'react';

const AuthContext = createContext({});

// Simplified - no auth, no login required
export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{
      user: null, profile: null, loading: false,
      isPro: false, isTeam: false, remainingPrompts: Infinity,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
