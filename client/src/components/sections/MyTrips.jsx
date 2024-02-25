import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import EV from "../../assets/evicon.png";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 48.8584, lng: 2.2945 };

function MyTrips() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAGHFR3hfwbf_yGyfkPFZ7aSfj7Jr7RDfg",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  async function calculateRoute() {
    if (!isLoaded) return; // Check if Google Maps API is loaded
    if (!originRef.current || !destinationRef.current) return;

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    // Calculate points along the route
    const route = results.routes[0].overview_path;
    const totalDistance = google.maps.geometry.spherical.computeLength(route);

    // Find the indices corresponding to 30% and 50% of the total distance
    const distance30Percent = totalDistance * 0.3;
    const distance50Percent = totalDistance * 0.5;
    let accumulatedDistance = 0;
    let point30Index = -1;
    let point50Index = -1;

    for (let i = 1; i < route.length; i++) {
      const segmentDistance =
        google.maps.geometry.spherical.computeDistanceBetween(
          route[i - 1],
          route[i]
        );
      accumulatedDistance += segmentDistance;

      if (point30Index === -1 && accumulatedDistance >= distance30Percent) {
        point30Index = i;
      }

      if (point50Index === -1 && accumulatedDistance >= distance50Percent) {
        point50Index = i;
      }

      if (point30Index !== -1 && point50Index !== -1) {
        break; // Found both indices, no need to continue loop
      }
    }

    // Place markers at the calculated points
    if (point30Index !== -1) {
      const point30 = route[point30Index];
      new google.maps.Marker({
        position: point30,
        map: map,
        icon: {
          url: EV,
          scaledSize: new google.maps.Size(50, 70),
        },
        // title: "30% mark",
      });
    }

    if (point50Index !== -1) {
      const point50 = route[point50Index];
      new google.maps.Marker({
        position: point50,
        map: map,
        icon: {
          url: EV,
          scaledSize: new google.maps.Size(50, 70),
        },
        // title: "50% mark",
      });
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      // w="100vw"
    >
      {isLoaded && (
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {/* Google Map Box */}
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
      )}
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
        // height="20"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Origin"
                ref={originRef}
                className="text-black"
              />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                className="text-black"
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="green" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text className="text-black">Distance: {distance} </Text>
          <Text className="text-black">Duration: {duration} </Text>
          {/* <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          /> */}
        </HStack>
      </Box>
    </Flex>
  );
}

export default MyTrips;
