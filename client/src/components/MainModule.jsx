import React, { useEffect, useState } from "react";
import { Dashboard, MyTrips, Stations, CarDetails } from "./sections";
import Icons from "./Icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CarbonFootprint from "./sections/CarbonFootprint";
import RewardSystem from "./sections/Rewards";
import Trip from "./sections/Trip";
const MainModule = ({ data, user, setUser, active, setIsLoggedIn }) => {
  const getSection = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard data={data} />;
      case "Stations":
        return <Stations />;
      case "Plan a Trip":
        return <MyTrips />;
      case "Car Details":
        return <CarDetails />;
        case "Carbon Footprint":
        return <CarbonFootprint />;
        case "My Trip":
        return <Trip  />;
    }
  };

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     setIsLoggedIn(true);
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //     navigate("/auth");
  //   } else {
  //     if (user === null) {
  //       setUser(JSON.parse(localStorage.getItem("user")));
  //     }
  //   }
  // }, []);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-5 gap-4">
      <div className="w-full h-32 flex justify-between items-center">
        <div className="text-3xl font-semibold">{active}</div>
        <div
          className="relative"
          onClick={() => {
            setShowModal(!showModal);
          }}
        >
          <div
            className={`px-4 flex relative cursor-pointer hover:bg-gray-300 hover:bg-opacity-15 items-center text-[#44DDA0] gap-2 py-2 ${
              showModal && "bg-opacity-15 bg-gray-300"
            } rounded-full w-fit`}
          >
            <Icons name="Account" width="20" height="20" color="#44DDA0" />
            <div className="text-lg font-semibold">{user?.name}</div>
          </div>
          {showModal && (
            <div className="absolute right-0 top-full w-32 text-sm px-4 py-2 h-fit bg-[#1c1c1c] rounded-lg shadow-lg flex flex-col gap-2 p-2">
              <div
                className="flex hover:bg-gray-300 hover:bg-opacity-15 p-2 rounded-lg items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  toast.success("Logged out successfully");
                  setShowModal(false);
                  setUser(null);
                  localStorage.removeItem("user");
                  navigate("/auth");
                }}
              >
                <Icons name="logout" width="20" height="20" color="white" />
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full overflow-y-auto">{getSection()}</div>
    </div>
  );
};

export default MainModule;
