import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { UserContext, UseState } from "../context/UserContext";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { FcManager } from "react-icons/fc";

function PostDetails() {
  const PostID = useParams().id;
  const [post, setpost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      const res = await axios.get("api/post" + PostID);
      setpost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete("api/posts" + PostID, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [PostID]);

  const fetchPostComments = async () => {
    setloader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + PostID);
      setComments(res.data);
      setloader(false);
    } catch (err) {
      setloader(true);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, [PostID]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comments/create/",
        {
          comment: comment,
          author: user.username,
          postId: PostID,
          userID: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh" flex justify-center items-center w-full>
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="border p-3 shadow">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-black md:text-3xl">
                {post.title}
              </h1>
              {user?._id === post?.userId && (
                <div className="flex items-center justify-center space-x-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/edit/" + PostID)}
                  >
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className="w-[100%] flex flex-col justify-center">
              <img
                src={IF + post.photo}
                className="object-cover h-[45vh] mx-auto mt-8"
                alt="baal"
              />
              <p className="mx-auto mt-8 w-[80vh] border p-5 shadow-xl">
                {" "}
                {post.desc}
              </p>

              <div className="flex justify-center items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center space-x-2">
                  {post.categories?.map((c, i) => (
                    <div>
                      <div key={i} className="bg-gray-300 rounded-xl px-3 py-1">
                        {c}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center p-3 flex-col mt-4">
                <h3 className="flex justify-center items-center mt-8 space-x-4 font-semibold">
                  Comments:
                </h3>
                {comments?.map((c) => (
                  <Comment className="" key={c._id} c={c} post={post} />
                ))}
                <div className="border flex justify-center flex-col mt-4 md:flex-row">
                  <input
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your Comment."
                    className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0"
                  />
                  <button
                    onClick={postComment}
                    className="bg-black text-sm text-white font-semibold px-2 py-2 md:w-[50%] mt-4 md:mt-0"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default PostDetails;
