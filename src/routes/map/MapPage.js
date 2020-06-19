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
  // const [coords, setCoords] = useState({});
  const [map, setMap] = useState(null);
  const [data, setData] = useState([]);
  const [viewport, setViewport] = useState({});
  const mapContainer = useRef(null);
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

  //Initialize map
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mcadamek/ckbkljc800l311imnoxdbpz39", // stylesheet location
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
            features: toGeoJSON(data),
          },
        });
        //Set viewport based on move event
        map.on("move", (e) => {
          const lat = e.target.transform._center.lat;
          const long = e.target.transform._center.lng;
          setViewport({ latitude: lat, longitude: long });
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

      map.on("click", "symbols", function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const postcode = e.features[0].properties.postcode;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `<h3 class="popup-title">${title}</h3> 
            <h5 class="popup-postcode">${postcode}</h5>
            <h4 class="popup-subtitle">Charger Types</h4>
            `
          )
          .addTo(map);
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
  }, [map, data]);

  return (
    <div ref={(el) => (mapContainer.current = el)} style={styles}>
      <SideDrawer />
    </div>
  );
};

export default MapboxGLMap;
