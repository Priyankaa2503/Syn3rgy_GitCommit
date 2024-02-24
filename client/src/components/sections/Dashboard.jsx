import React, { useEffect, useState } from "react";
import Icons from "../Icons";
import { MdOutlineElectricBolt } from "react-icons/md";
import GasStation from "../../assets/teslaCity-a2bda4ca.png";
import StackedBar from "../../charts/StackedBar";

const ProgressBar = ({ title, value, max, gasEqual }) => {
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
        <div className="text-sm text-[#575757]">
          {gasEqual ? "Gas Equal" : "Total Spend"}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 40,
    time: "5:21",
    powerReserve: 400,
  });
  const [gasSavings, setGasSavings] = useState("Year");
  const [showGasSavingsDropdown, setShowGasSavingsDropdown] = useState(false);
  const [charge, setCharge] = useState("Year");
  const [showChargeDropdown, setChargeDropdown] = useState(false);

  const stations = {
    favourite: [
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today, 12:00",
        departureTime: "Today, 15:00",
      },
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
    ],
    all: [
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
      {
        name: "Tesla Station",
        location: "1780 N Beale Rd, Marysville",
        ports: 4,
        parkingFee: 0.1,
        power: 0.5,
        arrivalTime: "Today 12:00",
        departureTime: "Today, 15:00",
      },
    ],
  };
  const calculateGasSavings = (distanceTraveled, fuelEfficiency, fuelCost) => {
    const fuelConsumed = distanceTraveled / fuelEfficiency;
    const savedMoney = fuelConsumed * fuelCost;
    return savedMoney.toFixed(2); // return the saved money with two decimal places
  };

  const distanceTraveled = 1000; // in kilometers
  const fuelEfficiency = 15; // in kilometers per liter
  const fuelCost = 2; // in dollars per liter
  const savedMoney = calculateGasSavings(
    distanceTraveled,
    fuelEfficiency,
    fuelCost
  );
  const [stationType, setStationType] = useState("Favourite");
  const [stationData, setStationData] = useState([]);
  useEffect(() => {
    if (stationType === "Favourite") {
      setStationData(stations.favourite);
    } else {
      setStationData(stations.all);
    }
  }, [stationType]);

  const calculateTimeRemaining = (batteryPercentage, powerReserve) => {
    const consumptionRate = 10; // 10 km per hour
    const timeRemaining =
      (batteryPercentage / 100) * (powerReserve / consumptionRate);
    return timeRemaining.toFixed(2); // return time remaining in hours with two decimal places
  };
  const chargingWidth = `${evcar.battery}%`;
  const calculateUsingPrivate = (powerConsumption, electricityCost) => {
    return (powerConsumption * electricityCost).toFixed(2); // Returns the cost in dollars
  };

  // Function to calculate the amount of CO2 emissions saved
  const calculateCO2Saved = (powerConsumption, emissionFactor) => {
    const CO2Saved = powerConsumption * emissionFactor;
    // Assuming 1 kgCO2 is equivalent to approximately 0.554 m³ of burned fuel
    const fuelSaved = CO2Saved * 0.554;
    return fuelSaved.toFixed(2); // Returns the amount of fuel saved in m³
  };

  // Assumed values for electricity cost and emission factor
  const electricityCost = 0.12; // $/kWh
  const emissionFactor = 0.5; // kgCO2/kWh (example value)

  const usingPrivateCost = calculateUsingPrivate(
    evcar.powerReserve,
    electricityCost
  );
  const fuelSaved = calculateCO2Saved(evcar.powerReserve, emissionFactor);

  useEffect(() => {
    // Update the time remaining whenever the battery or type of vehicle changes
    const timeRemaining = calculateTimeRemaining(
      evcar.battery,
      evcar.powerReserve
    );
    setEvcar((prevState) => ({ ...prevState, time: timeRemaining }));
  }, [evcar.battery, evcar.car, evcar.powerReserve]);

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
              style={{ width: chargingWidth }}
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
              <span className="text-3xl text-white">{savedMoney}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>Using Private</div>
            <div className="flex gap-1 items-center">
              {" $"}
              <span className="text-3xl text-white">{usingPrivateCost}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div>m³, not burned</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{fuelSaved}</span>
              <div>
                {" 0"}
                <sub>2</sub>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full mt-5">
          <ProgressBar title="CA$32" value={3} max={12} />
          <ProgressBar title="CA$57" value={7} max={12} gasEqual={true} />
        </div>
      </div>
      {/* Charge statistics */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">Charge statistics</div>
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
        <StackedBar />
        <div className="flex flex-col gap-2 w-full mt-5">
          <ProgressBar title="CA$32" value={3} max={12} />
          <ProgressBar title="CA$57" value={7} max={12} />
        </div>
      </div>
      {/* Stations list */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">Stations list</div>
          <div className="flex justify-center items-center gap-4">
            <div
              className={`transition-all cursor-pointer duration-200 ${
                stationType === "Favourite"
                  ? "text-[#44DDA0]"
                  : "text-[#575757]"
              }`}
              onClick={() => {
                setStationType("Favourite");
              }}
            >
              Favourite
            </div>
            <div
              className={`transition-all cursor-pointer duration-200 ${
                stationType === "All" ? "text-[#44DDA0]" : "text-[#575757]"
              }`}
              onClick={() => {
                setStationType("All");
              }}
            >
              All
            </div>
          </div>
        </div>
        <div className="w-full mt-5 gap-3 flex flex-col h-full">
          {stationData.map((station, index) => (
            <div
              key={index}
              className="w-full p-4 my-2 shadow-md shadow-[#00000040] rounded-xl bg-[#0F0F0F] flex justify-between items-center"
            >
              <div className="w-1/2">
                <img
                  src={GasStation}
                  alt=""
                  className="w-20 h-20 shadow-md shadow-black rounded-lg"
                />
              </div>
              <div className="flex w-full items-start flex-col gap-3">
                <div className="flex flex-col">
                  <div className="font-semibold">{station.name}</div>
                  <div className="text-[#575757] text-xs">
                    {station.location}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[#575757] text-xs">Ports available</div>
                  <div className="text-white text-sm">{station.ports}</div>
                </div>
              </div>
              <div className="grid w-full text-sm grid-cols-2 gap-2 justify-center items-center">
                <div className="flex flex-col">
                  <div className="text-[#575757]">Parking Fee</div>
                  <div className="text-white text-base">
                    {"$ "}
                    {station.parkingFee}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#575757]">Arrival</div>
                  <div className="text-white text-base">
                    {station.arrivalTime}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#575757]">Per kwh</div>
                  <div className="text-white text-base">
                    {"$ "}
                    {station.power}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#575757]">Departure</div>
                  <div className="text-white text-base">
                    {station.departureTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
