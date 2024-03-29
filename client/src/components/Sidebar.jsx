import React, { useEffect, useState } from "react";
import Icons from "./Icons";
import Car from "../assets/Car.png";
import AddEVModal from "./AddEVModal";

const Link = ({ name, active, setActive }) => {
  return (
    <div
      className={`rounded-lg hover:bg-gray-50 hover:bg-opacity-15 ${
        active === name ? "text-[#44DDA0]" : "text-white"
      } px-4 py-3 cursor-pointer flex items-center gap-3 transition-all duration-200`}
      onClick={() => {
        setActive(name);
        localStorage.removeItem("activeCar");
      }}
    >
      <Icons
        name={name}
        width={20}
        height={20}
        color={active === name ? "#44DDA0" : "white"}
      />
      {name}
    </div>
  );
};

const CarCard = ({ car, model, battery, range, setActive }) => {
  return (
    <div
      className="w-full flex flex-col items-center gap-3 p-2 bg-[#0F0F0F] rounded-lg cursor-pointer transition-all duration-200"
      onClick={() => {
        setActive("Car Details");
        localStorage.setItem(
          "activeCar",
          JSON.stringify({ car, model, battery, range })
        );
      }}
    >
      <div className="flex px-3 w-full justify-between items-center">
        <img src={Car} alt="" className="w-fit h-16" />
        <div className="flex flex-col gap-1">
          <div>{car}</div>
          <div className="text-[#575757]">{model}</div>
        </div>
      </div>
      <div className="h-[0.5px] w-[96%] bg-gray-500 bg-opacity-50" />
      <div className="flex w-full px-5 justify-evenly">
        <div className="flex flex-col w-full">
          <div className="font-semibold text-sm text-[#575757]">Battery</div>
          <div
            className={`${battery > 50 ? "text-[#44DDA0]" : "text-[#B23434]"}`}
          >
            {battery}%
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="font-semibold text-sm text-[#575757]">Range</div>
          <div>{range}</div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ data, getData, active, setActive }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-[22rem] overflow-x-hidden relative bg-[#141414] overflow-y-auto h-full">
      <div className="text-2xl gap-2 py-16 w-full flex items-center justify-center">
        <div className="font-extrabold flex items-center gap-1 text-[#44DDA0]">
          <Icons name="thunder" width={24} height={24} color={"#44DDA0"} />
          VOLT
        </div>
        <div>VOYAGE</div>
      </div>
      <div className="h-[0.5px] w-full bg-gray-500 bg-opacity-50" />
      <div className="flex flex-col w-full px-5 py-12 gap-2">
        <Link name="Dashboard" active={active} setActive={setActive} />
        <Link name="Stations" active={active} setActive={setActive} />
        <Link name="Plan a Trip" active={active} setActive={setActive} />
        <Link name="My Trip" active={active} setActive={setActive} />
        <Link name="Carbon Footprint" active={active} setActive={setActive} />
        {/* <Link name="Subscription Plan" active={active} setActive={setActive} /> */}
      </div>
      <div className="w-full p-5 flex flex-col gap-5">
        <div className="items-center w-full flex justify-between font-bold">
          <div>My Cars</div>
          <div
            className="rounded-full cursor-pointer hover:bg-gray-50 hover:bg-opacity-15"
            onClick={handleOpenModal}
          >
            <Icons name="add" width={20} height={20} color="white" />
          </div>
        </div>
        {/* <CarCard car="Nissan" model="Model 3" battery={23} range="300 mi" /> */}
        {data?.evs !== null &&
          data?.evs?.map((ev, idx) => {
            return (
              <CarCard
                key={idx}
                car={ev.evName}
                model={ev.evModel}
                battery={ev.evBatteryCapacity}
                range={ev.evRange}
                setActive={setActive}
              />
            );
          })}
        <AddEVModal
          isOpen={isModalOpen}
          getData={getData}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Sidebar;
