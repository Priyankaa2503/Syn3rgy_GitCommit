/* global google */
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt, MdCancelPresentation } from "react-icons/md";
import Car from "../../assets/Car.png";
import Line from "../../charts/Line";

const Stations = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 58,
    time: "5:21",
    powerReserve: 400,
    range: 340,
    temp: 75.2,
    type: "DC",
    slot: 5,
    price: 60,
    status: "Good",
  });
  let map;
  const [places, setPlaces] = useState([]); // Add this line
  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
      // addMarker();
      getNearbyStations({ latitude: 37.7937, longitude: -122.3965 }, map);
    };
    document.head.appendChild(script);

    // Clean up the script tag on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: { lat: 37.7937, lng: -122.3965 },
    });

    new google.maps.Circle({
      strokeColor: "#44DDA0",
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: "#44DDA0",
      fillOpacity: 0.35,
      map,
      center: { lat: 37.7937, lng: -122.3965 },
      radius: 500,
    });
  }

  function addMarker(coords) {
    console.log("Adding marker at:", coords);
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
    });
  }

  const getNearbyStations = (userLocation, map) => {
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
          radius: 500.0,
        },
      },
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        data.places.forEach((place) => {
          addMarker({
            lat: place.location.latitude,
            lng: place.location.longitude,
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      Stations
      <div className="p-6 rounded-lg">
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
      </div>
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
    </div>
  );
};

export default Stations;
