import React from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapIcon from "@material-ui/icons/Map";

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <AppBar position="fixed">
          <Toolbar className="navbar">
            <IconButton
              className="menu-icon"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <div className="login">
              <IconButton>
                <img src="./assets/google.png" alt="logo" width="21" />
              </IconButton>
              <IconButton>
                <img src="./assets/facebook.png" alt="logo" width="23" />
              </IconButton>
            </div>
          </Toolbar>
          <a href="/">
            <img
              src="./assets/logo.png"
              alt="logo"
              width="60"
              className="logo"
            />
          </a>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={open}>
          <div className="drawer-header">
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ListItem>
        </Drawer>
      </div>
    </>
  );
}
