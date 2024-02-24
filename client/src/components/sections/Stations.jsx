/* global google */
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt, MdCancelPresentation } from "react-icons/md";
import Car from "../../assets/Car.png";

const Stations = () => {
  const [evcar, setEvcar] = useState({
    car: "Nissan",
    battery: 58,
    time: "5:21",
    powerReserve: 400,
    range: 340,
    temp: 75.2,
  });
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]); // Add this line
useEffect(() => {
  // Load the Google Maps script
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = () => {
    initMap();
    getNearbyStations({ latitude: 37.7937, longitude: -122.3965 }, map);
  };
  document.head.appendChild(script);

  // Clean up the script tag on component unmount
  return () => {
    document.head.removeChild(script);
  };
}, []);
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 37.7937, lng: -122.3965 },
    });

    new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat: 37.7937, lng: -122.3965 },
      radius: 500,
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
           console.log(
             "Latitude:",
             place.location.latitude,
             "Longitude:",
             place.location.longitude
           );
           const myLatlng = new google.maps.LatLng(
             place.location.latitude,
             place.location.longitude
           );
           const marker = new google.maps.Marker({
             position: myLatlng,
             title: place.name,
           });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<h2>${place.name}</h2><p>${place.formattedAddress}</p>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
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
      {/* {places.map(
        (
          place // Render the places data
        ) => (
          <div className="text-white">
            <h2>{place.displayName.text}</h2>
            <p>{place.formattedAddress}</p>
            <p>Rating: {place.rating}</p>
            <p>Phone: {place.internationalPhoneNumber}</p>
            <p>
              Website: <a href={place.websiteUri}>{place.websiteUri}</a>
            </p>
            <p>
              Accessibility:{" "}
              {place.accessibilityOptions.wheelchairAccessibleParking
                ? "Wheelchair Accessible Parking"
                : "No Wheelchair Accessible Parking"}
            </p>
            <p>Business Status: {place.businessStatus}</p>
            {/* Add more fields as needed */}
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
            <div className="flex flex-col my-4">
              <div className="flex gap-x-12 justify-between">
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Type</p>
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Price</p>
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Slot</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-white text-2xl">DC</p>
                <p className="font-bold text-white text-2xl">$0.6kW</p>
                <p className="font-bold text-white text-2xl">5</p>
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
            <div className="flex flex-col my-4">
              <div className="flex gap-x-12 justify-between">
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Type</p>
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Price</p>
                <p className="font-semibold text-[#FFFFFF4D] text-lg">Slot</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-white text-2xl">DC</p>
                <p className="font-bold text-white text-2xl">$0.6kW</p>
                <p className="font-bold text-white text-2xl">5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg font-medium text-white ml-6 ">Vehicle Stats</p>
          <img src={Car} alt="" className="h-64" />
          <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
            <div className="flex flex-col">
              <div>EV</div>
              <div className="flex gap-1 items-center">
                <span className="text-3xl text-white">{evcar.car}</span>
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
              <div>Range</div>
              <div className="flex gap-1 items-center">
                <span className="text-3xl text-white">{evcar.range}</span>
                {" miles"}
              </div>
            </div>
            <div className="flex flex-col">
              <div>Temp</div>
              <div className="flex gap-1 items-center">
                <span className="text-3xl text-white">{evcar.temp}</span>
                {" F"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;
