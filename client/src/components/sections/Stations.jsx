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
    const apiKey =  "AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg"; 
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
    const originLatLng = new google.maps.LatLng(origin.latitude, origin.longitude);
    const destinationLatLng = new google.maps.LatLng(destination.latitude, destination.longitude);
  
    // Configure directions request
    const request = {
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: google.maps.TravelMode.DRIVING
    };
  
    // Request directions
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Display the route on the map
        directionsRenderer.setDirections(response);
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  };
  
  

  return (
    <div style={{ position: "relative" }}>
      <div id="map" style={{ height: "900px", width: "100%" }}></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "33.33%",
          height: "900px",
          overflow: "auto",
          color: "black",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
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
            {/* <p className="py-4">
              {Object.entries(
                station?.currentOpeningHours?.weekdayDescriptions || {}
              ).map(([day, hours]) => (
                <span key={day} className="text-sm py-2 text-[#8d8787]">
                  {hours}
                  <br />
                </span>
              ))}
            </p> */}
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
  );
};

export default Stations;
