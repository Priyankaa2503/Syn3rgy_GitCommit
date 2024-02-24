
  /* <div className="flex gap-x-24 justify-center">
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
            <div className="w-full gap-x-12 text-[#575757] mt-5 flex justify-between items-center">
              <div className="flex flex-col">
                <div>Type</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.type}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div>Price</div>
                <div className="flex gap-1 items-center">
                  <span
                    className={`text-3xl ${
                      evcar.battery > 50 ? "text-[#44DDA0]" : "text-[#B23434]"
                    }`}
                  >
                    {evcar.price}
                  </span>
                  {" kW"}
                </div>
              </div>
              <div className="flex flex-col">
                <div>Slot</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.slot}</span>
                  {" miles"}
                </div>
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
            <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
              <div className="flex flex-col">
                <div>Type</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.type}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div>Price</div>
                <div className="flex gap-1 items-center">
                  <span
                    className={`text-3xl ${
                      evcar.battery > 50 ? "text-[#44DDA0]" : "text-[#B23434]"
                    }`}
                  >
                    {evcar.price}
                  </span>
                  {" kW"}
                </div>
              </div>
              <div className="flex flex-col">
                <div>Slot</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.slot}</span>
                  {" miles"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg font-medium text-white ml-6 ">Vehicle Stats</p>
          <img src={Car} alt="" className="h-64" />

          <div className="w-full text-[#575757] mt-5 flex  justify-between items-center">
            <div className="flex flex-col">
              <div>EV</div>
              <div className="flex gap-1 items-center">
                <span className="text-2xl text-white">{evcar.car}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div>Battery </div>
              <div className="flex gap-1 items-center">
                <span
                  className={`text-2xl ${
                    evcar.battery > 80 ? "text-[#44DDA0]" : "text-[#B23434]"
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
                <span className="text-2xl text-white">{evcar.range}</span>
                {" miles"}
              </div>
            </div>
            <div className="flex flex-col">
              <div>Temp</div>
              <div className="flex gap-1 items-center">
                <span className="text-2xl text-white">{evcar.temp}</span>
                {" F"}
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full p-6">
            <div className=" text-[#575757] mt-5 flex flex-col justify-between ">
              <div className="flex flex-col mt-2">
                <div>EV</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.car}</span>
                  {" h"}
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div>Battery Status</div>
                <div className="flex gap-1 items-center">
                  <span
                    className={`text-3xl ${
                      evcar.status === "Good"
                        ? "text-[#44DDA0]"
                        : "text-[#B23434]"
                    }`}
                  >
                    {evcar.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div>Range</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.range}</span>
                  {" miles"}
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <div>Temp</div>
                <div className="flex gap-1 items-center">
                  <span className="text-3xl text-white">{evcar.temp}</span>
                  {" F"}
                </div>
              </div>
            </div>
            <div className=" text-[#575757] mt-5 flex flex-col w-full text-right ">
              <div className="flex flex-col py-4">
                <div>Time left</div>
                <div className="flex gap-1 items-center justify-end">
                  <span className="text-3xl text-white">{evcar.time}</span>
                  {" min"}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 items-center justify-end">
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
              <img src={Car} alt="map" className="h-36" />
            </div>
          </div>

          <div className="w-full text-[#575757] mt-5 flex flex-col ">
            <div className="flex flex-col">
              <div>Average Time</div>
              <div className="flex gap-1 items-center">
                <span className="text-3xl text-white">{evcar.time}</span>
                {" min"}
              </div>
            </div>
            <Line />
          </div>
        </div>
      </div> 