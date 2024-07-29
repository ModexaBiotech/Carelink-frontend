"use client";

import React, { useState } from 'react';
import { useAppState } from './useAppState';
import { FaArrowLeft, FaImage, FaTimes, FaPlus } from 'react-icons/fa';
import UserCard from './UserCard';
import Modal from 'react-modal';
import { CommentProps } from '@/types/types'; // Import CommentProps
import Image from 'next/image';

const forumData = {
  "male-fertility": {
    title: "Male Fertility",
    description: "Discussions and support for male fertility issues.",
    members: "800",
    posts: "600",
    image: "/85gb-photo-z9f8DRNVfB0-unsplash.jpg"
  },
  "diabetes-management": {
    title: "Diabetes Management",
    description: "Welcome to the Diabetes Management Group, a dedicated community for individuals seeking support, sharing experiences, and discussing strategies for managing diabetes. Whether you are newly diagnosed, a long-time diabetic, or a caregiver, this group is here to provide valuable insights, resources, and peer support.",
    members: "60k",
    posts: "600",
    image: "/diabetes management.avif"
  },
  "bleeding": {
    title: "Bleeding",
    description: "Discussions and support for issues related to bleeding.",
    members: "2k",
    posts: "500",
    image: "/bleeding.avif"
  },
  "mental-health": {
    title: "Mental Health",
    description: "Discussions and support for mental health issues.",
    members: "1k",
    posts: "800",
    image: "/mental health.avif"
  },
  "nutrition": {
    title: "Nutrition",
    description: "Discussions and support for nutrition and healthy eating.",
    members: "1k",
    posts: "800",
    image: "/nutrition.avif"
  },
  "physical-health": {
    title: "Physical Health",
    description: "Discussions and support for physical health and fitness.",
    members: "1k",
    posts: "800",
    image: "/physical.png"
  },
};

const currentUser = "Current User"; // Simulation of curent user

const ForumDetailPage = () => {
  const { currentForumId, setCurrentForumId } = useAppState();
  const [comments, setComments] = useState<{
    [key: string]: CommentProps[]
  }>({
    "post1": [
      { username: "User A", comment: "Comment 1 on post 1", userProfileImage: "/avatar1.jpg" },
      { username: "User B", comment: "Comment 2 on post 1", userProfileImage: "/avatar2.jpg" }
    ],
    "post2": [
      { username: "User C", comment: "Comment 1 on post 2", userProfileImage: "/avatar3.jpg" }
    ]
  });

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = async (postId: string, comment: string, parentCommentId?: string) => {
    // comment handling logic
  };

  const handleDeleteComment = (postId: string, commentIndex: number, parentCommentId?: string) => {
    // comment delete logic
  };

  const handleDeletePost = (postId: string) => {
    // API Call for deleting message 
    alert('Post deleted successfully!');
    setCurrentForumId(null); // Redirect to forum list after deleting a post
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !newPostImage) {
      alert('Please add content or an image to your post.');
      return;
    }

    setIsSubmittingPost(true);

    try {
      const newPostId = `post${Object.keys(comments).length + 1}`;

      const newPost: { username: string; content: string; image?: string; comments: CommentProps[] } = {
        username: currentUser,
        content: newPostContent,
        comments: []
      };

      if (newPostImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPost.image = reader.result as string;
          setComments({
            ...comments,
            [newPostId]: []
          });
        };
        reader.readAsDataURL(newPostImage);
      } else {
        setComments({
          ...comments,
          [newPostId]: []
        });
      }

      setNewPostContent('');
      setNewPostImage(null);
      setIsModalOpen(false);
      alert('Post created successfully!');
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!currentForumId) {
    return <div>No forum selected</div>;
  }

  const forum = forumData[currentForumId as keyof typeof forumData];

  if (!forum) {
    return <div>Forum not found</div>;
  }

  return (
    <div className="p-6 flex-1 flex flex-col">
      <button 
        onClick={() => setCurrentForumId(null)} 
        className="flex items-center text-blue-500 hover:text-blue-700 transition duration-300 mb-4"
        aria-label="Back to Forums"
      >
        <FaArrowLeft className="h-5 w-5 mr-2" /> {/* back arrow icon */}
        Back to Forums
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full mb-6">
        <div className="relative">
          <Image src={forum.image} alt={forum.title} className="w-full h-96 object-cover rounded-t-lg" /> 
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 rounded-t-lg">
            <h1 className="text-4xl font-bold">{forum.title}</h1>
            <p className="text-lg mt-2">{forum.description}</p>
            <p className="mt-4">({forum.members} members, {forum.posts} posts)</p>
          </div>
        </div>
        <div className="p-6">
          {/* Create Post Button */}
          <button 
            onClick={openModal} 
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            aria-label="Create a post"
          >
            <FaPlus className="text-2xl" />
          </button>

           {/* Modal for Creating a Post */}
           <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Create a Post"
            className="flex items-center justify-center min-h-screen"
            overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            ariaHideApp={false}
          >
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label="Close modal"
              >
                <FaTimes className="text-2xl" />
              </button>
              <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                rows={4}
              />
              <label htmlFor="file-upload" className="cursor-pointer bg-green-600 hover:bg-green-800 transition duration-300 p-2 rounded-lg mb-2 flex items-center">
                <FaImage className="text-xl mr-2" />
                Choose an image
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <button
                onClick={handleCreatePost}
                className="w-full p-2 bg-blue text-white rounded-lg hover:bg-blue-600 transition duration-300"
                disabled={isSubmittingPost}
              >
                {isSubmittingPost ? 'Posting...' : 'Post'}
              </button>
            </div>
          </Modal>

          {/* Existing Posts */}
          <UserCard
            username="User X"
            content="Lorem ipsum shsc jsnss sjsksj loren skdndd dsjdc ckjhd kdvv?"
            image="/post-image1.jpg"
            comments={comments["post1"]}
            postId="post1"
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onDeletePost={handleDeletePost}
            currentUser={currentUser}
          />
          <UserCard
            username="User Y"
            content="Lorem ipsum shsc jsnss sjsksj loren skdndd dsjdc ckjhd kdvv sjccc kcc skcc cs fff fffffsvrvfrfv v lsddncc dvkn scvvn loren ipsum lorem ipsum lorem ipsum lorem ip ipsum lorem abhh pejd xj x ccjmj?"
            comments={comments["post2"]}
            postId="post2"
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onDeletePost={handleDeletePost}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumDetailPage;