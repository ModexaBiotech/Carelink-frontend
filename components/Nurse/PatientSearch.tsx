import React, { useState, useEffect, useCallback } from 'react';

interface Patient {
  name: string;
  age: number;
  sex: string;
  organization: string;
}

interface PatientSearchProps {
  setPatient: (patient: Patient) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ setPatient }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);

  const handleSearch = useCallback(async () => {
    const results: Patient[] = [
      { name: 'Nana Agyemang', age: 16, sex: 'Male', organization: 'Org1' },
      { name: 'Kusi Frimpong', age: 17, sex: 'Male', organization: 'Org2' },
      { name: 'Jill Adongo', age: 19, sex: 'Female', organization: 'Org2' },
      { name: 'Abu Ben', age: 18, sex: 'Male', organization: 'Org2' },
      { name: 'Kwaku Frimpong', age: 17, sex: 'Male', organization: 'Org2' },
    ];
    const filteredResults = results.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, handleSearch]);

  return (
    <div className="mb-2">
      <label className="block font-semibold mb-1 text-gray-700">Search Patient:</label>
      <div className="flex relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 border border-gray-300 rounded-lg w-full focus:ring focus:ring-blue-200 focus:outline-none"
          placeholder="Start typing to search..."
        />
        {searchResults.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setPatient(result);
                  setSearchQuery(result.name);
                  setSearchResults([]);
                }}
              >
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;
