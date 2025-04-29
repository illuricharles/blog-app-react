import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

interface Status {
  loggedIn: boolean,
  userId?: string,
  message?: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null)

  async function getStatus() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get<Status>(`${apiUrl}/api/v1/user/me`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.loggedIn) {
        
        setIsAuthenticated(true);
        if(response.data.userId) {
          setUserId(response.data.userId)
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null)
      }
    } catch (e) {
      setIsAuthenticated(false);
      setUserId(null)
      console.error(e);
    }
  }


  useEffect(() => {
    getStatus()
  }, [])

  function signin() {
    getStatus()
  }

  async function logout() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/v1/user/logout`, {}, {withCredentials: true})
      setIsAuthenticated(false)
      setUserId(null)
    }
    catch(e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
