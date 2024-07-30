import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaImage, FaUserSecret } from 'react-icons/fa';

interface CreatePostModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleCreatePost: (content: string, image: File | null, anonymously: boolean) => void;
  isSubmittingPost: boolean;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isModalOpen, closeModal, handleCreatePost, isSubmittingPost }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<File | null>(null);
  const [postAnonymously, setPostAnonymously] = useState(false);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Create a Post"
      className="flex items-center justify-center min-h-screen"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
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
          className="w-full p-4 border border-gray-300 rounded-lg mb-4"
          rows={6}
        />
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 flex items-center">
            <FaImage className="text-xl mr-2" />
            Choose an image
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setNewPostImage(e.target.files ? e.target.files[0] : null)}
            className="hidden"
          />
          <div className="flex items-center">
            <FaUserSecret className="text-xl mr-2" />
            <label htmlFor="post-anonymously" className="mr-2">Post anonymously</label>
            <input
              id="post-anonymously"
              type="checkbox"
              checked={postAnonymously}
              onChange={() => setPostAnonymously(!postAnonymously)}
              className="form-checkbox"
            />
          </div>
        </div>
        <button
          onClick={() => handleCreatePost(newPostContent, newPostImage, postAnonymously)}
          className="w-full p-3 bg-blue text-white rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={isSubmittingPost}
        >
          {isSubmittingPost ? 'Posting...' : 'Post'}
        </button>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
