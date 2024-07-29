import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Vitals from './Vitals';
import Tests from './Tests';
import PatientInformation from './PatientInformation';
import NursesNotes from './NursesNotes';
import PhysicianNotes from './physicianNotes';
import ActionTab from './ActionTab';
import { Prescription, LabOrder, ReferralOrder } from '@/types/types';
import VideoCall from '@/components/VideoCall/VideoCall';

interface FormFields {
  reasonForVisit: string;
  symptomDescription: string;
  onset: Date | null;
  duration: string;
  severity: number;
  additionalNotes?: string;
  diagnosis: string;
  treatmentPlan: string;
}

interface ConsultationProps {
  handleConnectionEstablished: () => void;
}

const Consultation: React.FC<ConsultationProps> = ({ handleConnectionEstablished }) => {
  const mockTests = [
    { name: 'Malaria (RDT)', result: 'Negative', date: '12-03-2024', time: '04:21' },
    { name: 'Typhoid (RDT)', result: 'Negative', date: '12-03-2024', time: '04:21' },
    { name: 'HB Elect (RDT)', result: 'Negative', date: '12-03-2024', time: '04:21' },
  ];

  const mockVitals = [
    { name: 'Blood Pressure', value: '120/80', date: '12-03-2024', time: '04:21' },
    { name: 'Pulse(BPM)', value: '80', date: '12-03-2024', time: '04:21' },
    { name: 'Temperature(°C)', value: '98.6', date: '12-03-2024', time: '04:21' },
    { name: 'Resp. Rate', value: '16', date: '12-03-2024', time: '04:21' },
    { name: 'SPO2', value: '98', date: '12-03-2024', time: '04:21' },
  ];

  const patientInfo = {
    name: 'Nana Griffiths',
    id: 'STJ19250421',
    age: 20,
    dob: '10-09-2002',
    sex: 'Male',
    organization: 'St. James Sem. SHS',
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [referralOrders, setReferralOrders] = useState<ReferralOrder[]>([]);
  const [nursesNotes, setNursesNotes] = useState('Patient reported feeling dizzy with occasional headaches. No signs of fever.');
  const [physicianNotes, setPhysicianNotes] = useState<FormFields>({
    reasonForVisit: '',
    symptomDescription: '',
    onset: null,
    duration: '',
    severity: 0,
    additionalNotes: '',
    diagnosis: '',
    treatmentPlan: '',
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    console.log('Consultation component mounted, connecting...');
    const timer = setTimeout(() => {
      console.log('Connection established in Consultation.');
      handleConnectionEstablished();
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleConnectionEstablished]);

  return (
    <div className="flex h-screen bg-white"> {/* Changed background color to white */}
      <Sidebar onCollapseChange={setIsSidebarCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-48'}`}>
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 space-y-6">
              <Vitals vitals={mockVitals} />
              <div className="h-30"> 
                <NursesNotes notes={nursesNotes} />
              </div>
            </div>
            <div className="col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="h-full">
                  <VideoCall />
                </div>
                <div>
                  <PatientInformation {...patientInfo} />
                  <Tests tests={mockTests} />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <PhysicianNotes notes={physicianNotes} onSaveNotes={setPhysicianNotes as (notes: FormFields) => void} />
            <div className="flex justify-center">
              <div className="w-full md:w-1/2"> 
                <ActionTab
                  prescriptions={prescriptions}
                  labOrders={labOrders}
                  referralOrders={referralOrders}
                  onSavePrescriptions={setPrescriptions}
                  onSaveLabOrders={setLabOrders}
                  onSaveReferralOrders={setReferralOrders}
                  loggedInDoctor="Dr. Smith" // Make sure to pass this prop if needed
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
