"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Nurse/Sidebar';
import Notifications from '@/components/Nurse/Notifications';
import LoginStatus from '@/components/Nurse/LoginStatus';
import ClosedSessions from '@/components/Sessions/ClosedSessions';
import SearchPatientPopup from '@/components/Nurse/SearchPatientPopup';
import AppointmentForm from '@/components/Nurse/AppointmentForm';
import AppointmentTable from '@/components/Nurse/AppointmentTable';
import { PatientProvider, usePatient } from '@/components/Nurse/PatientContext';
import PatientDetailsPage from '@/components/Nurse/PatientDetailPage';
import MedicalSessionDetails from '@/components/Nurse/MedicalSessionDetails';
import ConsultationProcess from '@/components/Nurse/ConsultationProcess';
import VideoCall from '@/components/Nurse/VideoCall';
import { VitalsData, Test } from '@/types/interfaces';

interface Appointment {
  id: number;
  patientName: string;
  patientAge: number;
  patientSex: string;
  patientOrganization: string;
  physicianName: string;
  date: string;
  time: string;
  mode: string;
  reason: string;
}

const SessionsPageContent: React.FC = () => {
  const [notifications, setNotifications] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    loginAs: "Jane Doe",
    userType: "Nurse",
    organization: "CareLink Hospital",
    loginTime: "2024-07-24T08:30:00Z", // Placeholder date
    lastLogin: "2024-07-23T18:00:00Z" // Placeholder date
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentView, setCurrentView] = useState<'sessions' | 'patientDetails' | 'medicalSessionDetails' | 'consultationProcess' | 'videoCall'>('sessions');

  const { selectedPatient, selectPatient } = usePatient();

  const handleCollapseChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  const handleSave = (data: { vitals: VitalsData; tests: Test[]; notes: string; attachment: File | null }) => {
    console.log('Saved data', data);
    // Save the data logic here
  };

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleRemoveAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCollapseChange={handleCollapseChange} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-20'}`}>
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Medical Sessions</h2>
          </div>
          {currentView === 'sessions' && (
            <>
              <div className="flex justify-center space-x-4 mb-6">
                <button 
                  className="bg-blue hover:bg-blue text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setIsSearchPopupOpen(true)}
                >
                  Start New Session
                </button>
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setIsAppointmentFormOpen(true)}
                >
                  Schedule Session
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Scheduled Appointments</h3>
                <AppointmentTable 
                  appointments={appointments} 
                  onRemoveAppointment={handleRemoveAppointment} 
                />
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Closed Sessions</h2>
                <ClosedSessions />
              </div>
            </>
          )}
          {currentView === 'patientDetails' && (
            <PatientDetailsPage 
              onBack={() => setCurrentView('sessions')} // Go back to search
              onProceed={() => setCurrentView('medicalSessionDetails')} 
            />
          )}
          {currentView === 'medicalSessionDetails' && (
            <MedicalSessionDetails 
              onSave={handleSave} 
              setStage={(stage) => setCurrentView(stage === 'VIDEO_CALL' ? 'videoCall' : 'consultationProcess')} 
            />
          )}
          {currentView === 'consultationProcess' && (
            <ConsultationProcess setStage={(stage) => setCurrentView(stage === 'VIDEO_CALL' ? 'videoCall' : 'consultationProcess')} />
          )}
          {currentView === 'videoCall' && <VideoCall />}
        </div>
      </div>
      <div className="w-80 bg-gray-100 p-4 flex flex-col space-y-6">
        <Notifications notifications={notifications} />
        <LoginStatus {...loginInfo} />
      </div>
      {isSearchPopupOpen && (
        <SearchPatientPopup onClose={() => setIsSearchPopupOpen(false)} setCurrentView={setCurrentView} />
      )}
      {isAppointmentFormOpen && (
        <AppointmentForm onAddAppointment={handleAddAppointment} onClose={() => setIsAppointmentFormOpen(false)} />
      )}
    </div>
  );
};

const SessionsPage: React.FC = () => (
  <PatientProvider>
    <SessionsPageContent />
  </PatientProvider>
);

export default SessionsPage;
