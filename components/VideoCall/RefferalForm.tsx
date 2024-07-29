"use client";
import React, { useState, useEffect } from 'react';
import { ReferralOrder as ReferralOrderType } from '@/types/types';

interface ReferralOrderFormProps {
  referralOrders: ReferralOrderType[];
  onSave: (newReferralOrders: ReferralOrderType[]) => void;
  patientDetails?: {
    name: string;
    id: string;
    dateOfBirth: string;
    gender: string;
  };
  loggedInDoctor: string;
}

const specialties: { [key: string]: string[] } = {
  General: [],
  Cardiology: ["Interventional Cardiology", "Electrophysiology", "Heart Failure"],
  Neurology: ["Stroke", "Epilepsy", "Neurodegenerative Disorders"],
  Orthopedics: ["Spine Surgery", "Sports Medicine", "Joint Replacement"],
  Pediatrics: ["Neonatology", "Pediatric Cardiology", "Pediatric Neurology"],
};

const regions: string[] = ["Greater Accra", "Ashanti", "Western", "Eastern", "Volta", "Central", "Northern", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo", "Western North", "Oti", "North East", "Savannah"];

const hospitals: { [key: string]: string[] } = {
  "Greater Accra": ["Korle Bu Teaching Hospital", "37 Military Hospital", "Ridge Hospital"],
  "Ashanti": ["Komfo Anokye Teaching Hospital", "Manhyia District Hospital"],
  "Western": ["Effia-Nkwanta Regional Hospital"],
  "Eastern": ["Koforidua Regional Hospital"],
  "Volta": ["Ho Teaching Hospital"],
  "Central": ["Cape Coast Teaching Hospital"],
  "Northern": ["Tamale Teaching Hospital"],
  "Upper East": ["Bolgatanga Regional Hospital"],
  "Upper West": ["Wa Regional Hospital"],
  "Bono": ["Sunyani Regional Hospital"],
  "Bono East": ["Techiman Holy Family Hospital"],
  "Ahafo": ["Goaso Municipal Hospital"],
  "Western North": ["Sefwi Wiawso Municipal Hospital"],
  "Oti": ["Jasikan District Hospital"],
  "North East": ["Nalerigu Baptist Medical Centre"],
  "Savannah": ["Damongo District Hospital"],
};

const ReferralOrderForm: React.FC<ReferralOrderFormProps> = ({ referralOrders, onSave, patientDetails, loggedInDoctor }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentReferralOrders, setCurrentReferralOrders] = useState<ReferralOrderType[]>(referralOrders);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    setCurrentReferralOrders(referralOrders);
  }, [referralOrders]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (index: number, field: keyof ReferralOrderType, value: string) => {
    const updatedReferralOrders = [...currentReferralOrders];
    updatedReferralOrders[index][field] = value;
    setCurrentReferralOrders(updatedReferralOrders);
  };

  const handleAddReferralOrder = () => {
    setCurrentReferralOrders([
      ...currentReferralOrders,
      {
        patientName: patientDetails?.name || '',
        patientId: patientDetails?.id || '',
        dateOfBirth: patientDetails?.dateOfBirth || '',
        gender: patientDetails?.gender || '',
        referralDate: new Date().toISOString().split('T')[0],
        referringPhysician: loggedInDoctor,
        specialty: '',
        subSpecialty: '',
        reasonForReferral: '',
        clinicalHistory: '',
        currentMedications: '',
        locationOfOrganization: '',
        preferredFacility: '',
        otherFacility: '',
      },
    ]);
  };

  const handleDeleteReferralOrder = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this referral order?");
    if (confirmDelete) {
      const updatedReferralOrders = [...currentReferralOrders];
      updatedReferralOrders.splice(index, 1);
      setCurrentReferralOrders(updatedReferralOrders);
    }
  };

  const handleSaveReferralOrders = () => {
    if (currentReferralOrders.length === 0) return;
    const confirmSave = window.confirm("Are you sure you want to save?");
    if (confirmSave) {
      onSave(currentReferralOrders);
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center bg-[#28313B] text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Referral Orders</h2>
        <button
          onClick={handleToggleExpand}
          className="text-xl bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1"
        >
          {isExpanded ? '-' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div className="p-4">
          {currentReferralOrders.map((referralOrder, index) => (
            <div key={index} className="border p-4 mt-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={referralOrder.patientName}
                  readOnly
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="patientId"
                  placeholder="Patient ID"
                  value={referralOrder.patientId}
                  readOnly
                  className="p-2 border rounded"
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  value={referralOrder.dateOfBirth}
                  readOnly
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={referralOrder.gender}
                  readOnly
                  className="p-2 border rounded"
                />
                <input
                  type="date"
                  name="referralDate"
                  placeholder="Referral Date"
                  value={referralOrder.referralDate}
                  readOnly
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="referringPhysician"
                  placeholder="Referring Physician"
                  value={referralOrder.referringPhysician}
                  readOnly
                  className="p-2 border rounded"
                />
                <select
                  name="specialty"
                  value={referralOrder.specialty}
                  onChange={(e) => {
                    handleInputChange(index, 'specialty', e.target.value);
                    setSelectedSpecialty(e.target.value);
                  }}
                  className="p-2 border rounded"
                >
                  <option value="">Select Specialty</option>
                  {Object.keys(specialties).map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <select
                  name="subSpecialty"
                  value={referralOrder.subSpecialty}
                  onChange={(e) => handleInputChange(index, 'subSpecialty', e.target.value)}
                  className="p-2 border rounded"
                  disabled={!selectedSpecialty}
                >
                  <option value="">Select Sub-Specialty</option>
                  {specialties[selectedSpecialty]?.map(subSpecialty => (
                    <option key={subSpecialty} value={subSpecialty}>{subSpecialty}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="reasonForReferral"
                  placeholder="Reason for Referral"
                  value={referralOrder.reasonForReferral}
                  onChange={(e) => handleInputChange(index, 'reasonForReferral', e.target.value)}
                  className="p-2 border rounded col-span-2"
                />
                <textarea
                  name="clinicalHistory"
                  placeholder="Clinical History"
                  value={referralOrder.clinicalHistory}
                  onChange={(e) => handleInputChange(index, 'clinicalHistory', e.target.value)}
                  className="p-2 border rounded col-span-2"
                />
                <textarea
                  name="currentMedications"
                  placeholder="Current Medications"
                  value={referralOrder.currentMedications}
                  onChange={(e) => handleInputChange(index, 'currentMedications', e.target.value)}
                  className="p-2 border rounded col-span-2"
                />
                <select
                  name="locationOfOrganization"
                  value={referralOrder.locationOfOrganization}
                  onChange={(e) => {
                    handleInputChange(index, 'locationOfOrganization', e.target.value);
                    setSelectedRegion(e.target.value);
                  }}
                  className="p-2 border rounded col-span-2"
                >
                  <option value="">Select Region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <select
                  name="preferredFacility"
                  value={referralOrder.preferredFacility}
                  onChange={(e) => handleInputChange(index, 'preferredFacility', e.target.value)}
                  className="p-2 border rounded col-span-2"
                  disabled={!selectedRegion}
                >
                  <option value="">Select Facility</option>
                  {hospitals[selectedRegion]?.map(facility => (
                    <option key={facility} value={facility}>{facility}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {referralOrder.preferredFacility === "Other" && (
                  <input
                    type="text"
                    name="otherFacility"
                    placeholder="Specify Other Facility"
                    value={referralOrder.otherFacility}
                    onChange={(e) => handleInputChange(index, 'otherFacility', e.target.value)}
                    className="p-2 border rounded col-span-2"
                  />
                )}
              </div>
              <button
                onClick={() => handleDeleteReferralOrder(index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button onClick={handleAddReferralOrder} className="bg-green-500 text-white p-2 rounded">
              Add
            </button>
            <button
              onClick={handleSaveReferralOrders}
              className="bg-green-500 text-white p-2 rounded"
              disabled={currentReferralOrders.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralOrderForm;
