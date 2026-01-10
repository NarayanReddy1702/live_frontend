import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userDet"));
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUser(savedUser);
    if (savedToken) setToken(savedToken);

    setLoading(false);
  }, []);

  const setUserAndSave = (userData) => {
    setUser(userData);
    localStorage.setItem("userDet", JSON.stringify(userData));
  };

  const setTokenAndSave = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser: setUserAndSave, setToken: setTokenAndSave, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
