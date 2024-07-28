import Image from 'next/image';
import React from 'react';
import { FaEye, FaThumbsUp } from 'react-icons/fa';

interface ForumItemProps {
  title: string;
  details: string;
  views: number;
  likes: number;
  time: string;
  image: string;
}

const ForumItem: React.FC<ForumItemProps> = ({ title, details, views, likes, time, image }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-2 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
      <Image src={image} alt={title} className="w-16 h-16 rounded-full mr-4" />
      <div className="flex-1">
        <h4 className="font-bold text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm">{details}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <FaEye className="mr-1" /> {views}
          <FaThumbsUp className="ml-4 mr-1" /> {likes}
        </div>
      </div>
      <div className="text-right text-gray-500 text-xs">{time}</div>
    </div>
  );
};

export default ForumItem;
