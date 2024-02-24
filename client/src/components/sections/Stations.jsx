/* global google */
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt, MdCancelPresentation } from "react-icons/md";
import Car from "../../assets/Car.png";
import EV from "../../assets/evicon.png";
import Line from "../../charts/Line";
import { BsLightningChargeFill } from "react-icons/bs";
import { RiGasStationFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";

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
  const [stations, setStations] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [estimatedTimeInTraffic, setEstimatedTimeInTraffic] = useState("");
  const [estimatedDistance, setEstimatedDistance] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

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

    new google.maps.Marker({
      position: { lat: 37.7937, lng: -122.3965 },
      map: map,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });
  }

  function addMarker(station) {
    console.log("Adding marker for station:", station);
    var marker = new google.maps.Marker({
      position: {
        lat: station.location.latitude,
        lng: station.location.longitude,
      },
      map: map,
      icon: {
        url: EV,
        scaledSize: new google.maps.Size(50, 70),
      },
    });
    console.log(station.formattedAddress);
    var infowindow = new google.maps.InfoWindow({
      content: `<div style='height:100px; width:200px; color:black'>
      ${station.formattedAddress}<br>
      Open Now: ${station?.currentOpeningHours?.openNow}<br>
      Open: Day ${station?.currentOpeningHours?.periods[0]?.open?.day}, Hour ${
        station?.currentOpeningHours?.periods[0]?.open?.hour
      }, Minute ${station?.currentOpeningHours?.periods[0]?.open?.minute}<br>
      Close: Day ${
        station?.currentOpeningHours?.periods[0]?.close?.day
      }, Hour ${
        station?.currentOpeningHours?.periods[0]?.close?.hour
      }, Minute ${station?.currentOpeningHours?.periods[0]?.close?.minute}
       Weekday Descriptions:<br>
      ${station?.currentOpeningHours?.weekdayDescriptions?.join("<br>")}
    </div>`,
    });

    marker.addListener("click", function () {
      infowindow.open(map, marker);
      console.log(station.formattedAddress);
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
          radius: 200.0,
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
        setStations(data.places); // save the places to state
        data.places.forEach((place) => {
          addMarker(place);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const formatPrimaryType = (primaryType) => {
    if (!primaryType) return "";
    return primaryType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getDirections = async (origin, destination) => {
    const apiKey = "AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg";
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Set up map if not already initialized
    if (!map) {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: { lat: 37.7937, lng: -122.3965 },
      });
    }

    // Configure DirectionsRenderer to render on map
    directionsRenderer.setMap(map);

    // Convert origin and destination to LatLng objects
    const originLatLng = new google.maps.LatLng(
      origin.latitude,
      origin.longitude
    );
    const destinationLatLng = new google.maps.LatLng(
      destination.latitude,
      destination.longitude
    );

    // Configure directions request
    // const request = {
    //   origin: originLatLng,
    //   destination: destinationLatLng,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // };

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    const request = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(), // for the current time
        trafficModel: "pessimistic",
      },
    };

    // Request directions
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const route = response.routes[0];
        const estimatedTimeInTraffic = route.legs[0].duration_in_traffic.text;
        const estimatedTime = route.legs[0].duration.text;
        const estimatedDistance = route.legs[0].distance.text;
        setEstimatedTime(estimatedTime);
        setEstimatedTimeInTraffic(estimatedTimeInTraffic);
        setEstimatedDistance(estimatedDistance);
        directionsRenderer.setDirections(response);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  };

  return (
    <div className="w-full h-full">
      <div
        className="h-full rounded-lg overflow-hidden"
        style={{ position: "relative" }}
      >
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
        {estimatedDistance && estimatedTime && estimatedTimeInTraffic && (
          <div
            style={{
              position: "absolute",
              top: 36,
              right: 12,
              overflow: "auto",
              color: "black",
              backgroundColor: "rgba(0,0,0)",
            }}
            className="rounded-xl p-4 "
          >
            <p className="text-white">
              Estimated Time:{" "}
              <span className="text-[#44dba0]">{estimatedTime}</span>
            </p>
            <p className="text-white">
              Estimated Time in Traffic:{" "}
              <span className="text-[#44dba0]">{estimatedTimeInTraffic}</span>
            </p>
            <p className="text-white">
              Estimated Distance:{" "}
              <span className="text-[#44dba0]">{estimatedDistance}</span>
            </p>
          </div>
        )}
        <div
          className="h-full overflow-y-auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "33.33%",
            // height: "900px",
            overflow: "auto",
            color: "black",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          {stations?.map((station, index) => (
            <div
              className="text-white p-5 rounded-md overflow-x-hidden flex flex-col  bg-black border-2 border-white"
              key={index}
            >
              <div className="flex justify-between items-center">
                <a
                  className="mt-2 font-medium text-md"
                  href={station?.websiteUri}
                >
                  {station?.displayName?.text}
                </a>
                <p className="text-[#44dba0] flex">
                  <RiGasStationFill className="mr-2" size={24} />
                  {station?.evChargeOptions?.connectorCount}
                </p>
              </div>
              <p className="my-2 text-[#575757] font-medium text-sm">
                {formatPrimaryType(station?.primaryType)}
              </p>{" "}
              <div className="flex items-center">
                <BsLightningChargeFill
                  className="mr-2 text-[#44dba0]"
                  size={20}
                />
                <p className="">{station?.formattedAddress}</p>
              </div>
              <p>{station?.currentOpeningHours?.openNow}</p>
              <p className="my- text-[#44dba0]">Open 24 Hours</p>
              <div className="flex items-center">
                <FaPhoneAlt size={16} />
                <p className="my-2 ml-2">{station?.internationalPhoneNumber}</p>
              </div>
              {/* <p>{station?.websiteUri}</p> */}
              {station?.evChargeOptions?.connectorAggregation?.map(
                (connector, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-md mb-4">
                    <p className="text-[#44dba0]">
                      Type: {formatPrimaryType(connector.type)}
                    </p>
                    <p className="text-[#44dba0]">
                      Max Charge Rate: {connector.maxChargeRateKw} kW
                    </p>
                    {connector.availabilityLastUpdateTime && (
                      <p className="text-white text-sm">
                        Last Update Time: {connector.availabilityLastUpdateTime}
                      </p>
                    )}
                  </div>
                )
              )}
              <button
                type="submit"
                className="bg-[#44dba0] text-white rounded-md px-4 py-2 mr-2"
                onClick={() =>
                  getDirections(
                    { latitude: 37.7937, longitude: -122.3965 },
                    {
                      latitude: station?.location?.latitude,
                      longitude: station?.location?.longitude,
                    }
                  )
                }
              >
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-24 justify-center mt-20">
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
