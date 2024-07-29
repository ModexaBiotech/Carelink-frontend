"use client";

import React from 'react';
import { useAppState } from './useAppState';
import Image from 'next/image';

interface ForumCardProps {
  id: string;
  title: string;
  posts: string;
  members: string;
  image: string;
  description: string;
}

const ForumCard: React.FC<ForumCardProps> = ({ id, title, posts, members, image, description }) => {
  const { setCurrentForumId } = useAppState();

  return (
    <div 
      onClick={() => setCurrentForumId(id)} 
      className="cursor-pointer w-full h-60 border border-gray-200 rounded-lg overflow-hidden text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-full">
        <Image 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm">{posts}</p>
          <p className="text-sm">{members}</p>
          <p className="text-xs mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
