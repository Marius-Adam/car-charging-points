import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export default function MapPage() {
  const [viewport, setViewport] = useState({});

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

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
      <ReactMapGL
        onLoad={getLocation}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibWNhZGFtZWsiLCJhIjoiY2tiY21lbHA0MDNkejJydXg3N3J1ZXppcSJ9.ye1zuvUop6e-tjGkns2fjQ"
        mapStyle="mapbox://styles/mcadamek/ckbcmp4rd14dk1inzkxonhe4d"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      ></ReactMapGL>
    </div>
  );
}
