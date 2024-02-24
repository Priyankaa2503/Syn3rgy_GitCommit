import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddEVModal = ({ isOpen, getData, onClose }) => {
  const [formData, setFormData] = useState({
    evName: "",
    evModel: "",
    evYear: "",
    evBatteryCapacity: "",
    evRange: "",
    evPowerReserve: "",
    evChargingConnector: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userid = JSON.parse(localStorage.getItem("user"))?.id;
    axios
      .post(`http://localhost:5000/evs`, {
        userId: userid,
        evName: formData.evName,
        evModel: formData.evModel,
        evYear: parseInt(formData.evYear),
        evBatteryCapacity: parseInt(formData.evBatteryCapacity),
        evRange: parseInt(formData.evRange),
        evPowerReserve: parseInt(formData.evPowerReserve),
        evChargingConnector: formData.evChargingConnector,
      })
      .then((res) => {
        toast.success("EV added successfully");
        getData();
      })
      .catch((err) => {
        toast.error("Failed to add EV");
      });

    setFormData({
      evName: "",
      evModel: "",
      evYear: "",
      evBatteryCapacity: "",
      evRange: "",
      evPowerReserve: "",
      evChargingConnector: "",
    });
    // Close the modal
    onClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-[100] bg-black bg-opacity-70 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Add New EV</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Input fields */}
          <div className="mb-4">
            <label htmlFor="evName" className="block mb-1 text-gray-800">
              EV Name
            </label>
            <input
              type="text"
              id="evName"
              name="evName"
              value={formData.evName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="evModel" className="block mb-1 text-gray-800">
              EV Model
            </label>
            <input
              type="text"
              id="evModel"
              name="evModel"
              value={formData.evModel}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="evYear" className="block mb-1 text-gray-800">
              EV Year
            </label>
            <input
              type="number"
              id="evYear"
              name="evYear"
              value={formData.evYear}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="evBatteryCapacity"
              className="block mb-1 text-gray-800"
            >
              EV Battery Capacity
            </label>
            <input
              type="number"
              id="evBatteryCapacity"
              name="evBatteryCapacity"
              value={formData.evBatteryCapacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="evRange" className="block mb-1 text-gray-800">
              EV Range
            </label>
            <input
              type="number"
              id="evRange"
              name="evRange"
              value={formData.evRange}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="evPowerReserve"
              className="block mb-1 text-gray-800"
            >
              EV Power Reserve
            </label>
            <input
              type="number"
              id="evPowerReserve"
              name="evPowerReserve"
              value={formData.evPowerReserve}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="evChargingConnector"
              className="block mb-1 text-gray-800"
            >
              EV Charging Connector
            </label>
            <input
              type="text"
              id="evChargingConnector"
              name="evChargingConnector"
              value={formData.evChargingConnector}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#44dba0] text-white rounded-md px-4 py-2 mr-2"
            >
              Add
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 rounded-md px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEVModal;
