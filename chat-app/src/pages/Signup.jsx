import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { handleSignup, isAuthenticated, authLoading } = useContext(
    AuthContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const navigate = useNavigate();
  const signupHandler = () => handleSignup({ fullname, email, password });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
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
            if (fullname.length < 25) {
              setFullnameError("Fullname must be at least 25 characters.");
            } else {
              setFullnameError("");
            }
            if (
              /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) &&
              password.length >= 4 &&
              fullname.length < 25
            ) {
              signupHandler();
            }
          }}
        >
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Name
            </label>
            <input
              id="fullname"
              type="text"
              className={`w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                fullnameError ? "border-red-500" : "border-gray-300"
              }`}
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
                setFullnameError("");
              }}
            />
            {fullnameError && (
              <p className="text-red-500 text-sm mt-1">{fullnameError}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
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
              className={`w-full text-black px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
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
              Register
            </button>
          )}{" "}
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
