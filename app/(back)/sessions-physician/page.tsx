"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import Statistics from '@/components/Sessions/Statistics';
import Tips from '@/components/Sessions/Tips';
import TabNavigation from '@/components/Sessions/TabNavigation';
import IncomingRequests from '@/components/Sessions/IncomingRequest';
import Appointments from '@/components/Sessions/Appointments';
import ClosedSessions from '@/components/Sessions/ClosedSessions';
import Navbar from '@/components/Dasboard/Navbar';
import Connecting from '@/components/VideoCall/Connecting';
import Consultation from '@/components/VideoCall/Consultation';
import { Prescription, LabOrder, ReferralOrder } from '@/types/types';

const MedicalSessions = () => {
  const [activeTab, setActiveTab] = useState('Incoming Requests');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [referralOrders, setReferralOrders] = useState<ReferralOrder[]>([]);
  const [notifications, setNotifications] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    loginAs: "Dr. Lorant Amo Kodieh",
    userType: "Physician",
    organization: "Modexa Biotech",
    loginTime: "2024-07-27T10:00:00Z",
    lastLogin: "2024-07-26T15:30:00Z"
  });


  const handleCollapseChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleAcceptCall = () => {
    setIsConnecting(true);
  };

  const handleConnectionEstablished = () => {
    setIsConnecting(false);
    setIsConsulting(true);
  };

  const handleSavePrescriptions = (newPrescriptions: Prescription[]) => {
    setPrescriptions(newPrescriptions);
  };

  const handleSaveLabOrders = (newLabOrders: LabOrder[]) => {
    setLabOrders(newLabOrders);
  };

  const handleSaveReferralOrders = (newReferralOrders: ReferralOrder[]) => {
    setReferralOrders(newReferralOrders);
  };

  if (isConsulting) {
    return <Consultation handleConnectionEstablished={handleConnectionEstablished} />;
  }

  if (isConnecting) {
    return <Connecting onConnected={handleConnectionEstablished} />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar onCollapseChange={handleCollapseChange} />
      <div className={`flex-1 flex flex-col bg-gray-100 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-20'}`}>
        <Navbar />
        <div className="flex-1 flex p-6 space-x-6 overflow-auto">
          <div className="flex-1 max-w-full lg:max-w-3xl xl:max-w-4xl space-y-6">
            <h1 className="text-3xl font-bold">Medical Sessions</h1>
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'Incoming Requests' ? (
              <IncomingRequests onAccept={handleAcceptCall} onDecline={() => {}} />
            ) : activeTab === 'Appointments' ? (
              <Appointments />
            ) : activeTab === 'Closed Sessions' ? (
              <ClosedSessions />
            ) : (
              <>
                <Statistics />
                <Tips />
              </>
            )}
          </div>
          <RightSidebar notifications={notifications}  loginInfo={loginInfo} />
        </div>
      </div>
    </div>
  );
};

export default MedicalSessions;
