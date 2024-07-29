"use client";

import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare, FaBookmark, FaFlag, FaTrash } from 'react-icons/fa';
import CommentSection from './CommentSection';
import { generateInitials } from './utils'; // Import the utility function
import { CommentProps } from '@/types/types'; // Import CommentProps
import Image from 'next/image';

interface UserCardProps {
  username: string;
  userProfileImage?: string; // Made userProfileImage optional
  content: string;
  image?: string;
  comments: CommentProps[];
  postId: string;
  onAddComment: (postId: string, comment: string, parentCommentId?: string) => Promise<void>;
  onDeleteComment: (postId: string, commentIndex: number, parentCommentId?: string) => void;
  onDeletePost: (postId: string) => void;
  currentUser: string;
}

const UserCard: React.FC<UserCardProps> = ({
  username,
  content,
  image,
  comments,
  postId,
  onAddComment,
  onDeleteComment,
  onDeletePost,
  currentUser,
}) => {
  const [votes, setVotes] = useState(0);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);
  const [flagged, setFlagged] = useState(false);

  const handleUpvote = () => {
    if (upvoted) {
      setVotes(votes - 1);
      setUpvoted(false);
    } else {
      setVotes(votes + 1);
      if (downvoted) {
        setVotes(votes + 1);
        setDownvoted(false);
      }
      setUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setVotes(votes + 1);
      setDownvoted(false);
    } else {
      setVotes(votes - 1);
      if (upvoted) {
        setVotes(votes - 1);
        setUpvoted(false);
      }
      setDownvoted(true);
    }
  };

  const handleShare = () => {
    alert('Post shared successfully!');
  };

  const handleSave = () => {
    setSaved(!saved);
    alert(saved ? 'Post removed from saved list.' : 'Post saved successfully!');
  };

  const handleFlag = () => {
    setFlagged(!flagged);
    alert(flagged ? 'Flag removed from post.' : 'Post flagged successfully!');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-700">
            {generateInitials(username)}
          </div>
          <div>
            <h3 className="font-bold text-lg">{username}</h3>
            <p className="text-gray-600 text-sm">User Profile</p>
          </div>
        </div>
      </div>
      <p className="mb-4 text-gray-800">{content}</p>
      {image && <Image src={image} alt="Post" className="w-full rounded-lg mb-4" />}
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUpvote}
            className={`flex items-center space-x-1 p-2 rounded-full ${upvoted ? 'bg-green-100 text-green-500' : 'hover:bg-gray-200'}`}
            aria-label="Upvote post"
          >
            <FaArrowUp className="text-xl" /> <span className="font-bold">{votes}</span>
          </button>
          <button
            onClick={handleDownvote}
            className={`flex items-center space-x-1 p-2 rounded-full ${downvoted ? 'bg-red-100 text-red-500' : 'hover:bg-gray-200'}`}
            aria-label="Downvote post"
          >
            <FaArrowDown className="text-xl" />
          </button>
          <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200" onClick={toggleComments} aria-label="Show comments">
            <FaRegComment className="text-xl" /> <span className="font-bold">{comments.length}</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200" onClick={handleShare} aria-label="Share post">
            <FaShare className="text-xl" /> <span>Share</span>
          </button>
          <button className={`flex items-center space-x-1 p-2 rounded-full ${saved ? 'bg-yellow-100 text-yellow-500' : 'hover:bg-gray-200'}`} onClick={handleSave} aria-label="Save post">
            <FaBookmark className="text-xl" /> <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
          <button className={`flex items-center space-x-1 p-2 rounded-full ${flagged ? 'bg-red-100 text-red-500' : 'hover:bg-gray-200'}`} onClick={handleFlag} aria-label="Flag post">
            <FaFlag className="text-xl" /> <span>{flagged ? 'Flagged' : 'Flag'}</span>
          </button>
          {currentUser === username && (
            <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-red-200" onClick={handleDeletePost} aria-label="Delete post">
              <FaTrash className="text-xl" />
            </button>
          )}
        </div>
      </div>
      {showComments && (
        <CommentSection
          comments={comments}
          postId={postId}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default UserCard;