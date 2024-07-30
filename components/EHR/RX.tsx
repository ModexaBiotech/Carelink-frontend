import React, { useState } from 'react';
import { Prescription } from '@/types/types';

interface RxHxProps {
  prescriptions: Prescription[];
  onSave: (newPrescriptions: Prescription[]) => void;
}

const RxHx: React.FC<RxHxProps> = ({ prescriptions, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPrescriptions, setCurrentPrescriptions] = useState<Prescription[]>(prescriptions);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (index: number, field: keyof Prescription, value: string) => {
    const updatedPrescriptions = [...currentPrescriptions];
    updatedPrescriptions[index][field] = value;
    setCurrentPrescriptions(updatedPrescriptions);
  };

  const handleAddPrescription = () => {
    setCurrentPrescriptions([
      ...currentPrescriptions,
      {
        drugName: '',
        route: '',
        frequency: '',
        dose: '',
        unit: '',
        startDate: '',
        endDate: '',
        quantity: '',
        instructions: '',
        date: new Date().toLocaleDateString(), // Ensure this field is present
      },
    ]);
  };

  const handleDeletePrescription = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this prescription?");
    if (confirmDelete) {
      const updatedPrescriptions = [...currentPrescriptions];
      updatedPrescriptions.splice(index, 1);
      setCurrentPrescriptions(updatedPrescriptions);
    }
  };

  const handleSavePrescription = () => {
    if (currentPrescriptions.length === 0) return;
    const confirmSave = window.confirm("Are you sure you want to save?");
    if (confirmSave) {
      onSave(currentPrescriptions);
      setIsExpanded(false);
      console.log("Saved");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center bg-[#28313B] text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">RX</h2>
        <button
          onClick={handleToggleExpand}
          className="text-xl bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1"
        >
          {isExpanded ? '-' : '+'}
        </button>
      </div>
      {isExpanded && (
        <div className="p-4">
          {currentPrescriptions.map((prescription, index) => (
            <div key={index} className="border p-4 mt-4 rounded">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="drugName"
                  placeholder="Drug Name"
                  value={prescription.drugName}
                  onChange={(e) => handleInputChange(index, 'drugName', e.target.value)}
                  className="p-2 border rounded"
                />
                <select
                  name="route"
                  value={prescription.route}
                  onChange={(e) => handleInputChange(index, 'route', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Route</option>
                  <option value="oral">Oral</option>
                  <option value="intraocular">Intraocular</option>
                  <option value="intraotic">Intraotic</option>
                  <option value="nasal">Nasal</option>
                  <option value="sublingual">Sublingual</option>
                  <option value="buccal">Buccal</option>
                  <option value="iv">IV</option>
                  <option value="im">IM</option>
                  <option value="topical">Topical</option>
                </select>
                <select
                  name="frequency"
                  value={prescription.frequency}
                  onChange={(e) => handleInputChange(index, 'frequency', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Frequency</option>
                  <option value="QD">OD</option>
                  <option value="BID">BID</option>
                  <option value="TID">TID</option>
                  <option value="TID">QID</option>
                  <option value="TID">QHS</option>
                  <option value="TID">Q8H</option>
                  <option value="TID">PRN</option>
                  <option value="TID">STAT</option>
                </select>
                <input
                  type="text"
                  name="dose"
                  placeholder="Dose"
                  value={prescription.dose}
                  onChange={(e) => handleInputChange(index, 'dose', e.target.value)}
                  className="p-2 border rounded"
                />
                <select
                  name="unit"
                  value={prescription.unit}
                  onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="">Select Unit</option>
                  <option value="mg">Milligram(mg)</option>
                  <option value="g">Gram(g)</option>
                  <option value="mcg">Microgram(mcg)</option>
                  <option value="ml">Milliliter(ml)</option>
                  <option value="l">Liter(L)</option>
                </select>
                <div className="col-span-2 flex space-x-4">
                  <input
                    type="date"
                    name="startDate"
                    value={prescription.startDate}
                    onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                    className="p-2 border rounded w-1/2"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={prescription.endDate}
                    onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                    className="p-2 border rounded w-1/2"
                  />
                </div>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={prescription.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  className="p-2 border rounded"
                />
                <textarea
                  name="instructions"
                  placeholder="Instructions"
                  value={prescription.instructions}
                  onChange={(e) => handleInputChange(index, 'instructions', e.target.value)}
                  className="p-2 border rounded col-span-2"
                />
              </div>
              <button
                onClick={() => handleDeletePrescription(index)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button onClick={handleAddPrescription} className="bg-green-500 text-white p-2 rounded">
              Add
            </button>
            <button
              onClick={handleSavePrescription}
              className="bg-green-500 text-white p-2 rounded"
              disabled={currentPrescriptions.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RxHx;
