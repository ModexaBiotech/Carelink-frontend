"use client";
import React, { useState } from 'react';
import GreetingCard from '@/components/Nurse/GreetingCard';
import Overview from '@/components/Nurse/OverviewCard';
import EducationalContent from '@/components/Dasboard/EducationalContent';
import { PatientProvider } from '@/components/Nurse/PatientContext';
import ConsultationProcess from '@/components/Nurse/ConsultationProcess';
import VideoCall from '@/components/Nurse/VideoCall';
import SearchPatientPopup from '@/components/Nurse/SearchPatientPopup';
import PatientDetailsPage from '@/components/Nurse/PatientDetailPage';
import AppointmentForm from '@/components/Nurse/AppointmentForm';

type Notification = {
  message: string;
  time: string;
  type: 'doctor' | 'forum' | 'other';
  profileName: string;
};

const DashboardNurse = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); 
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'sessions' | 'patientDetails' | 'medicalSessionDetails' | 'consultationProcess' | 'videoCall'>('sessions');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Placeholder data
  const notifications: Notification[] = [
    {
      message: 'Message from Dr. Ameyaw',
      time: 'Just now',
      type: 'doctor',
      profileName: 'Dr. Ameyaw',
    },
    {
      message: 'New post in the Forum',
      time: '23 minutes ago',
      type: 'forum',
      profileName: 'Forum Post',
    },
  ];

  const notes = [
    { title: 'Known Symptoms', content: 'Galloway girl', date: 'Just now' },
    { title: 'Things I should Google', content: 'The owner of Tesla', date: 'June 23' },
  ];

  const loginInfo = { 
    loginAs: 'Jane Doe', 
    userType: 'Nurse', 
    organization: 'CareLink Hospital', 
    loginTime: '2024-07-24T08:30:00Z', // Placeholder date
    lastLogin: '2024-07-23T18:00:00Z' // Placeholder date
  };

  // Stats placeholder data
  const stats = {
    students: 1300,
    drugsDispensed: 234,
    rpm: 2,
    referred: 7,
  };

  return (
    <div className="flex-grow p-8 transition-all duration-300">
      <div className="grid grid-cols-4 gap-4 h-full">
        <div className="col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <GreetingCard name={loginInfo.loginAs} theme={theme} />
            <Overview stats={stats} />  
          </div>
          <div className="flex justify-center gap-4 mt-4">
        
          {currentView === 'consultationProcess' && (
            <ConsultationProcess setStage={(stage) => setCurrentView(stage === 'VIDEO_CALL' ? 'videoCall' : 'consultationProcess')} />
          )}
          {currentView === 'videoCall' && <VideoCall />}
          </div>
          <EducationalContent />
        </div>
        <div className="space-y-4">
          {isSearchPopupOpen && (
            <SearchPatientPopup onClose={() => setIsSearchPopupOpen(false)} setCurrentView={setCurrentView} />
          )}
          {isAppointmentFormOpen && (
            <AppointmentForm onAddAppointment={(appointment) => {}} onClose={() => setIsAppointmentFormOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardNursePage: React.FC = () => (
  <PatientProvider>
    <DashboardNurse />
  </PatientProvider>
);

export default DashboardNurse;
