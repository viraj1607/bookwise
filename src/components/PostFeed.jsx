import React, { useState } from "react";
import { FaHeart, FaRegCommentDots, FaUserCircle } from "react-icons/fa";
import axiosInstance from "../utils/axios";

const PostFeed = ({ post, user }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(post.comments || []);

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

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-2xl w-full mx-auto transition hover:shadow-lg">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <FaUserCircle className="text-3xl text-indigo-500" />
        <div>
          <p className="text-sm font-semibold text-gray-800">{post.user}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 text-base leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-600">
        <button className="flex items-center gap-2 hover:text-red-500 transition">
          <FaHeart className="text-lg" />
          <span>{post.likes.length}</span>
        </button>
        <button
          className="flex items-center gap-2 hover:text-indigo-600 transition"
          onClick={toggleComments}
        >
          <FaRegCommentDots className="text-lg" />
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments + Comment Input */}
      {showComments && (
        <div className="mt-4 border-t pt-4 space-y-3">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="text-sm text-gray-700 border-l-4 border-indigo-200 pl-3"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
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
