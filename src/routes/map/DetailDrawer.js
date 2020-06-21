import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

export default function TemporaryDrawer(props) {
  return (
    <>
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
                <h1>Charger Info Here</h1>
              </div>
            </div>
          </Drawer>
        </div>
      ))}
    </>
  );
}
