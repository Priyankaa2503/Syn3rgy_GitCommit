import React, { useState } from "react";
import { MdOutlineElectricBolt, MdCancelPresentation } from "react-icons/md";
import Car from "../../assets/Car.png"

const Stations = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 58,
    time: "5:21",
    powerReserve: 400,
    range: 340,
    temp: 75.2
  });
  return (
    <div>
      Stations
      <div className="flex gap-x-24 justify-center">
      <div className="flex flex-col gap-y-6">
      <div className="border p-6 border-[#44DDA0] rounded-xl ">
        <MdOutlineElectricBolt className="font-extrabold text-4xl text-[#44DDA0]" />
        <div className="flex justify-between my-4">
          <h2 className="font-bold text-xl">
            <span className="white pr-2">1.5</span>miles
          </h2>
          <MdCancelPresentation className="text-4xl text-[#44DDA0]" />
        </div>
        <p className="text-lg font-medium">Tesla Station</p>
        <div className="flex flex-col my-4">
          <div className="flex gap-x-12 justify-between">
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Type</p>
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Price</p>
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Slot</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-white text-2xl">DC</p>
            <p className="font-bold text-white text-2xl">$0.6kW</p>
            <p className="font-bold text-white text-2xl">5</p>
          </div>
        </div>
      </div>
      <div className="border p-6 border- rounded-xl ">
        <MdOutlineElectricBolt className="font-extrabold text-4xl text-[#44DDA0]" />
        <div className="flex justify-between my-4">
          <h2 className="font-bold text-xl">
            <span className="white pr-2">1.5</span>miles
          </h2>
          <MdCancelPresentation className="text-4xl text-[#44DDA0]" />
        </div>
        <p className="text-lg font-medium">Tesla Station</p>
        <div className="flex flex-col my-4">
          <div className="flex gap-x-12 justify-between">
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Type</p>
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Price</p>
            <p className="font-semibold text-[#FFFFFF4D] text-lg">Slot</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold text-white text-2xl">DC</p>
            <p className="font-bold text-white text-2xl">$0.6kW</p>
            <p className="font-bold text-white text-2xl">5</p>
          </div>
        </div>
      </div>
      </div>
      <div className="">
        <p className="text-lg font-medium text-white ml-6 ">Vehicle Stats</p>
        <img src={Car} alt="" className="h-64" />
        <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
          <div className="flex flex-col">
            <div>EV</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.car}</span>
              {" h"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Battery</div>
            <div className="flex gap-1 items-center">
              <span
                className={`text-3xl ${
                  evcar.battery > 50 ? "text-[#44DDA0]" : "text-[#B23434]"
                }`}
              >
                {evcar.battery}
              </span>
              {" %"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Range</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.range}</span>
              {" miles"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Temp</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.temp}</span>
              {" F"}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Stations;
