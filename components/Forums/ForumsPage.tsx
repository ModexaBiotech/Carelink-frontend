"use client";

import React from 'react';
import ForumCard from './ForumCard';
import { useAppState } from './useAppState';
import Image from 'next/image';

const ForumsPage: React.FC = () => {
  const { setCurrentForumId } = useAppState();

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
            className="w-full h-80 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Find your Community</h2>
            <div className="flex mt-4 space-x-2">
              <Image
                src="/laura-college-K_Na5gCmh38-unsplash.jpg"
                alt="Member 1"
                className="w-10 h-10 rounded-full"
              />
              <Image
                src="/meditation.avif"
                alt="Member 2"
                className="w-10 h-10 rounded-full"
              />
              <Image
                src="/dental.avif"
                alt="Member 3"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Suggested Forums</h2>
          <a href="#" className="text-green-600 hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "male-fertility",
              title: "Male Fertility",
              posts: "800 Posts",
              members: "1k members",
              image: "/85gb-photo-z9f8DRNVfB0-unsplash.jpg",
              description: "Discuss all aspects of male fertility."
            },
            {
              id: "diabetes-management",
              title: "Diabetes Management",
              posts: "121k Posts",
              members: "100k members",
              image: "/diabetes management.avif",
              description: "Share and learn about diabetes management."
            },
            {
              id: "bleeding",
              title: "Bleeding",
              posts: "500 Posts",
              members: "2k members",
              image: "/bleeding.avif",
              description: "Support and information on bleeding disorders."
            },
          ].map((forum) => (
            <div
              key={forum.id}
              onClick={() => handleForumClick(forum.id)}
              className="cursor-pointer transition transform hover:scale-105"
            >
              <ForumCard
                id={forum.id}
                title={forum.title}
                posts={forum.posts}
                members={forum.members}
                image={forum.image}
                description={forum.description}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Popular Forums</h2>
          <a href="#" className="text-green-600 hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "mental-health",
              title: "Mental Health",
              posts: "800 Posts",
              members: "1k members",
              image: "/mental health.avif",
              description: "A forum for mental health support."
            },
            {
              id: "nutrition",
              title: "Nutrition",
              posts: "800 Posts",
              members: "1k members",
              image: "/nutrition.avif",
              description: "Discuss and share nutrition tips."
            },
            {
              id: "physical-health",
              title: "Physical Health",
              posts: "800 Posts",
              members: "1k members",
              image: "/physical.png",
              description: "Everything about physical health."
            },
          ].map((forum) => (
            <div
              key={forum.id}
              onClick={() => handleForumClick(forum.id)}
              className="cursor-pointer transition transform hover:scale-105"
            >
              <ForumCard
                id={forum.id}
                title={forum.title}
                posts={forum.posts}
                members={forum.members}
                image={forum.image}
                description={forum.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;
