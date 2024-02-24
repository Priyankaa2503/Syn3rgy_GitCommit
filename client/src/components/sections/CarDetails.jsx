import React, { useEffect } from "react";
import Car from "../../assets/Car.png";
const CarDetails = () => {
  const data = localStorage.getItem("activeCar");
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg shadow-md shadow-black bg-[#141414] p-5">
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <img src={Car} alt="" className="w-full object-fit" />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-[#575757] text-sm">EV</div>
            <div className="text-xl">{data.car}</div>
          </div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col"></div>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
