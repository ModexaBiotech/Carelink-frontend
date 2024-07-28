import React from 'react';

interface NursesNotesProps {
  notes: string;
}

const NursesNotes: React.FC<NursesNotesProps> = ({ notes }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Nurse&#39;s Notes</h2>
      <textarea
        value={notes}
        readOnly
        className="block w-full p-2 border rounded mb-4 bg-white cursor-not-allowed"
        rows={6}
      />
    </div>
  );
};

export default NursesNotes;
