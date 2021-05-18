import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function SideDrawerInfo(props) {
  return (
    <div className="charger-info">
      <Paper elevation={3}>
        <Typography variant="h5" gutterBottom>
          {props.pinAddress.Title}
        </Typography>
        <div className="charger-address">
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item lg={2}>
              <img src="./assets/pin.svg" alt="landing" />
            </Grid>
            <Grid item lg={10}>
              <Typography variant="subtitle1">
                {props.pinAddress.AddressLine1}
                <br />
                {`${
                  props.pinAddress.AddressLine2
                    ? props.pinAddress.AddressLine2
                    : props.pinAddress.Town
                },  
                ${props.pinAddress.Postcode}`}
                <br />
                {props.pinAddress.Country.Title}
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
            <span className="connectors-span">Operator :</span>
            {
              <a
                href={`${props.pinChargers.OperatorInfo.WebsiteURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="link-span">{` ${props.pinChargers.OperatorInfo.Title}`}</span>
              </a>
            }
          </Typography>
          <Typography variant="subtitle1">
            <span className="connectors-span">Number Of Stations :</span>
            {<span>{` ${props.pinChargers.NumberOfPoints}`}</span>}
          </Typography>
          <Typography variant="subtitle1">
            <span className="connectors-span">Usage Type :</span>
            {props.pinChargers.UsageType
              ? ` ${props.pinChargers.UsageType.Title}`
              : " Unknown Operator"}
          </Typography>
          <Typography variant="subtitle1">
            <span className="connectors-span">Usage Cost :</span>
            {<span>{` ${props.pinChargers.UsageCost}`}</span>}
          </Typography>
        </div>
      </Paper>
      <hr />
      <div className="directions-button">
        <Button variant="contained" color="primary">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="-Directions"
            href={props.googleQuerry}
          >
            Get Driving Directions
          </a>
        </Button>
      </div>
    </div>
  );
}
