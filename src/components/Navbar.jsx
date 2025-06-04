import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => setMenu(!menu);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-black text-white shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img
          src="/blogger.png" // Update the path as needed
          alt="Blog logo"
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-lg md:text-xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-300 transition duration-200">
            Blog-O-Pedia
          </Link>
        </h1>
      </div>

      {/* Search bar */}
      {path === "/" && (
        <div className="flex items-center w-64 md:w-96 bg-white rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Search Posts Here"
            className="flex-grow px-4 py-2 text-sm text-gray-700 bg-white outline-none"
          />
          <button
            onClick={() => {
              if (prompt.trim()) navigate(`?search=${prompt}`);
              else navigate("/");
            }}
            className="px-4 py-2 text-gray-700 hover:text-black transition"
          >
            <BsSearch className="text-lg" />
          </button>
        </div>
      )}

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <Link
            to="/write"
            className="hover:text-gray-300 transition duration-200"
          >
            Write
          </Link>
        ) : (
          <Link
            to="/login"
            className="hover:text-gray-300 transition duration-200"
          >
            Login
          </Link>
        )}
        {user ? (
          <div onClick={showMenu} className="relative cursor-pointer">
            <FaBars />
            {menu && <Menu />}
          </div>
        ) : (
          <Link
            to="/register"
            className="hover:text-gray-300 transition duration-200"
          >
            Register
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div
        onClick={showMenu}
        className="md:hidden text-lg relative cursor-pointer"
      >
        <FaBars />
        {menu && <Menu />}
      </div>
    </div>
  );
}

export default Navbar;
