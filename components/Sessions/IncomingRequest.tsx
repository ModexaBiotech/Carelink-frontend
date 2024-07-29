"use client";

import React, { useState, useEffect } from 'react';
import CallCard from './CallCard';
import { FaBell } from 'react-icons/fa';
import { MdSentimentDissatisfied } from 'react-icons/md';

interface IncomingRequestsProps {
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingRequests: React.FC<IncomingRequestsProps> = ({ onAccept, onDecline }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [sound, setSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Audio instance only on the client-side
    const audio = new Audio('/notification-sound.mp3');
    setSound(audio);
  }, []);

  useEffect(() => {
    if (!sound) return; // Ensure sound is defined before using it

    // Simulate fetching incoming requests
    const interval = setInterval(() => {
      const newRequest = {
        organizationPhoto: 'https://via.placeholder.com/150',
        name: 'John Doe',
        organization: 'GSTS',
        age: 45,
        gender: 'Male',
        nurseNote: 'Frequent urination, excessive thirst',
        requestTime: new Date().toLocaleTimeString(),
        countdown: 59,
      };
      setRequests((prevRequests) => [...prevRequests, newRequest]);
      setShowNotification(true);
      sound.play();
    }, 10000); // Every 10 seconds for demo purposes

    return () => clearInterval(interval);
  }, [sound]);

  useEffect(() => {
    if (showNotification) {
      const timeout = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showNotification]);

  return (
    <div className="p-4 space-y-4">
      {showNotification && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded shadow-lg flex items-center">
          <FaBell className="mr-2" /> New consultation request received!
        </div>
      )}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
          <MdSentimentDissatisfied size={50} className="mb-4" />
          <p className="text-lg">No incoming request at the moment!</p>
        </div>
      ) : (
        requests.map((request, index) => (
          <CallCard
            key={index}
            name={request.name}
            organization={request.organization}
            age={request.age}
            gender={request.gender}
            nurseNote={request.nurseNote}
            requestTime={request.requestTime}
            countdown={request.countdown}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        ))
      )}
    </div>
  );
};

export default IncomingRequests;
