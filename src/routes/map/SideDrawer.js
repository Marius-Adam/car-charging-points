import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export default function SideDrawer() {
  return (
    <div className="side-drawer">
      <IconButton>
        <ChevronLeftIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
