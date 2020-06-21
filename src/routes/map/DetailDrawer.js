import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  console.log(state);

  return (
    <>
      {["left"].map((anchor) => (
        <div className="side-drawer" key={anchor}>
          {/* <IconButton
            className="side-button"
            onClick={toggleDrawer(anchor, true)}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <IconButton onClick={toggleDrawer(anchor, false)}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
            <div
              role="presentation"
              className="inner-drawer"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            ></div>
          </Drawer>
        </div>
      ))}
    </>
  );
}
