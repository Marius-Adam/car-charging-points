import React from "react";
import { Popup } from "react-map-gl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function PopupInfo(props) {
  const pin = props.selectedPin;
  console.log(pin);
  return (
    <Popup
      latitude={pin.AddressInfo.Latitude}
      longitude={pin.AddressInfo.Longitude}
      onClose={props.handleClose}
    >
      <div>
        <Typography variant="h6">{pin.AddressInfo.Title}</Typography>
        <Typography variant="caption" gutterBottom>
          {pin.AddressInfo.Postcode}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Charger Types
        </Typography>
        <div className="connections">
          {pin.Connections.map((connection, index) => {
            if (connection.Level.IsFastChargeCapable === true) {
              return (
                <Typography
                  variant="caption"
                  gutterBottom
                  key={index}
                  className="connection-type"
                >
                  Fast Charge <br />
                  <img src="./assets/fast.png" alt="fast charge" width="30px" />
                </Typography>
              );
            } else {
              return (
                <Typography
                  variant="caption"
                  gutterBottom
                  key={index}
                  className="connection-type"
                >
                  Slow Charge <br />
                  <img src="./assets/slow.png" alt="slow charge" width="30px" />
                </Typography>
              );
            }
          })}
        </div>
        <div className="detail-button-div">
          <Button variant="contained" color="primary">
            More Details
          </Button>
        </div>
      </div>
    </Popup>
  );
}
