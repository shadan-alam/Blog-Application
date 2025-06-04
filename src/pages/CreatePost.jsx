import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("a");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const addCategory = () => {
    let updatedcats = [...cats];
    updatedcats.push(cat);
    setCat("");
    setCats(updatedcats);
  };
  const deleteCategory = (i) => {
    let updatedcats = [...cats];
    updatedcats.splice(i, 1);
    setCats(updatedcats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("handleCreate triggered");

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (!title || !desc || cats.length === 0) {
      alert("Please fill in all fields and add at least one category.");
      return;
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        const imgUpload = await axios.post("/api/upload", data);
        console.log("Image uploaded");
      } catch (err) {
        console.log("Image upload failed", err);
      }
    }

    try {
      const res = await axios.post("/api/posts/create", post, {
        withCredentials: true,
      });
      console.log("Post created:", res.data);
      console.log("Navigating to:", "/posts/post/" + res.data._id);
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log("Post creation failed", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="px-6 m-4 border flex flex-col w-[70%] shadow-xl md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-2xl mt-3 flex justify-center">
            Create a Post
          </h1>
          <form
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
            onSubmit={handleCreate}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Post Title."
              className="px-4 py-2 outline-none"
            ></input>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="px-4"
            ></input>

            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <select
                  name=""
                  id=""
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Big Data">Big Data</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Programming Languages">
                    Programming Languages
                  </option>
                  <option value="Internet of Things">Internet of Things</option>
                  <option value="Database">Database</option>

                  <option value="Business Management">
                    Business Management
                  </option>
                  <option value="Startups">Startups</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Project Management">Project Management</option>
                  <option value="FinTech">FinTech</option>

                  <option value="Space and Astronomy">
                    Space and Astronomy
                  </option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Environmental Science">
                    Environmental Science
                  </option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Quantum Computing">Quantum Computing</option>

                  <option value="Productivity">Productivity</option>
                  <option value="Career Advice">Career Advice</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Education">Education</option>
                  <option value="Remote Work">Remote Work</option>
                  <option value="Work-Life Balance">Work-Life Balance</option>

                  <option value="Writing Tips">Writing Tips</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Photography">Photography</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Animation">Animation</option>

                  <option value="Social Media">Social Media</option>
                  <option value="Culture">Culture</option>
                  <option value="Politics">Politics</option>
                  <option value="Tech Ethics">Tech Ethics</option>
                  <option value="Global News">Global News</option>
                </select>
                <div
                  onClick={addCategory}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-lg"
                >
                  Add Category
                </div>
              </div>
              <div className="flex px-4 mt-3">
                {cats?.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                  >
                    <p>{c}</p>
                    <p
                      onClick={() => deleteCategory(i)}
                      className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    >
                      <ImCross />
                    </p>
                  </div>
                ))}
              </div>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                rows={9}
                cols={30}
                className="px-4 py-2 outline-none"
                placeholder="Enter Post Description."
              ></textarea>
              <button onClick={handleCreate}
                className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-lg"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
