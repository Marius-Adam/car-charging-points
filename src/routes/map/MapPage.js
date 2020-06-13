import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import RoomIcon from "@material-ui/icons/Room";
import SideDrawer from "./SideDrawer";

export default function MapPage() {
  const [viewport, setViewport] = useState({});
  const [data, setData] = useState([]);

  //Api call to openchargemaps
  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const response = await fetch(
      "https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&maxresults=100&compact=true&verbose=false"
    );
    const data = await response.json();
    setData(data);
    console.log(data);
  };

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
      zoom: 10,
    });
  }

  return (
    <div className="map">
      <SideDrawer />
      <ReactMapGL
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
