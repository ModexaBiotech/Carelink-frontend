import React from 'react';
import { useAppState } from './useAppState';
import CategoryCard from './CategoryCard';
import Image from 'next/image';

const ForumsPage: React.FC = () => {
  const { categories, setCurrentForumId } = useAppState();

  const handleForumClick = (id: string) => {
    setCurrentForumId(id);
  };

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Explore Forums</h1>
        <div className="relative mt-8 mx-4">
          <Image
            src="/hannah-busing-Zyx1bK9mqmA-unsplash.jpg"
            alt="Find your Community"
            width={800}
            height={320}
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Find your Community</h2>
          </div>
        </div>
      </div>

      {categories.map(category => (
        <div key={category.id} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">{category.title}</h2>
          </div>
          <CategoryCard
            id={category.id}
            title={category.title}
            image={category.image.src} // Ensure image is passed as a string URL
            description={category.description}
            forums={category.forums}
            onForumClick={handleForumClick}
          />
        </div>
      ))}
    </div>
  );
};

export default ForumsPage;
