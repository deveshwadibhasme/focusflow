import React, { createContext, useState, useContext } from "react";

// 1. Create the Context object with default fallback values
const AuthContext = createContext({
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// 2. AuthProvider component to wrap our application tree
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Simulated login action
  const login = (userData) => {
    setCurrentUser(userData);
  };

  // Simulated logout action
  const logout = () => {
    setCurrentUser(null);
  };

  // Boolean convenience flag
  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for clean, easy consumption in screens & components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

