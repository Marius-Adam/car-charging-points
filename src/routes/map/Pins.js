import React from "react";
import { Marker } from "react-map-gl";
import Button from "@material-ui/core/Button";
import PopupInfo from "./PopupInfo";

export default function Pins(props) {
  const chargers = props.data;
  console.log(chargers);
  const handleClose = () => {
    props.setSelectedPin(null);
  };

  return (
    <React.Fragment>
      {chargers.map((charger, index) => {
        return (
          <Marker offsetLeft={-28} offsetTop={-20} key={index} longitude={charger.AddressInfo.Longitude} latitude={charger.AddressInfo.Latitude}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.setSelectedPin(charger);
              }}>
              {charger.StatusType.IsOperational ? (
                <img src="./assets/pin.svg" alt="marker pin" style={{ maxWidth: "28px" }} />
              ) : (
                <img src="./assets/pinRed.svg" alt="marker pin" style={{ maxWidth: "28px" }} />
              )}
            </Button>
          </Marker>
        );
      })}
      {props.selectedPin && (
        <PopupInfo selectedPin={props.selectedPin} handleClose={handleClose} setSelectedPin={props.setSelectedPin} openDrawer={props.openDrawer} />
      )}
    </React.Fragment>
  );
}
