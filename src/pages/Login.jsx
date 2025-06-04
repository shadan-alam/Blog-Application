import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("Attempting login with:", { email, password });

    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful, user data:", res.data);
      setUser(res.data);
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      // Improved error handling
      if (err.response) {
        // Server responded with a status code outside 2xx
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error - please check your connection");
      } else {
        // Something else happened
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="w-full flex justify-center items-center h-[80vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]"
        >
          <h1 className="text-xl font-bold text-left">Login to your Account</h1>

          {error && (
            <div className="w-full p-2 text-red-500 bg-red-50 rounded-lg text-center">
              {error}
            </div>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0 rounded-lg"
            type="email"
            placeholder="Enter your Email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0 rounded-lg"
            type="password"
            placeholder="Enter your Password"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-center items-center space-x-3">
            <p>Don't have an Account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link
                to="/register"
                className="px-2 py-1 border border-gray-500 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
