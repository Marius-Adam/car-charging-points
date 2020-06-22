import React from "react";
import { Popup } from "react-map-gl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function PopupInfo(props) {
  const pin = props.selectedPin;

  return (
    <Popup
      latitude={pin.AddressInfo.Latitude}
      longitude={pin.AddressInfo.Longitude}
      closeButton={false}
    >
      <div className="close-popup">
        <button onClick={props.handleClose} className="close-button">
          x
        </button>
      </div>
      <div>
        <Typography variant="h6">{pin.AddressInfo.Title}</Typography>
        <Typography variant="caption" gutterBottom>
          {pin.AddressInfo.Postcode}
        </Typography>
        <br />
        <Typography variant="caption" gutterBottom className="operational">
          {pin.StatusType.Title}
        </Typography>

        <div className="detail-button-div">
          <Button
            variant="contained"
            color="primary"
            onClick={props.openDrawer}
          >
            More Details
          </Button>
        </div>
      </div>
    </Popup>
  );
}
