import React, { useState } from "react";
import Icons from "../Icons";
import {MdOutlineElectricBolt} from "react-icons/md"
import StackedBar from "../../charts/StackedBar";

const ProgressBar = ({ title, value, max }) => {
  const cells = [];
  for (let i = 0; i < max; i++) {
    cells.push(
      <div
        key={i}
        className={`h-10 rounded-lg w-6 ${
          i < value ? "bg-[#44DDA0]" : "bg-[#575757]"
        }`}
      />
    );
  }
  return (
    <div className="flex w-fit gap-2 items-center justify-between my-2">
      <div className="flex p-2 bg-[#0F0F0F] rounded-lg gap-1">{cells}</div>
      <div className="flex flex-col">
        <div className="text-[#44DDA0] items-center text-lg font-semibold flex gap-2">
          {title}
          <MdOutlineElectricBolt size={20} color="#44DDA0" />
        </div>
        <div className="text-sm text-[#575757]">Total Spend</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 58,
    time: "5:21",
    powerReserve: 400,
  });
  const [gasSavings, setGasSavings] = useState("Year");
  const [showGasSavingsDropdown, setShowGasSavingsDropdown] = useState(false);
  const [charge, setCharge] = useState("Year");
  const [showChargeDropdown, setChargeDropdown] = useState(false);
  return (
    <div className="w-full gap-4 h-fit overflow-y-auto flex flex-col justify-center items-center">
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
      {/* Gas Savings */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">Gas Savings</div>
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowGasSavingsDropdown(true);
              }}
            >
              {gasSavings}
            </div>
            {showGasSavingsDropdown && (
              <div className="w-32 bg-[#0F0F0F] absolute top-full right-0 shadow-md rounded-xl z-10">
                <div
                  className="w-full h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setGasSavings("Year");
                    setShowGasSavingsDropdown(false);
                  }}
                >
                  Year
                </div>
                <div
                  className="w-full h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setGasSavings("Month");
                    setShowGasSavingsDropdown(false);
                  }}
                >
                  Month
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
          <div className="flex flex-col">
            <div>Saved Money</div>
            <div className="flex gap-1 items-center">
              {" $"}
              <span className="text-3xl text-white">1,716</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>Using Private</div>
            <div className="flex gap-1 items-center">
              {" $"}
              <span className="text-3xl text-white">259</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>m³, not burned</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar.powerReserve}</span>
              <div>
                {" 0"}
                <sub>2</sub>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-5">
          <ProgressBar title="CA$32" value={3} max={12} />
          <ProgressBar title="CA$57" value={7} max={12} />
        </div>
      </div>
      {/* Charge statistics */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">Charge statisticsx</div>
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setChargeDropdown(true);
              }}
            >
              {charge}
            </div>
            {showChargeDropdown && (
              <div className="w-32 bg-[#0F0F0F] absolute top-full right-0 shadow-md rounded-xl z-10">
                <div
                  className="w-full h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setCharge("Year");
                    setChargeDropdown(false);
                  }}
                >
                  Year
                </div>
                <div
                  className="w-full h-12 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setCharge("Month");
                    setChargeDropdown(false);
                  }}
                >
                  Month
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full text-[#575757] mt-5 grid gap-3 grid-cols-2 md:grid-cols-3 lg:flex justify-between items-center">
          <div className="flex flex-col">
            <div>Total Spent</div>
            <div className="flex gap-1 items-center">
              {" $"}
              <span className="text-3xl text-white">87</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>Total Charged`</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">324</span>
              {" kWh"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Total Time`</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">52</span>
              {" hr"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Visited stations</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">43</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>parking Time</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">11</span>
              {" hr"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Cycle Count</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">651</span>
            </div>
          </div>
        </div>
        <StackedBar/>
        <div className="flex flex-col gap-2 w-full mt-5">
          <ProgressBar title="CA$32" value={3} max={12} />
          <ProgressBar title="CA$57" value={7} max={12} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
