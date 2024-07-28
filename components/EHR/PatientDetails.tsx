// import React, { useState } from 'react';
// import { Result, Prescription } from '@/types/types';
// import Vitals from './Vitals';
// import Tests from './Tests';
// import RxTab from './RxTab';
// import { FaArrowLeft } from 'react-icons/fa'; // Importing the icon

// interface PatientDetailsProps {
//   patient: Result;
//   onBack: () => void;
// }

// const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onBack }) => {
//   const [activeTab, setActiveTab] = useState('Patient Information');

//   const handleSavePrescriptions = (newPrescriptions: Prescription[]) => {
//     // Handle saving prescriptions logic here
//     console.log('Prescriptions saved', newPrescriptions);
//   };

//   return (
//     <div className="flex-1 max-w-full lg:max-w-3xl xl:max-w-4xl space-y-6">
//       <button 
//         onClick={onBack} 
//         className="flex items-center text-blue-500 hover:text-blue-700 transition duration-300"
//       >
//         <FaArrowLeft className="h-5 w-5 mr-2" /> {/* Adding the back arrow icon */}
//         Back to Search
//       </button>
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="flex flex-wrap items-center space-x-6 p-6 bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-t-lg">
//           <div className="h-24 w-24 bg-gray-300 rounded-full flex items-center justify-center">
//             <span className="text-2xl font-bold">{patient.name.charAt(0)}</span>
//           </div>
//           <div className="flex-1">
//             <h2 className="text-4xl font-bold">{patient.name}</h2>
//             <p className="text-md mt-2">ID: {patient.studentID}</p>
//           </div>
//           <div className="ml-auto text-right space-y-2">
//             <p className="text-lg">Age: {patient.age} Years</p>
//             <p className="text-lg">Sex: {patient.sex}</p>
//             <p className="text-lg">D.O.B: {patient.dob}</p>
//           </div>
//           <div className="text-right space-y-2">
//             <p className="text-lg">Blood Group: {patient.bloodGroup}</p>
//             <p className="text-lg">Allergies: {patient.allergies}</p>
//             <p className="text-lg">Status: {patient.status}</p>
//           </div>
//         </div>
//         <div className="flex space-x-4 border-b">
//           {['Patient Information', 'Investigations HX', 'RX HX'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`py-4 px-6 font-semibold ${
//                 activeTab === tab ? 'border-b-4 border-teal-700 text-teal-700' : 'text-gray-600 hover:text-teal-700 transition duration-300'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div className="p-6">
//           {activeTab === 'Patient Information' && (
//             <div className="mt-4">
//               <h2 className="text-2xl font-bold mb-6">Patient Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-gray-600"><strong>Name:</strong></p>
//                     <p>{patient.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>ID:</strong></p>
//                     <p>{patient.studentID}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Index No:</strong></p>
//                     <p>{patient.indexNo}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Class:</strong></p>
//                     <p>{patient.class}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Age:</strong></p>
//                     <p>{patient.age}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Sex:</strong></p>
//                     <p>{patient.sex}</p>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-gray-600"><strong>DOB:</strong></p>
//                     <p>{patient.dob}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Blood Group:</strong></p>
//                     <p>{patient.bloodGroup}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Allergies:</strong></p>
//                     <p>{patient.allergies}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Status:</strong></p>
//                     <p>{patient.status}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Contact:</strong></p>
//                     <p>{patient.contact}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Email:</strong></p>
//                     <p>{patient.email}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4">Emergency Contact Information</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-gray-600"><strong>Name:</strong></p>
//                     <p>{patient.emergencyContactName}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Relation:</strong></p>
//                     <p>{patient.emergencyContactRelation}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Contact:</strong></p>
//                     <p>{patient.emergencyContactNumber}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600"><strong>Email:</strong></p>
//                     <p>{patient.emergencyContactEmail}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === 'Investigations HX' && (
//             <div className="mt-4">
//               <h2 className="text-2xl font-bold mb-4">Investigations HX</h2>
//               <Vitals vitals={patient.vitals} />
//               <Tests tests={patient.tests} />
//             </div>
//           )}
//           {activeTab === 'RX HX' && (
//             <div className="mt-4">
//               <h2 className="text-2xl font-bold mb-4">RX HX</h2>
//               <RxTab prescriptions={patient.prescriptions} onSave={handleSavePrescriptions} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;
