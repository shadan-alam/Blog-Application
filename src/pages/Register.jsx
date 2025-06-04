import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // ✅ Add this

function Register() {
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setemail(res.data.email);
      setpassword(res.data.password);
      seterror(false);
      navigate("/login");
    } catch (err) {
      seterror(true);
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar /> {/* ✅ Use the consistent Navbar component */}
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an Account</h1>

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0 rounded-lg"
            type="text"
            placeholder="Enter your Name"
            required
          />
          <input
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0 rounded-lg"
            type="email"
            placeholder="Enter your Email"
            required
          />
          <input
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 border border-black outline-0 rounded-lg"
            type="password"
            placeholder="Enter your Password"
            required
          />

          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>

          {error && (
            <h3 className="text-red-500 text-sm">Something went Wrong!</h3>
          )}

          <div className="flex justify-center items-center space-x-3">
            <p>Already have an Account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link
                to="/login"
                className="px-2 py-1 border border-gray-500 rounded hover:bg-black hover:text-white transition duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
