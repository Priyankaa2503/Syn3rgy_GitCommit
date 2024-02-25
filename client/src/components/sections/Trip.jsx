/* global google */
import { useEffect, useState } from "react";
import { MdOutlineElectricBolt, MdCancelPresentation } from "react-icons/md";
import Car from "../../assets/Car.png";
import EV from "../../assets/evicon.png";
import Line from "../../charts/Line";
import { BsLightningChargeFill } from "react-icons/bs";
import { RiGasStationFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";

const Trip = () => {
 
  let map;
  const [stations, setStations] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [estimatedTimeInTraffic, setEstimatedTimeInTraffic] = useState("");
  const [estimatedDistance, setEstimatedDistance] = useState("");
const [modalIsOpen, setModalIsOpen] = useState(false);

 
 
  useEffect(() => {
    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
      // addMarker();
      getNearbyStations(
        { latitude: 25.164692557170525, longitude: 55.2106719405267 },
        map
      );
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
      center: { lat: 25.164692557170525, lng: 55.2106719405267 },
    });

    new google.maps.Marker({
      // 25.164692557170525, 55.2106719405267
      position: { lat: 25.164692557170525, lng: 55.2106719405267 },
      map: map,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      },
    });
  }

  function addMarker(station) {
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
    // console.log(station.formattedAddress);
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
            latitude: 25.164692557170525,
            longitude: 55.2106719405267,
          },
          radius: 1000.0,
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
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Set up map if not already initialized
    if (!map) {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: { lat: 25.164692557170525, lng: 55.2106719405267 },
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

        // Assuming batteryLeftTime is a state variable that holds the remaining battery time
        // if ("1 hr 50 mins" < estimatedTime) {
          toast.error("Your battery left time is less than estimated time");
          setModalIsOpen(true);
        // }
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  };

  return (
    <div className="w-full h-full">
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setModalIsOpen(false)}
          ></div>
          <div className="bg-white w-96 p-6 rounded-lg flex justify-center flex-col shadow-lg relative z-10">
            <img  src="https://img.freepik.com/premium-vector/loyalty-program-getting-gift-reward-flat-illustration_169533-11.jpg?w=180"
/>            <p className="mb-4 mt-4 font-semibold text-black">
              Low battery? No worries! With 2500 reward points, our service
              center will assist, and an executive will contact you shortly for
              coordination.
            </p>
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={() => setModalIsOpen(false)}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

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
              <span className="text-[#44dba0]">3 hr 15 mins</span>
            </p>
            <p className="text-white">
              Estimated Time in Traffic:{" "}
              <span className="text-[#44dba0]">4 hr </span>
            </p>
            <p className="text-white">
              Estimated Distance: <span className="text-[#44dba0]">35 km</span>
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
                    {
                      latitude: 25.164692557170525,
                      longitude: 55.2106719405267,
                    },
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
      {/* <p className="text-3xl mt-12">Suggested Optimal Path</p> */}
    </div>
  );
};

export default Trip;
