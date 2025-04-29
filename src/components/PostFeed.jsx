import React, { useState } from "react";
import { FaHeart, FaRegCommentDots, FaUserCircle } from "react-icons/fa";
import axiosInstance from "../utils/axios";

const PostFeed = ({ post, user, fetch }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const isLiked = post.likes.includes(localStorage.getItem("uid"));

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    try {
      const res = await axiosInstance.post(
        `/community/posts/${post._id}/comments`,
        {
          user: user ? user.displayName : "Book Worm",
          text: commentInput,
        }
      );

      setComments(res.data); // assuming API returns updated comments
      setCommentInput("");
    } catch (err) {
      console.error("Error adding comment:", err);
      // optionally show an error toast or message
    }
  };

  const handleLike = async () => {
    try {
      const res = await axiosInstance.post(
        `/community/posts/${post._id}/like`,
        {
          uid: localStorage.getItem("uid"),
        }
      );

      // setLikes(res.data);
      // console.log("likes", res.data);
      fetch();
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-2xl w-full mx-auto transition hover:shadow-lg dark:bg-gray-800 dark:shadow-xl">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <FaUserCircle className="text-3xl text-indigo-500 dark:text-indigo-400" />
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">
            {post.user}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 text-base leading-relaxed mb-4 dark:text-gray-300">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
        <button
          className={`flex items-center gap-2 hover:text-red-500 transition ${
            isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-400"
          }`}
          onClick={handleLike}
        >
          <FaHeart className="text-lg" />
          <span>{post.likes.length}</span>
        </button>
        <button
          className="flex items-center gap-2 hover:text-indigo-600 transition dark:hover:text-indigo-400"
          onClick={toggleComments}
        >
          <FaRegCommentDots className="text-lg" />
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments + Comment Input */}
      {showComments && (
        <div className="mt-4 border-t pt-4 space-y-3 dark:border-gray-600">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 border-l-4 border-indigo-200 pl-3 dark:text-gray-300 dark:border-indigo-600"
            >
              <span className="font-semibold">{comment.user}: </span>
              {comment.comment}
            </div>
          ))}

          <form
            onSubmit={handleAddComment}
            className="flex gap-2 items-center mt-2"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
