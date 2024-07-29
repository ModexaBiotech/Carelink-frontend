"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface CallCardProps {
  name: string;
  organization: string;
  age: number;
  gender: string;
  nurseNote: string;
  requestTime: string;
  countdown: number;
  onAccept: () => void;
  onDecline: () => void;
}

const CallCard: React.FC<CallCardProps> = ({
  name,
  organization,
  age,
  gender,
  nurseNote,
  requestTime,
  countdown,
  onAccept,
  onDecline,
}) => {
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onDecline();
    }
  }, [timeLeft, onDecline]);

  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4 border-l-4 border-green-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
        {/* Placeholder for the image */}
        <span>No Image</span>
      </div>
      <div className="flex-1">
        <p className="text-xl font-bold">{name}</p>
        <p className="text-gray-500">{organization}</p>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Nurse Note: {nurseNote}</p>
        <p>Request Time: {requestTime}</p>
      </div>
      <div className="flex flex-col space-y-2 items-center">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-full flex items-center space-x-1 hover:bg-green-700"
          onClick={onAccept}
        >
          <FaCheck /> <span>Accept</span>
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-full flex items-center space-x-1 hover:bg-red-700"
          onClick={onDecline}
        >
          <FaTimes /> <span>Decline</span>
        </button>
        <p className="text-gray-500 text-lg font-bold">
          {timeLeft}
        </p>
      </div>
    </motion.div>
  );
};

export default CallCard;
