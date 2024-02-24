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
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Initialize reviews with sample data
    setReviews([
      {
        text: "Great station!",
        rating: 5,
        timestamp: new Date().toISOString(),
      },
      {
        text: "Good experience overall.",
        rating: 4,
        timestamp: new Date("2024-02-24T10:30:00").toISOString(),
      },
    ]);
  }, []);

  // Function to handle adding a new review
  const addReview = () => {
    if (newReview && rating) {
      const newReviewObj = {
        text: newReview,
        rating: rating,
        timestamp: new Date().toISOString(),
      };
      setReviews([...reviews, newReviewObj]);
      // Reset the form
      setNewReview("");
      setRating(0);
    }
  };

  // Function to render star icons based on rating
  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= numStars ? (
          <AiFillStar
            key={i}
            className="text-yellow-400 cursor-pointer"
            onClick={() => setRating(i)}
          />
        ) : (
          <AiOutlineStar
            key={i}
            className="text-gray-400 cursor-pointer"
            onClick={() => setRating(i)}
          />
        )
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Sort reviews by timestamp in descending order
  const sortedReviews = [...reviews].sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );

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

const [optimalStation, setOptimalStation] = useState(null);

  function calculateOptimalPath() {
    // Calculate score for each station
  console.log(stations);
    const stationsWithScore = stations?.map((station) => ({
      ...station,
      score: calculateScore(station),
    }));

    // Sort stations by score in ascending order
    stationsWithScore.sort((a, b) => a.score - b.score);

    // The station with the lowest score is the most optimal
    return stationsWithScore[0];
  }

function calculateScore(station) {
  let score = 0;
  station.evChargeOptions.connectorAggregation.forEach((connector) => {
    score += station.evChargeOptions.connectorCount + connector.maxChargeRateKw;
  });

  // Subtract the distance from the score
  score -= station.distance;

  return score;
}
  useEffect(() => {
    if (stations.length > 0) {
      const optimalStation = calculateOptimalPath();
      setOptimalStation(optimalStation);
    }
  }, [stations]);
  
  useEffect(() => {
   console.log(optimalStation);
  
  
  }, [optimalStation])
  
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
              Connector Count : {station?.evChargeOptions?.connectorCount}
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
        <p className="text-3xl mt-12">Suggested Optimal Path</p>
      <div className="flex gap-x-24 justify-center mt-8">
        <div className="flex flex-col gap-y-6">
          <div className="border p-6 border- rounded-xl ">
            <MdOutlineElectricBolt className="font-extrabold text-4xl text-[#44DDA0]" />
            <div className="flex justify-between my-4">
              <h2 className="font-bold text-xl">
                <span className="white pr-2">1.5</span>miles
              </h2>
              <MdCancelPresentation className="text-4xl text-[#44DDA0]" />
            </div>
            <p className="text-lg font-medium">
              {optimalStation?.displayName?.text}
            </p>
            <div className="w-full text-[#575757] mt-5 flex justify-between items-center">
              <div className="flex">
                {optimalStation?.evChargeOptions?.connectorAggregation?.map(
                  (connector, i) => (
                    <div key={i} className="flex gap-2">
                      <div>Type</div>

                      <div className="flex gap-1 items-center">
                        <span className="text-xl text-white">
                          {formatPrimaryType(connector.type)}
                        </span>
                      </div>
                      <div>Price</div>
                      <span
                        className={`text-3xl "text-[#44DDA0]"
                            
                        }`}
                      >
                        {connector.maxChargeRateKw} {" kW"}
                      </span>
                    </div>
                  )
                )}
                <div className="ml-2">Slots</div>
                <span
                  className={`text-3xl "text-[#44DDA0]"`}
                >
                  {optimalStation?.evChargeOptions?.connectorCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg font-medium text-white ml-6 ">
            About the EV Station
          </p>
          <img src={Car} alt="" className="h-64" />

          {/* Reviews And Ratings */}
          <div className="w-full text-[#575757] mt-5 flex  justify-between items-center">
            <div className="flex flex-col mt-8">
              {/* Form to input review */}
              <div className="flex flex-col items-center justify-between mb-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Your review"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-72"
                  />
                  <div className="flex my-2 ml-2">{renderStars(rating)}</div>
                </div>

                <div className="flex flex-col py-2  items-center">
                  <button
                    onClick={addReview}
                    className="bg-[#44bda0] text-white  px-4 py-2 rounded-md"
                  >
                    Add Review
                  </button>
                </div>
              </div>

              {/* Display reviews */}
              {sortedReviews.map((review, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md mb-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{review.text}</p>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-500">
                    {new Date(review.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;
