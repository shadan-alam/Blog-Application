import React from "react";
import { IF } from "../url";
function HomePost({ post }) {
  return (
    <div>
      <div className="h-[45vh] flex flex-wrap bg-white border-gray-200 shadow">
        <div className="overflow-hidden h-[40vh]">
          <img
            className="object-fit w-96 hover:scale-100"
            alt=""
            src={IF + post.photo}
          />
          <div className="pl-3">
            <h5 className="text-xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h5>
            <div className="mb-3 text-xs font-semibold text-gray-500 items-center justify-center">
              <p className="text-blue 400">BY {post.user}</p>
              <div className="mt-3 font-normal text-gray-700">
                <p>{post.desc.slice(0, 75) + "...Read More"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePost;
