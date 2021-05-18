import React from "react";

import { Popup } from "react-map-gl";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

export default function PopupInfo(props) {
  const pin = props.selectedPin;

  const getIconForConnector = (id, title) => {
    if (id === 1) {
      return <img src="./assets/Type1_J1772.svg" alt={title} width="30" />;
    } else if (id === 2) {
      return <img src="./assets/Chademo_type4.svg" alt={title} width="30" />;
    } else if (id === 25) {
      return <img src="./assets/Type2_socket.svg" alt={title} width="30" />;
    } else if (id === 32) {
      return <img src="./assets/Type1_CCS.svg.svg" alt={title} width="30" />;
    } else if (id === 33) {
      return <img src="./assets/Type2_CCS.svg" alt={title} width="30" />;
    } else if (id === 1036) {
      return <img src="./assets/Type2_tethered.svg" alt={title} width="30" />;
    } else {
      return <img src="./assets/Unknown.svg" alt={title} width="30" />;
    }
  };

  return (
    <Popup
      latitude={pin.AddressInfo.Latitude}
      longitude={pin.AddressInfo.Longitude}
      closeButton={false}>
      <div className="close-popup">
        <button onClick={props.handleClose} className="close-button">
          <CloseIcon />
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
          <Typography variant="caption" gutterBottom className="non-operational">
            Non Operational
          </Typography>
        )}
        <Typography variant="h6" align="center" gutterBottom>
          Connector Types
        </Typography>
        <div className="connectors">
          {pin.Connections.map((connection, index) => {
            const id = connection.ConnectionType.ID
            const title = connection.ConnectionType.Title
            return (
              <div className="connector">
                {getIconForConnector(id, title)}
                <span>{title}</span>
              </div>
            );
          })}
        </div>
        <div className="detail-button-div">
          <Button variant="contained" color="primary" onClick={props.openDrawer}>
            More Details
          </Button>
        </div>
      </div>
    </Popup>
  );
}
