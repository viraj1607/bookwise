import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
// import axios from "../axiosInstance";
import AddPost from "../components/AddPost";
import PostFeed from "../components/PostFeed";
import { dummyCommunityPosts } from "../data/feed";

const Community = () => {
  const [posts, setPosts] = useState(dummyCommunityPosts);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    // const fetchPosts = async () => {
    //   const res = await axios.get("/community/posts");
    //   setPosts(res.data);
    // };
    // fetchPosts();
  }, []);

  const handleNewPost = async (thought) => {
    // const newPost = {
    //   text: thought,
    //   user: user.displayName || user.email,
    // };
    // const res = await axios.post("/community/posts", newPost);
    // setPosts((prev) => [res.data, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-yellow-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-600">📚 Book Community</h1>
          <p className="text-gray-600 mt-2">Share your thoughts and connect with fellow readers</p>
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
