"use client"; 

import Image from 'next/image';
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface ProfileProps {
  doctorName: string;
}

const Profile: React.FC<ProfileProps> = ({ doctorName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={toggleDropdown}>
        <div className="flex items-center">
          <Image src="https://via.placeholder.com/150" alt={doctorName} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h2 className="font-bold text-gray-900">{doctorName}</h2>
          </div>
        </div>
        <FaChevronDown className="text-gray-600" />
      </div>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="py-2">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Support</a>
          </div>
        </div>
      )}
      {dropdownOpen && <div className="fixed inset-0" onClick={closeDropdown} />}
    </div>
  );
};

export default Profile;
