import { createContext, useState } from "react";
import axios from "axios";
import { config } from "../config/config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("config:", config);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const handleLogin = async (loginData) => {
    console.log("authContext handleLogin:", loginData);
    try {
      setAuthLoading(true);
      const response = await axios.post(`${config.baseUrl}/user/login`, {
        email: loginData.email,
        password: loginData.password,
      });
      console.log("authContext handleLogin response:", response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("authContext handleLogin error:", error);
      setAuthError(error.response.data.message);
    } finally {
      setAuthLoading(false);
    }
  };
  const handleSignup = async (signupData) => {
    try {
      setAuthLoading(true);
      const response = await axios.post(`${config.baseUrl}/user/signup`, {
        fullname: signupData.fullname,
        email: signupData.email,
        password: signupData.password,
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError(error.response.data.message);
    } finally {
      setAuthLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        authError,
        handleLogin,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
