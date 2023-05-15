import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import icons from mui
import ReplayIcon from "@mui/icons-material/Replay";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import EditIcon from "@mui/icons-material/Edit";
import { Slider, Box, Grid, Input } from "@mui/material";
import "./SubHeader.css";
import { green, lightBlue, red, yellow } from "@mui/material/colors";
import { Checkbox } from "@mui/material";
import { PlayCircleFill, PauseCircleFill } from "react-bootstrap-icons";
import { useState } from "react";
function SubHeader(props) {
  const [playing, setPlay] = useState(false);
  const [speed,setSpeed]=useState(1);
  const handlePlay = () => setPlay(true);
  const handlePause = () => setPlay(false);
  const handleToggle = () => {
    playing ? setPlay(false) : setPlay(true);
  };
  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => props.forward(), 1000/speed);
      return () => clearTimeout(timer);
    }
  });
  return (
    <div className="play-area">
      <div className="d-flex align-items-center btn-c2" onClick={props.reset}>
        <ReplayIcon fontSize="small" sx={{ color: lightBlue[500] }} />
        Restart Simulation
      </div>
      <div className="main-area">
        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.undo}
        >
          <SkipPreviousIcon fontSize="small" color="secondary" />
        </div>

        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={handleToggle}
        >
          {playing ? (
            <PauseCircleFill className="play" />
          ) : (
            <PlayCircleFill className="play" />
          )}
        </div>
        <div
          className="d-flex align-items-center subheaderbutton mx-1"
          onClick={props.forward}
        >
          <SkipNextIcon fontSize="small" sx={{ color: green[500] }} />
        </div>
      </div>
      <div className="flexbox">
        <div className="speed">
          <h6>Speed: {speed}x Step Counter: {props.number}</h6>
          <Slider
                    value={speed}
                    min={0.1}
                    max={4}
                    step={0.1}
                    onChange={(e,v)=>{setSpeed(v as number)}}
                    aria-labelledby="input-slider"
                  />
        </div>
        {props.dev && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default SubHeader;
