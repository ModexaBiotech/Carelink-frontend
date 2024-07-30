import React from 'react';
import Image from 'next/image';
import { Forum } from '@/types/types';
import ForumCard from './ForumCard';

interface CategoryCardProps {
  id: string;
  title: string;
  image: string; 
  description: string;
  forums: Forum[]; 
  onForumClick: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, title, image, description, forums, onForumClick }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <Image
        src={image}
        alt={title}
        width={800}
        height={320}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap -mx-2">
        {forums.map((forum) => (
          <div key={forum.id} className="w-full md:w-1/2 px-2 mb-4">
            <ForumCard
              id={forum.id}
              title={forum.title}
              posts={forum.posts}
              members={forum.members}
              image={forum.image.src}
              description={forum.description}
              onClick={() => onForumClick(forum.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
