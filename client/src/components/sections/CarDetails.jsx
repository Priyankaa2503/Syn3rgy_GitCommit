import React, { useEffect, useState } from "react";
import Car from "../../assets/Car.png";
const CarDetails = () => {
  const [carDetails, setCarDetails] = useState(null);

  const data = JSON.parse(localStorage.getItem("activeCar"));
  useEffect(() => {
    console.log(data);
    setCarDetails(data);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg shadow-md shadow-black bg-[#141414] p-5">
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <img src={Car} alt="" className="w-full object-fit" />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center">
          <div className="grid grid-cols-2 gap-5 px-3 w-full items-center justify-between">
            <div className="flex flex-col">
              <div className="text-[#575757] text-lg">EV</div>
              <div className="text-2xl">{carDetails?.car}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[#575757] text-lg">Model</div>
              <div className="text-2xl">{carDetails?.model}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-[#575757] text-lg">Battery</div>
              <div className="text-2xl text-[#44DBA0]">
                {carDetails?.battery}
                {" %"}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[#575757] text-lg">Range</div>
              <div className="text-2xl">{carDetails?.range}</div>
            </div>
            <div className="flex flex-col bg-[#0c0c0c] p-2 rounded-md">
              <div className="text-[#575757] text-lg">Range</div>
              <div className="text-2xl">{carDetails?.range}</div>
            </div>
            <div className="flex flex-col bg-[#0c0c0c] p-2 rounded-md">
              <div className="text-[#575757] text-lg">Range</div>
              <div className="text-2xl">{carDetails?.range}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDetails;
