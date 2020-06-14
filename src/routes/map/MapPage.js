import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

//Icons
import RoomIcon from "@material-ui/icons/Room";

import SideDrawer from "./SideDrawer";
import { fetchChargerLocations } from "../../OpenChargerAPI";
import useDebouncedValue from "../../hooks/use-debounce";

export default function MapPage() {
  const [viewport, setViewport] = useState({});
  const [data, setData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const debouncedViewport = useDebouncedValue(viewport, 500);

  //Api call to openchargemaps
  useEffect(() => {
    const fetchData = async () => {
      const { latitude: lat, longitude: long } = debouncedViewport;
      const results = await fetchChargerLocations(lat, long, 100);
      setData(results);
    };
    fetchData();
  }, [debouncedViewport]);

  //Get user location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //Set map position based on location of user
  function showPosition(position) {
    setViewport({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      width: "100vw",
      height: "100vh",
      zoom: 12,
    });
  }

  return (
    <div className="map">
      <SideDrawer />
      <ReactMapGL
        className="mapbox"
        onLoad={getLocation}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWNhZGFtZWsiLCJhIjoiY2tiY21lbHA0MDNkejJydXg3N3J1ZXppcSJ9.ye1zuvUop6e-tjGkns2fjQ"
        mapStyle="mapbox://styles/mcadamek/ckbcmp4rd14dk1inzkxonhe4d"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {data.map((location, index) => (
          <Marker
            key={index}
            latitude={location.AddressInfo.Latitude}
            longitude={location.AddressInfo.Longitude}
          >
            <button className="pin-point">
              <RoomIcon />
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
