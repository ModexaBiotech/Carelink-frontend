import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Test {
  testType: string;
  testName?: string;
  testResult?: string;
  testResultIgG?: string;
  testResultIgM?: string;
  appearance?: string;
  color?: string;
  ph?: string;
  specificGravity?: string;
  glucose?: string;
  ketones?: string;
  protein?: string;
  leukocytes?: string;
  nitrites?: string;
  bilirubin?: string;
  urobilirubin?: string;
  date: string;
}

interface AddTestsPopupProps {
  tests: Test[];
  onSave: (newTests: Test[]) => void;
  onClose: () => void;
}

const AddTestsPopup: React.FC<AddTestsPopupProps> = ({ tests, onSave, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTests, setCurrentTests] = useState<Test[]>(tests);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (index: number, field: keyof Test, value: string) => {
    const updatedTests = [...currentTests];
    updatedTests[index][field] = value;
    setCurrentTests(updatedTests);
  };

  const handleAddTest = () => {
    setCurrentTests([
      ...currentTests,
      {
        testType: '',
        date: new Date().toISOString().split('T')[0],
      },
    ]);
  };

  const handleDeleteTest = (index: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this test?');
    if (confirmDelete) {
      const updatedTests = [...currentTests];
      updatedTests.splice(index, 1);
      setCurrentTests(updatedTests);
    }
  };

  const handleSaveTests = () => {
    if (currentTests.length === 0) return;
    const confirmSave = window.confirm('Are you sure you want to save?');
    if (confirmSave) {
      onSave(currentTests);
      setIsExpanded(false);
      console.log('Saved');
    }
  };

  const renderTestSubTypeOptions = (testType: string) => {
    if (testType === 'RDT') {
      return (
        <>
          <option value="Malaria">Malaria</option>
          <option value="Typhoid">Typhoid</option>
          <option value="HB-Elect">HB-Elect</option>
        </>
      );
    } else if (testType === 'Others') {
      return <option value="Urine Dipstick">Urine Dipstick</option>;
    }
    return null;
  };

  const renderTestResultOptions = (testName: string) => {
    if (testName === 'Malaria') {
      return (
        <select
          name="testResult"
          className="p-2 border rounded w-full"
          onChange={(e) => handleInputChange(currentTests.length - 1, 'testResult', e.target.value)}
        >
          <option value="">Select Result</option>
          <option value="Positive">Positive</option>
          <option value="Negative">Negative</option>
        </select>
      );
    } else if (testName === 'Typhoid') {
      return (
        <div className="grid grid-cols-2 gap-2">
          <select
            name="testResultIgG"
            className="p-2 border rounded w-full"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'testResultIgG', e.target.value)}
          >
            <option value="">IgG</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
          <select
            name="testResultIgM"
            className="p-2 border rounded w-full"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'testResultIgM', e.target.value)}
          >
            <option value="">IgM</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
      );
    } else if (testName === 'HB-Elect') {
      return (
        <select
          name="testResult"
          className="p-2 border rounded w-full"
          onChange={(e) => handleInputChange(currentTests.length - 1, 'testResult', e.target.value)}
        >
          <option value="">Select Result</option>
          <option value="A">A</option>
          <option value="AS">AS</option>
          <option value="SS">SS</option>
          <option value="SC">SC</option>
          <option value="D">D</option>
        </select>
      );
    } else if (testName === 'Urine Dipstick') {
      return (
        <>
          <input
            type="text"
            name="appearance"
            placeholder="Appearance"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'appearance', e.target.value)}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'color', e.target.value)}
          />
          <input
            type="text"
            name="ph"
            placeholder="pH"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'ph', e.target.value)}
          />
          <input
            type="text"
            name="specificGravity"
            placeholder="Specific Gravity"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'specificGravity', e.target.value)}
          />
          <input
            type="text"
            name="glucose"
            placeholder="Glucose"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'glucose', e.target.value)}
          />
          <input
            type="text"
            name="ketones"
            placeholder="Ketones"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'ketones', e.target.value)}
          />
          <input
            type="text"
            name="protein"
            placeholder="Protein"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'protein', e.target.value)}
          />
          <input
            type="text"
            name="leukocytes"
            placeholder="Leukocytes"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'leukocytes', e.target.value)}
          />
          <input
            type="text"
            name="nitrites"
            placeholder="Nitrites"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'nitrites', e.target.value)}
          />
          <input
            type="text"
            name="bilirubin"
            placeholder="Bilirubin"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'bilirubin', e.target.value)}
          />
          <input
            type="text"
            name="urobilirubin"
            placeholder="Urobilirubin"
            className="p-2 border rounded w-full mt-2"
            onChange={(e) => handleInputChange(currentTests.length - 1, 'urobilirubin', e.target.value)}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Add Tests</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center bg-[#28313B] text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-bold">Tests</h2>
            <button
              onClick={handleToggleExpand}
              className="text-xl bg-gray-700 hover:bg-gray-600 text-white rounded-full p-1"
            >
              {isExpanded ? '-' : '+'}
            </button>
          </div>
          {isExpanded && (
            <div className="p-4">
              {currentTests.map((test, index) => (
                <div key={index} className="border p-4 mt-4 rounded fade-in">
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block">
                      <span className="text-gray-700">Date</span>
                      <input
                        type="date"
                        name="date"
                        value={test.date}
                        onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                        className="p-2 border rounded mt-1 w-full"
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Test Procedure</span>
                      <select
                        name="testType"
                        value={test.testType}
                        onChange={(e) => handleInputChange(index, 'testType', e.target.value)}
                        className="p-2 border rounded mt-1 w-full"
                      >
                        <option value="">Select Test Procedure</option>
                        <option value="RDT">RDT</option>
                        <option value="Others">Others</option>
                      </select>
                    </label>
                    {test.testType && (
                      <label className="block">
                        <span className="text-gray-700">Test Name</span>
                        <select
                          name="testName"
                          value={test.testName || ''}
                          onChange={(e) => handleInputChange(index, 'testName', e.target.value)}
                          className="p-2 border rounded mt-1 w-full"
                        >
                          <option value="">Select Test Name</option>
                          {renderTestSubTypeOptions(test.testType)}
                        </select>
                      </label>
                    )}
                    {test.testName && (
                      <>
                        <label className="block mt-2">
                          <span className="text-gray-700">Test Result</span>
                          {renderTestResultOptions(test.testName)}
                        </label>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteTest(index)}
                      className="bg-red-500 text-white p-2 rounded mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center mt-4">
                <button onClick={handleAddTest} className="bg-green-500 text-white p-2 rounded">
                  Add Test
                </button>
                <button
                  onClick={handleSaveTests}
                  className="bg-blue-500 text-white p-2 rounded"
                  disabled={currentTests.length === 0}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTestsPopup;
