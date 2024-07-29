import React, { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { HiUsers, HiOutlineChatAlt2, HiOutlineCalendar, HiOutlineLogout } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar({ onCollapseChange }: { onCollapseChange: (collapsed: boolean) => void }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const sideBarLinks = [
    { name: 'Home', path: '/dashboard-physician', icon: BiHomeAlt },
    { name: 'Forums', path: '/Forums', icon: HiUsers },
    { name: 'Sessions', path: '/sessions-physician', icon: HiOutlineChatAlt2 },
    { name: 'E.H.R', path: '/ehr-physician', icon: HiOutlineCalendar },
  ];

  const handleMouseEnter = () => {
    setIsCollapsed(false);
    onCollapseChange(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
    onCollapseChange(true);
  };

  return (
    <div
      className={`h-screen transition-width duration-300 ${
        isCollapsed ? 'w-16' : 'w-48'
      } bg-[#0b2047] text-white flex flex-col fixed z-10`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center h-16 bg-[#0b2047]">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={48} 
          height={48} 
          className="h-12 w-12"
        />
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {sideBarLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <li key={index} className="mb-4">
                <Link href={link.path} className="flex items-center p-2 hover:bg-gray-700 rounded transition-all duration-300">
                  <Icon className="h-9 w-9" />
                  {!isCollapsed && <span className="ml-3">{link.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4">
        <button className="flex items-center p-2 hover:bg-gray-700 rounded">
          <HiOutlineLogout className="h-8 w-8" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}
