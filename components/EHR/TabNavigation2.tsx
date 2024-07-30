import React, { useState } from 'react';
import ActionTab from '@/components/VideoCall/ActionTab'; 
import { Prescription, LabOrder, ReferralOrder } from '@/types/types';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Patient Information');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [referralOrders, setReferralOrders] = useState<ReferralOrder[]>([]);
  const loggedInDoctor = 'Dr. Lorant Amo Kodieh'; 

  const onSavePrescriptions = (newPrescriptions: Prescription[]) => {
    setPrescriptions(newPrescriptions); 
  };

  const onSaveLabOrders = (newLabOrders: LabOrder[]) => {
    setLabOrders(newLabOrders); 
  };

  const onSaveReferralOrders = (newReferralOrders: ReferralOrder[]) => {
    setReferralOrders(newReferralOrders); 
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['Patient Information', 'Investigations HX', 'RX HX', 'Action Tab'].map((tab) => (
            <button
              key={tab}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {activeTab === 'Patient Information' && <PatientInformation />}
        {activeTab === 'Investigations HX' && <InvestigationsHX />}
        {activeTab === 'RX HX' && <RXHX />}
        {activeTab === 'Action Tab' && (
          <ActionTab
            prescriptions={prescriptions}
            labOrders={labOrders}
            referralOrders={referralOrders}
            onSavePrescriptions={onSavePrescriptions}
            onSaveLabOrders={onSaveLabOrders}
            onSaveReferralOrders={onSaveReferralOrders}
            loggedInDoctor={loggedInDoctor}
          />
        )}
      </div>
    </div>
  );
};

const PatientInformation = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
    
    <p><strong>Name:</strong> Emefa Duah</p>
    <p><strong>D.O.B:</strong> 10-09-2000</p>
    <p><strong>Age:</strong> 23</p>
    <p><strong>Gender:</strong> Female</p>
    <p><strong>Contact:</strong> +233 54 227 2456</p>
    <p><strong>Email:</strong> emefa@email.com</p>

    <h3 className="text-lg font-semibold mb-4 mt-6">Emergency Contact Information</h3>
  
    <p><strong>Name:</strong> Mary Duah</p>
    <p><strong>Relation:</strong> Mother</p>
    <p><strong>Contact:</strong> +233 54 227 2456</p>
    <p><strong>Email:</strong> emefa@email.com</p>
  </div>
);

const InvestigationsHX = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Investigations History</h3>
    
  </div>
);

const RXHX = () => (
  <div>
    <h3 className="text-lg font-semibold mb-4">RX History</h3>
    
  </div>
);

export default TabNavigation;
