import React from "react";
import Typography from "@material-ui/core/Typography";

export default function PopupInfo(selectedCharger) {
  const charger = selectedCharger.selectedCharger;
  return (
    <div className="popup">
      <Typography variant="h6">{charger.AddressInfo.Title}</Typography>
      <Typography variant="caption" gutterBottom>
        {charger.AddressInfo.Postcode}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {charger.UsageType.Title}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Charger Types
      </Typography>
      <div className="connections">
        {charger.Connections.map((connection, index) => {
          if (connection.Level.IsFastChargeCapable === true) {
            return (
              <div className="connection-type" key={index}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Fast
                  <br />
                  {connection.ConnectionType.Title}
                  <br />
                  <img src="./assets/fast.png" alt="fast charge" width="30px" />
                </Typography>
              </div>
            );
          } else {
            return (
              <div className="connection-type" key={index}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Slow
                  <br />
                  {connection.ConnectionType.Title}
                  <br />
                  <img src="./assets/slow.png" alt="slow charge" width="30px" />
                </Typography>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
