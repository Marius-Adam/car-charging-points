import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

export default function SideDrawer() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <div className={`side-drawer ${open ? "close-drawer" : ""}`}>
      <IconButton onClick={toggleOpen}>
        <ChevronLeftIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
