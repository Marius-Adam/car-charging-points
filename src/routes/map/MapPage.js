import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { fetchChargerLocations } from "../../API/OpenChargerAPI";
import { toGeoJSON } from "../../API/JSONToGeoJSON";
import useDebouncedValue from "../../hooks/use-debounce";

import SideDrawer from "./SideDrawer";

const styles = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const mapContainer = useRef(null);
  const debouncedData = useDebouncedValue(data, 500);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchChargerLocations();
      setData(results);
    };
    fetchData();

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [10.2551, 50.2551],
        zoom: 4,
      });
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map.on("load", () => {
        setMap(map);
        map.resize();
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: toGeoJSON(debouncedData),
          },
        });

        map.addLayer({
          id: "symbols",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "charging-station-15",
          },
        });
      });

      // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
      map.on("click", "symbols", function (e) {
        map.easeTo({ center: e.features[0].geometry.coordinates });
      });

      // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
      map.on("mouseenter", "symbols", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "symbols", function () {
        map.getCanvas().style.cursor = "";
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, debouncedData]);
  return (
    <div ref={(el) => (mapContainer.current = el)} style={styles}>
      <SideDrawer />
    </div>
  );
};

export default MapboxGLMap;
