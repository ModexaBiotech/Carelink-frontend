import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import RightSidebar from '@/components/RightSidebar';
import Tabs from '@/components/Tabs';
import Table from '@/components/Table';
import StatsCard from '@/components/StatCard';
import { FaCalendarCheck, FaClock, FaStar } from 'react-icons/fa';

const SessionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('incoming');
  const [stats, setStats] = useState([
    { label: 'Total Sessions', value: 0, icon: FaCalendarCheck, color: 'bg-blue-200', textColor: 'text-blue-800' },
    { label: 'Average Duration', value: '0 min', icon: FaClock, color: 'bg-green-200', textColor: 'text-green-800' },
    { label: 'Average Rating', value: 0, icon: FaStar, color: 'bg-yellow-200', textColor: 'text-yellow-800' },
  ]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Define notifications and loginInfo
  const notifications = [
    { id: 1, message: 'New session scheduled', time: '10:00 AM' },
    { id: 2, message: 'Reminder: Check patient records', time: '12:00 PM' },
  ];

  interface LoginInfo {
    loginAs: string;
    userType: string;
    organization: string;
    loginTime: string;
    lastLogin: string;
  }
  

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    loginAs: "Jane Doe",
    userType: "Nurse",
    organization: "St. James Seminary SHS",
    loginTime: "2024-07-24T08:30:00Z", // Placeholder date
    lastLogin: "2024-07-23T18:00:00Z" // Placeholder date
  });
  const handleCollapseChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const data = [
    { name: 'Elisha Mensah', organization: 'GSTS', date: '08-08-24', time: '10:15', mode: 'Video' },
    { name: 'Nana Griffiths', organization: 'GSTS', date: '08-08-24', time: '11:00', mode: 'Video' },
    { name: 'Sadick Mustaph', organization: 'FGSTS', date: '08-08-24', time: '11:30', mode: 'Audio' },
    { name: 'Compson Elvis', organization: 'GSTS', date: '08-08-24', time: '12:00', mode: 'Video' },
    { name: 'Bernard Tetteh', organization: 'GSTS', date: '08-08-24', time: '12:30', mode: 'Chat' },
    { name: 'Justina Abbey', organization: 'FGSTS', date: '08-08-24', time: '13:00', mode: 'Video' },
  ];

  useEffect(() => {
    const fetchStats = () => {
      const newStats = [
        { label: 'Total Sessions', value: 10, icon: FaCalendarCheck, color: 'bg-blue-200', textColor: 'text-blue-800' },
        { label: 'Average Duration', value: '25 min', icon: FaClock, color: 'bg-green-200', textColor: 'text-green-800' },
        { label: 'Average Rating', value: 4.6, icon: FaStar, color: 'bg-yellow-200', textColor: 'text-yellow-800' },
      ];
      setStats(newStats);
    };

    fetchStats();
  }, []);

  const renderContent = () => {
    return (
      <div>
        {activeTab === 'incoming' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Medical Sessions</h2>
            <Table data={data} />
          </>
        )}
        {activeTab === 'appointments' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
            <p>You have no incoming appointments.</p>
          </div>
        )}
        {activeTab === 'closed' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Closed Sessions</h2>
            <Table data={data} />
          </>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <StatsCard stats={stats} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onCollapseChange={handleCollapseChange} />
      <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-60'}`}>
        <Header />
        <div className="flex justify-center">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
      <RightSidebar notifications={notifications} loginInfo={loginInfo} />
    </div>
  );
};

export default SessionsPage;
