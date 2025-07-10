import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { handleLogin, isAuthenticated, authLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const loginHandler = () => handleLogin({ email, password });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
              setEmailError("Please enter a valid email address.");
            } else {
              setEmailError("");
            }
            if (password.length < 4) {
              setPasswordError("Password must be at least 4 characters.");
            } else {
              setPasswordError("");
            }
            if (
              /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&
              password.length >= 4
            ) {
              // Handle successful login here
              loginHandler();
            }
          }}
        >
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded focus:outline-none text-black focus:ring-2 focus:ring-blue-400 ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              autoComplete="username"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-2 border text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          {authLoading ? (
            <button
              type="button"
              className="w-full bg-gray-500 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Login
            </button>
          )}
        </form>
        <p className="text-center text-gray-600 mt-4">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
