"use client";

import React, { useState } from 'react';
import { ClosedSession } from '@/types/types';
import ClosedSessionDetails from './ClosedSessionDetails';
import { MdSentimentDissatisfied } from 'react-icons/md';

interface ClosedSessionsListProps {
  sessions: ClosedSession[];
}

const ClosedSessionsList: React.FC<ClosedSessionsListProps> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<ClosedSession | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleSessionClick = (session: ClosedSession) => {
    setSelectedSession(session);
  };

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const currentSessions = sessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
          <MdSentimentDissatisfied size={50} className="mb-4" />
          <p className="text-lg">You don&#39;t have any finalized sessions yet!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition-transform duration-200 ease-in-out cursor-pointer"
                onClick={() => handleSessionClick(session)}
              >
                <p><span className="font-semibold">Patient Name:</span> {session.name}</p>
                <p><span className="font-semibold">Organization:</span> {session.organization}</p>
                <p><span className="font-semibold">Date:</span> {session.date}</p>
                <p><span className="font-semibold">Time:</span> {session.time}</p>
                <p><span className="font-semibold">Duration:</span> {session.duration}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`mx-1 px-3 py-1 rounded ${page === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          {selectedSession && (
            <ClosedSessionDetails
              session={selectedSession}
              onClose={() => setSelectedSession(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ClosedSessionsList;
