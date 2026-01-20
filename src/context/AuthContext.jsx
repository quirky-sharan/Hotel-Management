import { createContext, useContext, useEffect, useState } from "react";
import { getUsers, saveUsers, findUser } from "../utils/authStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = ({ username, email, password }) => {
    const users = getUsers();

    if (users.some((u) => u.username === username || u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password, // demo-only
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    login({ identifier: username, password });
  };

  const login = (arg1, arg2) => {
    // ✅ SUPPORT BOTH CALL STYLES
    let identifier;
    let password;

    if (typeof arg1 === "object") {
      identifier = arg1.identifier;
      password = arg1.password;
    } else {
      identifier = arg1;
      password = arg2;
    }

    const existingUser = findUser(identifier);

    if (!existingUser || existingUser.password !== password) {
      throw new Error("Invalid credentials");
    }

    const fakeJWT = `jwt_${Date.now()}_${Math.random()}`;

    setUser(existingUser);
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    localStorage.setItem("authToken", fakeJWT);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
