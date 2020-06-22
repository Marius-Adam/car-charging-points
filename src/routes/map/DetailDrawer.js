import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

export default function TemporaryDrawer(props) {
  const [pinCoords, setPinCoords] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    if (props.selectedPin === null) {
    } else {
      setPinCoords({
        lat: props.selectedPin.AddressInfo.Latitude,
        long: props.selectedPin.AddressInfo.Longitude,
      });
    }
  }, [props.selectedPin]);

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
              onClick={props.toggleDrawer(anchor, false)}
              onKeyDown={props.toggleDrawer(anchor, false)}
            >
              <div className="chargers-info">
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
