import React, { useState } from "react";
import { Marker } from "react-map-gl";
import Button from "@material-ui/core/Button";
import PopupInfo from "./PopupInfo";

export default function Pins(props) {
  const chargers = props.data;
  console.log(props);
  const [selectedPin, setSelectedPin] = useState(null);

  const handleClose = () => {
    setSelectedPin(null);
  };

  return (
    <>
      {chargers.map((charger, index) => (
        <Marker
          key={index}
          longitude={charger.AddressInfo.Longitude}
          latitude={charger.AddressInfo.Latitude}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              setSelectedPin(charger);
            }}
          >
            <img src="./assets/pin.svg" alt="marker pin" />
          </Button>
        </Marker>
      ))}
      {selectedPin ? (
        <PopupInfo
          selectedPin={selectedPin}
          handleClose={handleClose}
          setSelectedPin={setSelectedPin}
          openDrawer={props.openDrawer}
        />
      ) : null}
    </>
  );
}
