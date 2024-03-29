import React, { useEffect, useState } from "react";
import Icons from "../Icons";
import { MdOutlineElectricBolt } from "react-icons/md";
import GasStation from "../../assets/teslaCity-a2bda4ca.png";
import StackedBar from "../../charts/StackedBar";
import axios from "axios";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";

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
  const data = JSON.parse(localStorage.getItem("data"));
  const cars = data?.evs;
  const [evcar, setEvcar] = useState(cars ? cars[0] : null);

  // const getCarData = async () => {
  //   const userId = JSON.parse(localStorage.getItem("user"))?.id;
  //   axios
  //     .get(`http://localhost:5000/evs/${userId}`)
  //     .then((res) => {
  //       setCars(res.data);
  //       setEvcar(res.data[0]);
  //     })
  //     .catch((err) => {
  //       toast.error("Failed to fetch car data");
  //     });
  // };

  const [gasSavings, setGasSavings] = useState("Year");
  const [showGasSavingsDropdown, setShowGasSavingsDropdown] = useState(false);
  const [charge, setCharge] = useState("Year");
  const [showChargeDropdown, setChargeDropdown] = useState(false);

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

  // const [stations, setStations] = useState([]);

  const getStationDetails = async () => {
    try {
      // const res = await axios.get(
      //   `https://places.googleapis.com/v1/places/${stationId}?fields=id,displayName,formattedAddress&key=AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg`
      // );
      // return res.data;
      const url = "https://places.googleapis.com/v1/places:searchNearby";
      const apiKey = "AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg"; // replace with your API key

      const data = {
        includedTypes: ["electric_vehicle_charging_station"],
        maxResultCount: 10,
        locationRestriction: {
          circle: {
            center: {
              latitude: 37.7937,
              longitude: -122.3965,
            },
            radius: 200.0,
          },
        },
      };
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "*",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const data = await res.json();
          setGoogleStations(data.places);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      toast.error("Failed to fetch station details");
    }
  };

  const getStationsData = async () => {
    try {
      axios
        .get("http://localhost:5000/stations")
        .then((res) => {
          setBackendStations(res.data);
        })
        .catch((err) => {
          toast.error("Error:", err);
        });
    } catch (err) {
      toast.error("Failed to fetch stations data");
    }
  };

  // const stations = {
  //   favourite: [
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today, 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //   ],
  //   all: [
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //     {
  //       name: "Tesla Station",
  //       location: "1780 N Beale Rd, Marysville",
  //       ports: 4,
  //       parkingFee: 0.1,
  //       power: 0.5,
  //       arrivalTime: "Today 12:00",
  //       departureTime: "Today, 15:00",
  //     },
  //   ],
  // };

  const [stationType, setStationType] = useState("Favourite");
  // const [stationData, setStationData] = useState([]);

  const [googleStations, setGoogleStations] = useState([]);
  const [backendStations, setBackendStations] = useState([]);

  const [dataToDisplay, setDataToDisplay] = useState([]);

  const getDetails = (stationId) => {
    const s = googleStations?.filter((station) => station.id === stationId);
    return s[0];
  };

  useEffect(() => {
    if (stationType === "Favourite") {
      const sortedStations = [...backendStations].sort(
        (a, b) => b.noOfVisits - a.noOfVisits
      );
      const topTwoStations = sortedStations.slice(0, 2);
      setDataToDisplay(topTwoStations);
    } else {
      setDataToDisplay(backendStations);
    }
  }, [stationType, backendStations]);

  useEffect(() => {
    getStationsData();
    getStationDetails();
  }, []);

  const calculateTimeRemaining = (batteryPercentage, powerReserve) => {
    const consumptionRate = 10; // 10 km per hour
    const timeRemaining =
      (batteryPercentage / 100) * (powerReserve / consumptionRate);
    return timeRemaining.toFixed(2); // return time remaining in hours with two decimal places
  };
  const chargingWidth = `${evcar?.evBatteryCapacity}%`;
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
    evcar?.evPowerReserve,
    electricityCost
  );
  const fuelSaved = calculateCO2Saved(evcar?.evPowerReserve, emissionFactor);

  useEffect(() => {
    // Update the time remaining whenever the battery or type of vehicle changes
    const timeRemaining = calculateTimeRemaining(
      evcar?.evBatteryCapacity,
      evcar?.evPowerReserve
    );
    setEvcar((prevState) => ({ ...prevState, time: timeRemaining }));
  }, [evcar?.evBatteryCapacity, evcar?.evName, evcar?.evPowerReserve]);

  const [bookingModal, setBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  return (
    <div className="w-full gap-4 h-fit overflow-y-auto flex flex-col justify-center items-center">
      {/* ev cars section */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">EV cars</div>
          <div className="flex justify-center items-center gap-4">
            {/* <div
              className={`transition-all cursor-pointer duration-200 ${
                evcar?.car === "Nissan" ? "text-[#44DDA0]" : "text-[#575757]"
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
                evcar?.car === "Tesla" ? "text-[#44DDA0]" : "text-[#575757]"
              }`}
              onClick={() => {
                setEvcar({
                  car: data?.evName,
                  battery: data?.evBatteryCapacity,
                  time: "2:21",
                  powerReserve: data?.evPowerReserve,
                });
              }}
            >
              {data?.evName}
            </div> */}
            {cars?.map((car, index) => {
              return (
                <div
                  key={index}
                  className={`transition-all cursor-pointer duration-200 ${
                    evcar?.evName === car.evName
                      ? "text-[#44DDA0]"
                      : "text-[#575757]"
                  }`}
                  onClick={() => {
                    let d = JSON.parse(localStorage.getItem("data"))?.evs;
                    setEvcar(d?.filter((c) => c.evName === car.evName)[0]);
                  }}
                >
                  {car.evName}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
          <div className="flex flex-col">
            <div>Time</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">{evcar?.time}</span>
              {" h"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Battery</div>
            <div className="flex gap-1 items-center">
              <span
                className={`text-3xl ${
                  evcar?.evBatteryCapacity > 50
                    ? "text-[#44DDA0]"
                    : "text-[#B23434]"
                }`}
              >
                {evcar?.evBatteryCapacity}
              </span>
              {" %"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Power Reserve</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">
                {evcar?.evPowerReserve}
              </span>
              {" mi"}
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
                  <span className="text-2xl text-white">{evcar?.time}</span>
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
          <ProgressBar title="$32" value={3} max={12} />
          <ProgressBar title="$57" value={7} max={12} gasEqual={true} />
        </div>
      </div>
      {/* Charge statistics */}
      <div className="w-full p-8 shadow-md shadow-[#00000040] rounded-xl bg-[#141414]">
        <div className="w-full items-center justify-between flex">
          <div className="text-lg font-semibold">Monthly Charge Statistics</div>
          <div className="relative">
            {/* <div
              className="cursor-pointer"
              onClick={() => {
                setChargeDropdown(true);
              }}
            >
              {charge}
            </div> */}
            {/* {showChargeDropdown && ( */}

            {/* )} */}
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
            <div>Total Charged</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">324</span>
              {" kWh"}
            </div>
          </div>
          <div className="flex flex-col">
            <div>Total Time</div>
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
            <div>Parking Time</div>
            <div className="flex gap-1 items-center">
              <span className="text-3xl text-white">11</span>
              {" hr"}
            </div>
          </div>
        </div>
        <StackedBar />
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
          {dataToDisplay?.map((station, index) => {
            const details = getDetails(station.stationId);
            return (
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
                    <div className="font-semibold">
                      {details?.displayName?.text}
                    </div>
                    <div className="text-[#575757] text-xs">
                      {details?.shortFormattedAddress}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-[#575757] text-xs">
                        Ports available
                      </div>
                      <div className="text-white text-sm">
                        {details?.evChargeOptions?.connectorCount}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[#575757] text-xs">
                        Number of visits
                      </div>
                      <div className="text-white text-sm">
                        {station?.noOfVisits}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid w-full text-sm grid-cols-2 gap-2 justify-center items-center">
                  <div className="flex flex-col">
                    <div className="text-[#575757]">Parking Fee</div>
                    <div className="text-white text-base">
                      {"$ "}
                      {station?.parkingFee}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#575757]">Slot Timing: Start</div>
                    <div className="text-white text-base">12:25 PM</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#575757]">Per kwh</div>
                    <div className="text-white text-base">
                      {"$ "}
                      {station?.perkWh}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#575757]">Slot Timing: End</div>
                    <div className="text-white text-base">12:32 PM</div>
                  </div>
                </div>
                <div className="w-1/2 h-full flex flex-col gap-2 items-center justify-center">
                  <div
                    className="bg-[#44DBA0] hover:bg-opacity-85 cursor-pointer rounded-lg w-full py-2 px-3 flex items-center justify-center"
                    onClick={() => {
                      setBookingModal(true);
                      setBookingData(station);
                    }}
                  >
                    Book
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {bookingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setBookingModal(false)}
          ></div>
          <div className="bg-white w-96 p-6 rounded-lg flex justify-center flex-col shadow-lg relative z-10">
            {/* <img src="https://img.freepik.com/premium-vector/loyalty-program-getting-gift-reward-flat-illustration_169533-11.jpg?w=180" />{" "} */}
            <div className="text-[#44DBA0] text-2xl font-bold">
              Confirm Booking?
            </div>
            <p className="mb-4 mt-4 font-semibold text-black">
              Are you sure you want to book this station?
            </p>
            <div className="w-full gap-2 flex justify-center items-center">
              <button
                className="text-[#44DBA0] w-full hover:bg-gray-100 px-4 py-2 rounded"
                onClick={() => setBookingModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-[#44DBA0] hover:bg-opacity-90 w-full text-white px-4 py-2 rounded"
                onClick={() => {
                  toast.success(
                    "Booking details sent to registed mobile device!"
                  );
                  axios
                    .post("http://localhost:5000/send-email")
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  setBookingModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
