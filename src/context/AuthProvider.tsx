import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios, { AxiosError } from "axios";

interface Status {
  loggedIn: boolean,
  userId?: string,
  message?: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null)
  const [authError, setAuthError] = useState("")

  async function getStatus() {

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get<Status>(`${apiUrl}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200 && response.data.loggedIn) {
        
        setIsAuthenticated(true);
        if(response.data.userId) {
          setUserId(response.data.userId)
        }
        setAuthError("")
      } else {
        setIsAuthenticated(false);
        setUserId(null)
        setAuthError("")
      }
    } catch (e) {
      setIsAuthenticated(false);
      setUserId(null)
      if(e instanceof AxiosError) {
        setAuthError(e.response?.data.message || "Something went wrong. Please try again later")
      }
    }
  }


  useEffect(() => {
    getStatus()
  }, [])

  function signin() {
    getStatus()
  }

  async function logout() {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUserId(null)
    setAuthError("")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, logout, userId, authError }}>
      {children}
    </AuthContext.Provider>
  );
}
