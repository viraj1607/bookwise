import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
// import axios from "../axiosInstance";
import AddPost from "../components/AddPost";
import PostFeed from "../components/PostFeed";
import { dummyCommunityPosts } from "../data/feed";
import axiosInstance from "../utils/axios";

const Community = () => {
  const [posts, setPosts] = useState(dummyCommunityPosts);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axiosInstance.get("/community/posts");
    setPosts(res.data);
    console.log("posts", res.data);
  };

  const handleNewPost = async (thought) => {
    try {
      const newPost = {
        uid: localStorage.getItem("uid"),
        content: thought,
        user: user ? user.displayName || user.email : "Book Worm",
      };
      const res = await axiosInstance.post("/community/posts", newPost);

      console.log(res);
      fetchPosts();
      const userRes = await axiosInstance.post("/user-posts/add-post", {
        uid: localStorage.getItem("uid"),
        content: thought,
      });

      console.log("✅ Post added:", userRes.data);
      // return res.data;
    } catch (error) {
      console.error("❌ Error adding post to user:", error);
      // throw error;
    }
    // console.log("user", user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-yellow-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            📚 Book Community
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts and connect with fellow readers
          </p>
        </div>

        <div className="mb-6 bg-white rounded-2xl shadow-xl p-6">
          <AddPost onPost={handleNewPost} />
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostFeed key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
