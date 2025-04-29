import React from "react";

export const AuthContext = React.createContext<{
  isAuthenticated: boolean | null;
  signin: () => void;
  logout: () => void;
  userId: string | null
}>({
  isAuthenticated: null,
  signin: () => {},
  logout: () => {},
  userId: null
});
