import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function TemporaryDrawer(props) {
  const [pinCoords, setPinCoords] = useState({ lat: 0, long: 0 });
  const [pinAddress, setPinAddress] = useState({
    AddressInfo: "",
    Country: "",
  });

  useEffect(() => {
    if (props.selectedPin === null) {
    } else {
      setPinCoords({
        lat: props.selectedPin.AddressInfo.Latitude,
        long: props.selectedPin.AddressInfo.Longitude,
      });
      setPinAddress(props.selectedPin.AddressInfo);
    }
  }, [props.selectedPin]);
  console.log(pinAddress);
  const googleQuerry = `https://www.google.com/maps/dir//${pinCoords.lat}, ${pinCoords.long}/`;
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

                <hr />
              </div>
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
          </Drawer>
        </div>
      ))}
    </React.Fragment>
  );
}
