import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return null;
    return {
      ...storedUser,
      id: storedUser._id || storedUser.id,
    };
  });

  const login = (data) => {
    const normalizedUser = {
      ...data.user,
      id: data.user._id || data.user.id,
      role: data.user.role,
      email: data.user.email,
      name: data.user.name, // if present
    };
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
