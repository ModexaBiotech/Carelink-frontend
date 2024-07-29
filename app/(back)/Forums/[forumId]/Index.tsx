"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import RightSidebar from '@/components/RightSidebar';
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
    description: "Discussions and support for diabetes management.",
    members: "121k",
    posts: "100k",
    image: "/diabetes management.avif"
  },
  // Add other forum data here...
};

const ForumDetailPage: React.FC = () => {
  const router = useRouter();
  const { forumId } = router.query;
  const [notifications, setNotifications] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    loginAs: "Dr. Lorant Amo Kodieh",
    userType: "Physician",
    organization: "Modexa Biotech",
    loginTime: "2024-07-27T10:00:00Z",
    lastLogin: "2024-07-26T15:30:00Z"
  });


  if (!forumId || typeof forumId !== 'string') {
    return <div>Forum not found</div>;
  }

  const forum = forumData[forumId as keyof typeof forumData];

  if (!forum) {
    return <div>Forum not found</div>;
  }

  return (
    <div className="flex">
      <Sidebar onCollapseChange={() => {}} />
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300">
        <Header />
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{forum.title}</h1>
            <Image src={forum.image} alt={forum.title} className="w-full rounded-lg mt-4" />
            <p className="mt-4">{forum.description}</p>
            <p className="mt-2">Members: {forum.members}</p>
            <p className="mt-2">Posts: {forum.posts}</p>
          </div>
        </div>
      </div>
      <RightSidebar notifications={notifications}  loginInfo={loginInfo} />
    </div>
  );
};

export default ForumDetailPage;
