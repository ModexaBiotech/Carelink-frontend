"use client";

import { useState, createContext, useContext, ReactNode } from 'react';

interface Forum {
  id: string;
  title: string;
  posts: string;
  members: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  description: string;
}

interface Category {
  id: string;
  title: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  description: string;
  forums: Forum[];

}

interface AppState {
  currentForumId: string | null;
  setCurrentForumId: (forumId: string | null) => void;
  categories: Category[];
}

interface AppStateProviderProps {
  children: ReactNode;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [currentForumId, setCurrentForumId] = useState<string | null>(null);

  const categories = [
    {
      id: "sexual-health",
      title: "Sexual Health",
      description: "Discussions and support on sexual health topics.",
      image: {
        src: "/sexual-health.jpg",
        width: 1200,
        height: 600
      },
      forums: [
        {
          id: "male-fertility",
          title: "Male Fertility",
          description: "Discussions and support for male fertility issues.",
          members: "800",
          posts: "600",
          image: {
            src: "/85gb-photo-z9f8DRNVfB0-unsplash.jpg",
            width: 800,
            height: 600
          }
        }
      ]
    },
    {
      id: "ncds",
      title: "NCD's",
      description: "Discussions and support for Non-Communicable Diseases.",
      image: {
        src: "/ncds.jpg",
        width: 1200,
        height: 600
      },
      forums: [
        {
          id: "diabetes-management",
          title: "Diabetes Management",
          description: "A group for managing diabetes with support and resources.",
          members: "60k",
          posts: "600",
          image: {
            src: "/diabetes management.avif",
            width: 800,
            height: 600
          }
        },
        {
          id: "bleeding",
          title: "Bleeding",
          description: "Support for issues related to bleeding.",
          members: "2k",
          posts: "500",
          image: {
            src: "/bleeding.avif",
            width: 800,
            height: 600
          }
        }
      ]
    },
    {
      id: "mental-health",
      title: "Mental Health",
      description: "Support and discussions about mental health.",
      image: {
        src: "/mental-health.jpg",
        width: 1200,
        height: 600
      },
      forums: [
        {
          id: "mental-health",
          title: "Mental Health",
          description: "Support for mental health issues.",
          members: "1k",
          posts: "800",
          image: {
            src: "/mental health.avif",
            width: 800,
            height: 600
          }
        }
      ]
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Discussions on nutrition and healthy eating.",
      image: {
        src: "/nutrition.jpg",
        width: 1200,
        height: 600
      },
      forums: [
        {
          id: "nutrition",
          title: "Nutrition",
          description: "Support and discussions about nutrition.",
          members: "1k",
          posts: "800",
          image: {
            src: "/nutrition.avif",
            width: 800,
            height: 600
          }
        }
      ]
    },
    {
      id: "physical-health",
      title: "Physical Health",
      description: "Support for physical health and fitness topics.",
      image: {
        src: "/physique.jpg",
        width: 1200,
        height: 600
      },
      forums: [
        {
          id: "physical-health",
          title: "Physical Health",
          description: "Discussions and support for physical health.",
          members: "1k",
          posts: "800",
          image: {
            src: "/physical.png",
            width: 800,
            height: 600
          }
        }
      ]
    }
  ];

  return (
    <AppStateContext.Provider value={{ currentForumId, setCurrentForumId, categories }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};