import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";

function Profile() {
  const param = useParams().id;
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setusername(res.data.username);
      setemail(res.data.email);
      setpassword(res.data.passetpassword);
    } catch (err) {
      console.log(err);
    }
  };
  const handleuserUpdated = async () => {
    setUpdated(false);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };
  const handleUserDelete = async () => {
    try {
      const res = await axios.delete("/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [param]);

  return (
    <div>
      <Navbar/>
      <div className="border p-3 text-center align-middle flex justify-center w-[50% ] shadow-2xl h-screen shadow-gray-500 md:w-[30%]">
        <div className="flex flex-col space-y-4 justify-center text-center">
          <h1 className="text-xl justify-center text-center font-bold mb-4">
            Profile Section
          </h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="outline-none justify-center flex py-2 text-gray-500"
            placeholder="Your Username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="outline-none justify-center flex py-2 text-gray-500"
            placeholder="Your Email"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="outline-none justify-center flex py-2 text-gray-500"
            placeholder="Your Password"
          />
          <div className="flex items-center space-x-6 mt-8">
            <button
              className="text-white font-semibold bg-black rounded-lg px-4 py-2 hover:text-black hover:bg-gray-400"
              onClick={handleuserUpdated}
            >
              Update
            </button>
            <button
              className="text-white font-semibold bg-black rounded-lg px-4 py-2 hover:text-black hover:bg-gray-400"
              onClick={handleUserDelete}
            >
              Delete
            </button>
          </div>
          {updated && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              User Data Updated Successfully!
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
