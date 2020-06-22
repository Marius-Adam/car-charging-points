import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function TemporaryDrawer(props) {
  console.log(props);
  const [pinAddress, setPinAddress] = useState({
    AddressInfo: "",
    Country: "",
    Latitude: 0,
    Longitude: 0,
  });
  const [pinChargers, setPinCharger] = useState({
    NumberOfPoints: 0,
    OperatorInfo: {},
    Connections: [],
    UsageCost: 0,
    UsageType: { Title: "Operator" },
  });

  useEffect(() => {
    if (props.selectedPin === null || undefined) {
    } else {
      setPinAddress(props.selectedPin.AddressInfo);
      setPinCharger(props.selectedPin);
    }
  }, [props.selectedPin]);
  console.log(pinChargers);
  const googleQuerry = `https://www.google.com/maps/dir//${pinAddress.Latitude}, ${pinAddress.Longitude}/`;
  return (
    <React.Fragment>
      {["left"].map((anchor) => (
        <div className="side-drawer" key={anchor}>
          <Drawer
            anchor={anchor}
            open={props.drawerState[anchor]}
            onClose={props.toggleDrawer(anchor, false)}
          >
            <IconButton onClick={props.toggleDrawer(anchor, false)}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <div
              role="presentation"
              className="inner-drawer"
              onKeyDown={props.toggleDrawer(anchor, false)}
            >
              <div className="charger-info">
                <Paper elevation={3}>
                  <Typography variant="h5" gutterBottom>
                    {pinAddress.Title}
                  </Typography>
                  <div className="charger-address">
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item lg={2}>
                        <img src="./assets/pin.svg" alt="landing" />
                      </Grid>
                      <Grid item lg={10}>
                        <Typography variant="subtitle1">
                          {pinAddress.AddressLine1}
                          <br />
                          {`${
                            pinAddress.AddressLine2
                              ? pinAddress.AddressLine2
                              : pinAddress.Town
                          },  
                        ${pinAddress.Postcode}`}
                          <br />
                          {pinAddress.Country.Title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
                <hr />
                <Paper elevation={3}>
                  <div className="connectors">
                    <Typography variant="h5" gutterBottom>
                      <span className="connectors-span">Chargers</span>
                    </Typography>
                    <Typography variant="subtitle1">
                      <span className="connectors-span">Operator:</span>
                      {
                        <a
                          href={`${pinChargers.OperatorInfo.WebsiteURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="link-span">{` ${pinChargers.OperatorInfo.Title}`}</span>
                        </a>
                      }
                    </Typography>
                    <Typography variant="subtitle1">
                      <span className="connectors-span">
                        Number Of Stations:
                      </span>
                      {<span>{` ${pinChargers.NumberOfPoints}`}</span>}
                    </Typography>
                    <Typography variant="subtitle1">
                      <span className="connectors-span">Usage Type:</span>
                      {pinChargers.UsageType
                        ? ` ${pinChargers.UsageType.Title}`
                        : " Unknown Operator"}
                    </Typography>
                    <Typography variant="subtitle1">
                      <span className="connectors-span">Usage Cost:</span>
                      {<span>{` ${pinChargers.UsageCost}`}</span>}
                    </Typography>
                  </div>
                </Paper>
                <hr />
                <Paper elevation={3}>
                  <div className="connection-types">
                    {pinChargers.Connections.map((connection, index) => {
                      if (connection.Level.IsFastChargeCapable === true) {
                        return (
                          <Typography
                            variant="caption"
                            gutterBottom
                            key={index}
                            className="connection"
                          >
                            Fast Charge <br />
                            <img
                              src="./assets/fast.png"
                              alt="fast charge"
                              width="30px"
                            />
                          </Typography>
                        );
                      } else {
                        return (
                          <Typography
                            variant="caption"
                            gutterBottom
                            key={index}
                            className="connection"
                          >
                            Slow Charge <br />
                            <img
                              src="./assets/slow.png"
                              alt="slow charge"
                              width="30px"
                            />
                          </Typography>
                        );
                      }
                    })}
                  </div>
                </Paper>
                <div className="directions-button">
                  <Button variant="contained" color="primary">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-Directions"
                      href={googleQuerry}
                    >
                      Get Driving Directions
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      ))}
    </React.Fragment>
  );
}
