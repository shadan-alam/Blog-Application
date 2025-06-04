import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPen,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBook,
} from "react-icons/fa";

function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-[220px] shadow-lg border border-gray-200 z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-xl p-4 space-y-3">
      {!user && (
        <>
          <Link
            to="/login"
            className="flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <FaUserPlus className="mr-2" />
            Register
          </Link>
        </>
      )}

      {user && (
        <>
          <Link
            to={`/profile/${user._id}`}
            className="flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <Link
            to={`/write/${user._id}`}
            className="flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <FaPen className="mr-2" />
            Write
          </Link>
          <Link
            to={`/myblogs/${user._id}`}
            className="flex items-center text-sm text-gray-700 hover:text-black transition"
          >
            <FaBook className="mr-2" />
            My Blogs
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-red-600 hover:text-red-800 transition"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Menu;
