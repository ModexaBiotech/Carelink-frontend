
import React from 'react';
import { Prescription } from '@/types/types';

interface PreviousPrescriptionsProps {
  prescriptions: Prescription[];
}

const PreviousPrescriptions: React.FC<PreviousPrescriptionsProps> = ({ prescriptions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Previous RX</h2>
      {prescriptions.length === 0 ? (
        <p>No previous prescriptions found.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription, index) => (
            <li key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{prescription.drugName}</p>
                  <p className="text-sm">{prescription.date}</p>
                </div>
                <button className="text-blue-500">View</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviousPrescriptions;
