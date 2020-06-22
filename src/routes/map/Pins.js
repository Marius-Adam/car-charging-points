import React from "react";
import { Marker } from "react-map-gl";
import Button from "@material-ui/core/Button";
import PopupInfo from "./PopupInfo";

export default function Pins(props) {
  const chargers = props.data;
  console.log(props);

  const handleClose = () => {
    props.setSelectedPin(null);
  };

  return (
    <React.Fragment>
      {chargers.map((charger, index) => (
        <Marker
          key={index}
          longitude={charger.AddressInfo.Longitude}
          latitude={charger.AddressInfo.Latitude}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              props.setSelectedPin(charger);
            }}
          >
            <img src="./assets/pin.svg" alt="marker pin" />
          </Button>
        </Marker>
      ))}
      {props.selectedPin ? (
        <PopupInfo
          selectedPin={props.selectedPin}
          handleClose={handleClose}
          setSelectedPin={props.setSelectedPin}
          openDrawer={props.openDrawer}
        />
      ) : null}
    </React.Fragment>
  );
}
