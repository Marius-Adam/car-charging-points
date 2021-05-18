import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//Icons
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MapIcon from "@material-ui/icons/Map";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MailIcon from "@material-ui/icons/Mail";

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
              <MenuIcon fontSize="large"/>
            </IconButton>
          </Toolbar>
          <Link to="/">
            <img
              src="./assets/logo.png"
              alt="logo"
              width="60"
              className="logo"
            />
          </Link>
        </AppBar>
        <Drawer variant="persistent" anchor="left" open={open}>
          <div className="drawer-header">
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon fontSize="large"/>
            </IconButton>
          </div>
          <Divider />
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/map">
            <ListItem button>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Map" />
            </ListItem>
          </Link>
          <Link to="about">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          <Link to="contact">
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
          </Link>
        </Drawer>
      </div>
    </>
  );
}
