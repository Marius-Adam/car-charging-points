import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useEffect } from "react";
import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";

export default function MapPage() {
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 50.526,
    longitude: 15.2551,
    zoom: 4,
    maxZoom: 12,
  });

  //Api call to OpenChargersAPI
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.openchargemap.io/v3/poi/?output=json&distance=100&latitude=${viewport.latitude}&longitude=${viewport.longitude}&verbose=true&compact=true`
      );
      setData(result.data);
    };
    fetchData();
  }, [viewport.latitude, viewport.longitude]);

  console.log(data);
  const mapRef = useRef();

  const handleViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  console.log(viewport);

  return (
    <MapGL
      ref={mapRef}
      {...viewport}
      mapStyle="mapbox://styles/mcadamek/ckbmn7bim1knm1imdyamv4qbl"
      width="100vw"
      height="100vh"
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        position="top-left"
      />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        fitBoundsOptions={{ maxZoom: 15 }}
        position="top-right"
      />
    </MapGL>
  );
}
