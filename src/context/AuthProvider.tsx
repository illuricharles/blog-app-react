import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from 'js-cookie';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setIsAuthenticated(true)
    }
    else {
      setIsAuthenticated(false)
    }
  }, [])

  function signin() {
    setIsAuthenticated(true);
  }

  function logout() {
    Cookies.remove('token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
