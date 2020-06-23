import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import SideDrawerInfo from "./SideDrawerInfo";

export default function TemporaryDrawer(props) {
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
              <SideDrawerInfo
                pinAddress={pinAddress}
                pinChargers={pinChargers}
                googleQuerry={googleQuerry}
              />
            </div>
          </Drawer>
        </div>
      ))}
    </React.Fragment>
  );
}
