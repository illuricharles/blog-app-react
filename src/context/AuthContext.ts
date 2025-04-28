import React from "react";

export const AuthContext = React.createContext<{
  isAuthenticated: boolean | null;
  signin: () => void;
  logout: () => void;
}>({
  isAuthenticated: null,
  signin: () => {},
  logout: () => {},
});
