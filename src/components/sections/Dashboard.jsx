import React, { useState } from "react";
import Icons from "../Icons";

const Dashboard = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 58,
    time: "5:21",
    powerReserve: 400,
  });
  return (
    <div className="w-full overflow-y-auto gap-4 h-full flex flex-col justify-center items-center">
      {/* ev cars section */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">EV cars</div>
          <div className="flex justify-center items-center gap-4">
            <div
              className={`transition-all cursor-pointer duration-200 ${
                evcar.car === "Nissan" ? "text-[#44DDA0]" : "text-[#575757]"
              }`}
              onClick={() => {
                setEvcar({
                  car: "Nissan",
                  battery: 58,
                  time: "5:21",
                  powerReserve: 300,
                });
              }}
            >
              Nissan
            </div>
            <div
              className={`transition-all cursor-pointer duration-200 ${
                evcar.car === "Tesla" ? "text-[#44DDA0]" : "text-[#575757]"
              }`}
              onClick={() => {
                setEvcar({
                  car: "Tesla",
                  battery: 23,
                  time: "2:21",
                  powerReserve: 100,
                });
              }}
            >
              Tesla
            </div>
          </div>
        </div>
        <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
          <div className="flex flex-col">
            <div>Time</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.time}</span>
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
            <div>Power Reserve</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.powerReserve}</span>
              {" km"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-5">
          <div className="flex gap-2 items-center text-[#44DDA0]">
            <Icons name="thunder" width={16} height={16} color={"#44DDA0"} />
            <span>Charging</span>
          </div>
          <div className="w-1/2 h-16 rounded-lg bg-[#0F0F0F] relative">
            <div
              className="h-full transition-all duration-500 rounded-lg bg-gradient-to-r from-[#44DDA0] to-[#84e1bc] absolute top-0 left-0"
              style={{ width: `${evcar.battery}%` }}
            />
            <div className="absolute top-0 right-5 flex items-center justify-center h-full text-white">
              <div className="flex flex-col text-[#575757]">
                <div className="flex justify-center gap-1 items-center">
                  <span className="text-2xl text-white">{evcar.time}</span>
                  {" h"}
                </div>
                <div className="text-sm">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
