import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    chiefComplaint: "",
    templateName: "",
    followUp: "",
    notes: "",
    instructions: [""],
    diagnosis: [""],
    medications: [
      {
        drugName: "",
        dose: "",
        measurement: "",
        timing: "",
        duration: "",
        frequency: "",
        notes: ""
      }
    ],
    labInvestigations: [""]
  });

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleArrayChange = (e, index, key) => {
    const newArray = [...formData[key]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [key]: newArray });
  };

  const addToArray = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ""] });
  };

  const deleteFromArray = (index, key) => {
    const newArray = formData[key].filter((_, arrIndex) => arrIndex !== index);
    setFormData({ ...formData, [key]: newArray });
  };

  const handleMedicationsChange = (e, index, key) => {
    const newMedications = [...formData.medications];
    newMedications[index][key] = e.target.value;
    setFormData({ ...formData, medications: newMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        {
          drugName: "",
          dose: "",
          measurement: "",
          timing: "",
          duration: "",
          frequency: "",
          notes: ""
        }
      ]
    });
  };

  const deleteMedication = (index) => {
    const newMedications = formData.medications.filter((_, medIndex) => medIndex !== index);
    setFormData({ ...formData, medications: newMedications });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/saveData', formData);
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert('Error saving data');
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-black text-center  mb-4">ADD Template</h1>
      <h1 className="text-black text-xl mb-4">Template Name:</h1>
      <input
        className="mb-4 p-2 border border-gray-300 rounded bg-white text-black w-[500px]"
        value={formData.templateName}
        onChange={(e) => handleChange(e, "templateName")}
      />

      <h1 className="text-black text-xl mb-4">Chief Complaint:</h1>
      <input
        className="mb-4 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
        value={formData.chiefComplaint}
        onChange={(e) => handleChange(e, "chiefComplaint")}
      />

      <h1 className="text-black text-xl mb-4">Follow Up:</h1>
      <input
        className="mb-4 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
        value={formData.followUp}
        onChange={(e) => handleChange(e, "followUp")}
      />

      <h1 className="text-black text-xl mb-4">Instructions:</h1>
      <input
        className="mb-4 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
        value={formData.notes}
        onChange={(e) => handleChange(e, "notes")}
      />

      <h1 className="text-black text-xl mb-4">Lifestyle recommendations :</h1>
      {formData.instructions.map((instruction, index) => (
        <div key={index} className="mb-4">
          <input
            className="mb-2 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
            value={instruction}
            onChange={(e) => handleArrayChange(e, index, "instructions")}
          />
          <button
            className="ml-2 p-2 bg-red-500 text-white rounded"
            onClick={() => deleteFromArray(index, "instructions")}
          >
            Delete Instruction
          </button>
        </div>
      ))}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => addToArray("instructions")}
      >
        Add Instruction
      </button>

      <h1 className="text-black text-xl mb-4">Diagnosis:</h1>
      {formData.diagnosis.map((diag, index) => (
        <div key={index} className="mb-4">
          <input
            className="mb-2 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
            value={diag}
            onChange={(e) => handleArrayChange(e, index, "diagnosis")}
          />
          <button
            className="ml-2 p-2 bg-red-500 text-white rounded"
            onClick={() => deleteFromArray(index, "diagnosis")}
          >
            Delete Diagnosis
          </button>
        </div>
      ))}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => addToArray("diagnosis")}
      >
        Add Diagnosis
      </button>

      <h1 className="text-black text-xl mb-4">Medications:</h1>
      {formData.medications.map((med, index) => (
        <div key={index} className="mb-4 p-2 border border-gray-300 rounded">
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Drug Name"
            value={med.drugName}
            onChange={(e) => handleMedicationsChange(e, index, "drugName")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Dose"
            value={med.dose}
            onChange={(e) => handleMedicationsChange(e, index, "dose")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[130px]"
            placeholder="Measurement"
            value={med.measurement}
            onChange={(e) => handleMedicationsChange(e, index, "measurement")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Timing"
            value={med.timing}
            onChange={(e) => handleMedicationsChange(e, index, "timing")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Duration"
            value={med.duration}
            onChange={(e) => handleMedicationsChange(e, index, "duration")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Frequency"
            value={med.frequency}
            onChange={(e) => handleMedicationsChange(e, index, "frequency")}
          />
          <input
            className="mb-2 mr-2 p-2 border border-gray-300 rounded bg-white text-black w-[200px]"
            placeholder="Notes"
            value={med.notes}
            onChange={(e) => handleMedicationsChange(e, index, "notes")}
          />
          <button
            className="mb-2 p-2 bg-red-500 text-white rounded"
            onClick={() => deleteMedication(index)}
          >
            Delete Medication
          </button>
        </div>
      ))}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={addMedication}
      >
        Add Medication
      </button>

      <h1 className="text-black text-xl mb-4">Lab Investigations:</h1>
      {formData.labInvestigations.map((lab, index) => (
        <div key={index} className="mb-4">
          <input
            className="mb-2 p-2 border border-gray-300 rounded bg-white text-black w-[400px]"
            value={lab}
            onChange={(e) => handleArrayChange(e, index, "labInvestigations")}
          />
          <button
            className="ml-2 p-2 bg-red-500 text-white rounded"
            onClick={() => deleteFromArray(index, "labInvestigations")}
          >
            Delete Lab Investigation
          </button>
        </div>
      ))}
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => addToArray("labInvestigations")}
      >
        Add Lab Investigation
      </button>

      <div className="flex justify-center">
        <button
          className="mt-4 p-2 bg-green-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
