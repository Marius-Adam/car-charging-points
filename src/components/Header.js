import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";

export default function Header() {
  return (
    <div className="header">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12} lg={6}>
          <img
            src="./assets/landing.png"
            alt="landing"
            className="header-image"
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Typography variant="h5" gutterBottom align="center">
            Discover more than 18.000 charging <br />
            points across Europe.
            <br />
            <Link to="/map">
              <Button variant="contained" color="primary" size="large">
                Map
                <RoomIcon />
              </Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
