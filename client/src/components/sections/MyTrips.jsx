import React, { useState } from "react";

const MyTrips = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    speed: 350,
    parking: "free",
    chargers: 4,
    cost: "0.59",
    plugs: "ccs",
  });
  return (
    <>
      <div className="py-10 container mx-auto px-32">
        <div className="relative">
          <div
            className="border-r-4 border-gray-400 absolute h-full top-0"
            style={{ left: "9px" }}
          ></div>
          <ul className="list-none m-0 p-0">
            <li className="mb-5  ">
              <div className="flex group items-center max-w-[80%]">
                <div className="bg-[#44DDA0] group-hover:bg-red-700 z-10 rounded-full border-4 border-black  h-5 w-5">
                  <div className="bg-black h-1 w-6 items-center  ml-4 mt-1"></div>
                </div>
                <div className="flex-1 ml-4 z-10 font-medium">
                  <div className="order-1 space-y-2  rounded-lg shadow-only transition-ease  px-6 py-4">
                    <h3 className="mb-3 font-bold text-white text-2xl">
                      Tesla Station
                    </h3>
                    <p className="pb-4 text-sm text-gray-100">
                      1780 N Beale Rd, Marysville
                    </p>
                    <hr />
                    <div className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                      <div className="w-full text-[#575757] mt-5 grid grid-cols-3 gap-3 justify-start items-center">
                        <div className="flex  justify-start flex-col">
                          <div className="items-center mr-2">
                            Charging Speed
                          </div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.speed}
                            </span>
                            {" kW"}
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Parking</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.parking}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Chargers</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.chargers}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Cost</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.cost}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Plugs</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.plugs}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="mb-5  ">
              <div className="flex group items-center max-w-[80%]">
                <div className="bg-[#44DDA0] group-hover:bg-red-700 z-10 rounded-full border-4 border-black  h-5 w-5">
                  <div className="bg-black h-1 w-6 items-center  ml-4 mt-1"></div>
                </div>
                <div className="flex-1 ml-4 z-10 font-medium">
                  <div className="order-1 space-y-2  rounded-lg shadow-only transition-ease  px-6 py-4">
                    <h3 className="mb-3 font-bold text-white text-2xl">
                      Tesla Station
                    </h3>
                    <p className="pb-4 text-sm text-gray-100">
                      1780 N Beale Rd, Marysville
                    </p>
                    <hr />
                    <div className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                      <div className="w-full text-[#575757] mt-5 grid grid-cols-3 gap-3 justify-start items-center">
                        <div className="flex  justify-start flex-col">
                          <div className="items-center mr-2">
                            Charging Speed
                          </div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.speed}
                            </span>
                            {" kW"}
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Parking</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.parking}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Chargers</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.chargers}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Cost</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.cost}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start flex-col">
                          <div className="items-center mr-2">Plugs</div>
                          <div className="flex gap-1 items-center">
                            <span className="text-xl text-white">
                              {evcar.plugs}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyTrips;
