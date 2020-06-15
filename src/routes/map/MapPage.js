import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { fetchChargerLocations } from "../../OpenChargerAPI";
import useDebouncedValue from "../../hooks/use-debounce";

import MapboxGlMap from "./Map";

//Icons
import RoomIcon from "@material-ui/icons/Room";
import IconButton from "@material-ui/core/IconButton";

//Components
import SideDrawer from "./SideDrawer";
import PopupInfo from "./PopupInfo";

const toGeoJSON = (apiData) => {
  const markerData = apiData.map((data) => {
    const {
      AddressInfo: { Latitude, Longitude },
    } = data;

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Latitude, Longitude]
      },
    };
  });

  const geoJSON = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: markerData,
    },
  };

  console.log(geoJSON);

  return geoJSON;
};

export default function MapPage() {
  const [viewport, setViewport] = useState({});
  const [data, setData] = useState([]);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const mapRef = useRef();

  const debouncedViewport = useDebouncedValue(viewport, 500);

  //Api call to openchargemaps
  useEffect(() => {
    const fetchData = async () => {
      const { latitude: lat, longitude: long } = debouncedViewport;
      const results = await fetchChargerLocations(lat, long, 100);
      setData(toGeoJSON(results));
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

  // const onMarkerClick = (charger) => {
  //   const {
  //     AddressInfo: { Latitude, Longitude },
  //   } = charger;
  //   mapRef.current.getMap().flyTo({
  //     center: [Longitude, Latitude],
  //     essential: true
  //   });
  //   setSelectedCharger(charger);
  // };

  return (
    <div className="map">
      <SideDrawer selectedCharger={selectedCharger} />
      <MapboxGlMap dataSource={data} />
      {/* <ReactMapGL
        ref={mapRef}
        className="mapbox"
        onLoad={getLocation}
        {...viewport}
        data={data}
        mapboxApiAccessToken="pk.eyJ1IjoibWNhZGFtZWsiLCJhIjoiY2tiY21lbHA0MDNkejJydXg3N3J1ZXppcSJ9.ye1zuvUop6e-tjGkns2fjQ"
        mapStyle="mapbox://styles/mcadamek/ckbgc9da04z661irxdneswk8d"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
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
                onMarkerClick(charger);
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
      </ReactMapGL> */}
    </div>
  );
}
