import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameOrEmail, password }),
      });

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const msg = await response.text();
        setError(msg);
      }
    } catch (err) {
      setError("Server not available.");
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <GoogleOAuthProvider clientId="538456243551-fnt03d2fmirm005mp86iivecoeqp40ha.apps.googleusercontent.com">
      <div className="flex min-h-screen font-sans">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-24 py-12 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">ECB Login</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your email and password to log in!</p>

            {/* Manual Login */}
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mb-2"
            >
              Login
            </button>

            {/* Google OAuth */}
            <div className="text-center mb-4">or</div>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>


            {/* Signup Redirect */}
            <p className="text-sm mt-4">
              No account?{" "}
              <span onClick={handleSignup} className="text-indigo-600 hover:underline cursor-pointer">
                Create account
              </span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-400 to-indigo-700 justify-center items-center text-white rounded-l-[5rem]">
          <div className="text-center">
            <div className="text-6xl mb-4">💡</div>
            <h2 className="text-3xl font-bold leading-tight">
              Electricity <br /> Consumption <br /> Billing
            </h2>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
