"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole && !isAuthenticated) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setRole(storedRole);

      // Redirect only if the current pathname is empty (root) or any other empty URL
      if (window.location.pathname === "/") {
        if (storedRole === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/Dashboard");
        }
      }
    }
  }, [isAuthenticated, router]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userToken = data.token;
        const userRole = data.role;

        localStorage.setItem("token", userToken);
        localStorage.setItem("role", userRole);
        setToken(userToken);
        setRole(userRole);
        setIsAuthenticated(true);

        if (userRole === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/Dashboard");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const userToken = data.token;
        const userRole = data.role;

        localStorage.setItem("token", userToken);
        localStorage.setItem("role", userRole);
        localStorage.setItem(
          "signupSuccessMessage",
          "Account created successfully! Welcome to the dashboard."
        );

        setToken(userToken);
        setRole(userRole);
        setIsAuthenticated(true);

        if (userRole === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/Dashboard");
        }
      } else {
        alert("Signup failed: " + (await response.text()));
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/Login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, logout, token, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
