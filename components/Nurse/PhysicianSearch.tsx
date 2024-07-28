import React, { useState, useEffect, useCallback } from 'react';

interface Physician {
  name: string;
}

interface PhysicianSearchProps {
  setPhysician: (physician: Physician) => void;
}

const PhysicianSearch: React.FC<PhysicianSearchProps> = ({ setPhysician }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Physician[]>([]);

  const handleSearch = useCallback(async () => {
    const results: Physician[] = [
      { name: 'Dr. Lorant Amo Kodieh' },
      { name: 'Dr. Asante Samuel' },
      { name: 'Dr. Doris Berko' },
      { name: 'Dr. Lawrence Konadu' },
      { name: 'Dr. Esther Darko' },
      { name: 'Dr. Nicholas Esseh' },
      { name: 'P.A. Bruce Darko' },
      { name: 'Dr. Bright Oware' },
    ];
    const filteredResults = results.filter(physician =>
      physician.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <label className="block font-semibold mb-1 text-gray-700">Search Physician:</label>
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
                  setPhysician(result);
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

export default PhysicianSearch;
