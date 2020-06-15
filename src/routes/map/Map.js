import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
};

const MapboxGLMap = ({ dataSource }) => {
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({});

  const mapContainer = useRef(null);

  function showPosition(position) {
    setViewport({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      width: "100vw",
      height: "100vh",
      zoom: 12,
    });
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mcadamek/ckbgc9da04z661irxdneswk8d", // stylesheet location
        center: [0, 0],
        zoom: 2,
        ...viewport,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        map.addSource("fosombo", {
          type: "geojson",
          data: dataSource,
        });

        map.addLayer({
          id: "fosombo",
          type: "symbol",
          source: "fosombo",
          layout: {
            // get the icon name from the source's "icon" property
            // concatenate the name to get an icon from the style's sprite sheet
            "icon-image": ["concat", ["get", "icon"], "-15"],
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
          },
        });

        map.addSource("earthquakes", {
          type: "geojson",
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data:
            "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "earthquakes",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "earthquakes",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "earthquakes",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on("click", "unclustered-point", function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var mag = e.features[0].properties.mag;
          var tsunami;

          if (e.features[0].properties.tsunami === 1) {
            tsunami = "yes";
          } else {
            tsunami = "no";
          }

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              "magnitude: " + mag + "<br>Was there a tsunami?: " + tsunami
            )
            .addTo(map);
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, dataSource, viewport]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
