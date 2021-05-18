import React, { useState, useRef, useEffect } from "react";
import MapGL, { GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import useDebounce from "../../hooks/use-debounce";

//Components
import SideDrawer from "./SideDrawer";
import Pins from "./Pins";

export default function MapPage() {
  const [data, setData] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 53.4084,
    longitude: -2.9916,
    zoom: 12,
  });
  const [drawerState, setDrawerState] = useState({
    left: false,
  });
  const debouncedViewport = useDebounce(viewport, 500);

  //Side drawer state toggler
  const toggleDrawer = (anchor, open) => () => {
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const openDrawer = () => {
    setDrawerState({ left: true });
  };

  //Api call to OpenChargersAPI
  useEffect(() => {
    fetch(
      `https://api.openchargemap.io/v3/poi/?output=json&latitude=${debouncedViewport.latitude}&longitude=${debouncedViewport.longitude}&distance=100`,
      {
        headers: {
          "X-API-Key": process.env.REACT_APP_OPEN_KEY,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      mapStyle="mapbox://styles/mapbox/outdoors-v11?optimize=true"
      width="100vw"
      height="100vh"
      minZoom={12}
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}>
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleGeocoderViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        position="top-left"
      />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        fitBoundsOptions={{ maxZoom: 12 }}
        position="top-right"
      />
      <SideDrawer
        chargersInfo={data}
        setDrawerState={setDrawerState}
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
        selectedPin={selectedPin}
      />
      <Pins data={data} openDrawer={openDrawer} selectedPin={selectedPin} setSelectedPin={setSelectedPin} />
    </MapGL>
  );
}
