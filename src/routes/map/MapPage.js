import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useEffect } from "react";
import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import axios from "axios";
import useDebounce from "../../hooks/use-debounce";

import DetailDrawer from "./DetailDrawer";
import Pins from "./Pins";

export default function MapPage() {
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 51.50773,
    longitude: -0.13457,
    zoom: 12.5,
  });
  const debouncedViewport = useDebounce(viewport, 500);

  //Api call to OpenChargersAPI
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=${debouncedViewport.latitude}&longitude=${debouncedViewport.longitude}&distance=100&verbose=false`
      );
      setData(result.data);
    };
    fetchData();
  }, [debouncedViewport]);

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
      <Pins data={data} />
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
      <DetailDrawer />
    </MapGL>
  );
}
