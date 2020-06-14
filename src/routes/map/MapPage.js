import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { fetchChargerLocations } from "../../OpenChargerAPI";
import useDebouncedValue from "../../hooks/use-debounce";

//Icons
import RoomIcon from "@material-ui/icons/Room";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

//Components
import SideDrawer from "./SideDrawer";
import PopupInfo from "./PopupInfo";

export default function MapPage() {
  const [viewport, setViewport] = useState({});
  const [data, setData] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
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
      {/* <SideDrawer selectedCharger={selectedCharger} /> */}
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
        <IconButton className="drawer-button">
          <ChevronRightIcon fontSize="large" />
        </IconButton>
        {data.map((charger, index) => (
          <Marker
            key={index}
            latitude={charger.AddressInfo.Latitude}
            longitude={charger.AddressInfo.Longitude}
          >
            <IconButton
              className="pin-point"
              onClick={(e) => {
                e.preventDefault();
                setSelectedCharger(charger);
              }}
            >
              <RoomIcon />
            </IconButton>
          </Marker>
        ))}
        {selectedCharger ? (
          <Popup
            latitude={selectedCharger.AddressInfo.Latitude}
            longitude={selectedCharger.AddressInfo.Longitude}
            onClose={() => {
              setSelectedCharger(null);
            }}
          >
            <PopupInfo selectedCharger={selectedCharger} />
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
