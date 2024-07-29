import React, { useEffect } from 'react';
import Modal from 'react-modal';
import RxHx from './Rx';
import LabOrderForm from './LabOrderForm';
import ReferralOrderForm from './RefferalForm';
import { Prescription, LabOrder, ReferralOrder } from '@/types/types';

interface ActionTabProps {
  prescriptions: Prescription[];
  labOrders: LabOrder[];
  referralOrders: ReferralOrder[];
  onSavePrescriptions: (newPrescriptions: Prescription[]) => void;
  onSaveLabOrders: (newLabOrders: LabOrder[]) => void;
  onSaveReferralOrders: (newReferralOrders: ReferralOrder[]) => void;
  loggedInDoctor: string;
}

const ActionTab: React.FC<ActionTabProps> = ({ prescriptions, labOrders, referralOrders, onSavePrescriptions, onSaveLabOrders, onSaveReferralOrders, loggedInDoctor }) => {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Action Tab</h3>
      
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-600 mb-2">Manage Prescription</h4>
        <RxHx prescriptions={prescriptions} onSave={onSavePrescriptions} />
      </div>

      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-600 mb-2">Manage Lab Orders</h4>
        <LabOrderForm labOrders={labOrders} onSave={onSaveLabOrders} />
      </div>

      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-600 mb-2">Manage Referrals</h4>
        <ReferralOrderForm 
          referralOrders={referralOrders} 
          onSave={onSaveReferralOrders} 
          loggedInDoctor={loggedInDoctor} 
        />
      </div>
    </div>
  );
};

export default ActionTab;
