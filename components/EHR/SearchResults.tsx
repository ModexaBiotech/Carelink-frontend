"use client"; // Add this line at the top

import React from 'react';
import { Result } from '@/types/types'; // Update import

interface SearchResultsProps {
  query: string;
  results: Result[];
  onPatientClick: (patient: Result) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onPatientClick }) => {
  // Filter results based on the query
  const filteredResults = query ? results : [];
  const bestMatches = filteredResults.slice(0, 10);

  return (
    <div className="mt-8 mx-auto w-full max-w-6xl px-4"> 
      {query ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          {filteredResults.length === 0 ? (
            <p className="text-gray-500">No records found</p>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-2">Best Match ({bestMatches.length})</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
                  <thead className="bg-gradient-to-r from-[#28313B] to-[#485461]">
                    <tr className="text-[#00B3A4] text-16px font-bold">
                      <th className="px-6 py-3 text-center">Name</th>
                      <th className="px-6 py-3 text-center">ID</th>
                      <th className="px-6 py-3 text-center">Index No</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bestMatches.map((result) => (
                      <tr
                        key={result.id}
                        className="bg-[#E9F5F1] hover:bg-gradient-to-r from-gray-100 to-gray-200 transition duration-150 ease-in-out cursor-pointer"
                        onClick={() => onPatientClick(result)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-[#DDDDDD] to-[#A8A8A8] rounded-full"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{result.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{result.studentID}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{result.indexNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-300">
          <svg
            className="w-24 h-24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M9 3a7 7 0 100 14 7 7 0 000-14z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
