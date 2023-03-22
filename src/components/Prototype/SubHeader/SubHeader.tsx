import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import icons from mui
import ReplayIcon from "@mui/icons-material/Replay";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import EditIcon from "@mui/icons-material/Edit";
import "./SubHeader.css";
import { green, lightBlue, red, yellow } from "@mui/material/colors";
import { Checkbox } from "@mui/material";

function SubHeader(props) {
  function handleClick() {
    console.log("Clicked");
  }
  return (
    <div className=" d-flex col justify-content-center align-items-center text-center text-white">
      <div className="d-flex col justify-content-center align-items-center p-2 text-center subHeader">
        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.reset}
        >
          <ReplayIcon fontSize="large" sx={{ color: lightBlue[500] }} />
        </div>

        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.undo}
        >
          <SkipPreviousIcon fontSize="large" sx={{ color: red[500] }} />
        </div>
        <div>
          <h4 className="timestep mx-2">{props.number}</h4>
        </div>

        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.forward}
        >
          <SkipNextIcon fontSize="large" sx={{ color: green[500] }} />
        </div>

        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.edit}
        >
          <EditIcon fontSize="large" sx={{ color: yellow[500] }} />
        </div>
        <Checkbox
          checked={props.checked}
          onChange={props.checkbox}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
        />
      </div>
    </div>
  );
}

export default SubHeader;
