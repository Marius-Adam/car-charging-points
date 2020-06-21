import React from "react";
import { Popup } from "react-map-gl";

export default function PopupInfo(props) {
  const pin = props.selectedPin;

  return (
    <Popup
      latitude={pin.AddressInfo.Latitude}
      longitude={pin.AddressInfo.Longitude}
      onClose={props.handleClose}
    >
      <div>Popup Info Here</div>
    </Popup>
  );
}
