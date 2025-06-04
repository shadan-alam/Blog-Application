import React from "react";
import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function EditPost() {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("a");
  const [cats, setCats] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await axios.get("/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

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
        await axios.post("/api/upload", data);
        console.log("Image uploaded");
      } catch (err) {
        console.log("Image upload failed", err);
      }
    }

    try {
      const res = await axios.put("/api/posts/" + postId, post, {
        withCredentials: true,
      });
      console.log("Post updated:", res.data);
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log("Post update failed", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

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

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="p-4 border w-[70%] flex flex-col justify-center px-6 md:px-[200px] mt-8">
          <h1 className="font-bold flex justofy-center md:text-2xl text-xl">
            Update Your Post
          </h1>
          <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="px-4 py-2 outline-none"
              placeholder="Enter Post Title"
            />
            <input
              type="file"
              className="px-4"
              onChange={(e) => setFile(e.target.files[0])}
              value={file}
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 md:space-x-8">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  className="px-4 py-2 outline-none"
                  placeholder="Enter Post Category"
                />
                <div
                  onClick={addCategory}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
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
            </div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={9}
              cols={30}
              className="px-4 py-2 outline-none"
              placeholder="Enter Post Description."
            ></textarea>
            <button
              onClick={handleUpdate}
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost;
