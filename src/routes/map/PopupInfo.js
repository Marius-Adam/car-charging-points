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
        {pin.StatusType.IsOperational ? (
          <Typography variant="caption" gutterBottom className="operational">
            Operational
          </Typography>
        ) : (
          <Typography
            variant="caption"
            gutterBottom
            className="non-operational"
          >
            Non Operational
          </Typography>
        )}
        <Typography variant="h6" align="center" gutterBottom>
          Connector Types
        </Typography>
        <div className="connectors">
          {pin.Connections.map((connection, index) => {
            if (connection.ConnectionType.Title.includes("CHAdeMO")) {
              return (
                <img
                  src="./assets/Chademo.png"
                  alt="Chademo"
                  width="30"
                  key={index}
                />
              );
            }
            if (connection.ConnectionType.Title.includes("Css")) {
              return (
                <img src="./assets/Css.png" alt="Css" width="30" key={index} />
              );
            }
            if (connection.ConnectionType.Title.includes("Type 2")) {
              return (
                <img
                  src="./assets/Type2.png"
                  alt="Type2"
                  width="30"
                  key={index}
                />
              );
            }
            if (connection.ConnectionType.Title.includes("BS1363")) {
              return (
                <img
                  src="./assets/Type2a.png"
                  alt="Socket"
                  width="30"
                  key={index}
                />
              );
            }
            if (connection.ConnectionType.Title.includes("Tesla")) {
              return (
                <img
                  src="./assets/Css.png"
                  alt="Socket"
                  width="30"
                  key={index}
                />
              );
            }
            return (
              <img
                src="./assets/Type2a.png"
                alt="Socket"
                width="30"
                key={index}
              />
            );
          })}
        </div>
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
