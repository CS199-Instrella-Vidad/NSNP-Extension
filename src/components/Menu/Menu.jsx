import React from "react";
import { slide as BMenu } from "react-burger-menu";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Alert,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Save2, ClockHistory } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(props) {
  const [fileName, setFileName] = useState("asd");

  return (
    <BMenu
      id="side-bar-menu"
      // isOpen={props.showSideBarMenu}
      disableCloseOnEsc
      disableOverlayClick
      noOverlay
    >
      <center>
        <Form className="menuform">
          <Form.Control
            type="file"
            id="custom-file"
            label={fileName ? fileName : "Load file..."}
            onChange={(e) => {
              console.log("A");
            }}
          />
        </Form>
        <div className="btncontainer">
          <Link
            to="#"
            id="save-btn"
            variant="primary"
            // disabled={props.time > 0 ? true : false}
            // onClick={handleSave}
          >
            <div className="btnMode">
              <Save2 /> Save
            </div>
          </Link>
        </div>
        <div className="btncontainer">
          <Link
            to="#"
            id="choice-history-btn"
            variant="primary"
            // onClick={props.handleShowChoiceHistoryModal}
          >
            <div className="btnMode">
              <ClockHistory /> Choice History
            </div>
          </Link>
        </div>
        <div>
          <DropdownButton id="file-dropdown" title="Download samples">
            {/* <Dropdown.Item href="./samples/ex1 - 3k+3 spiker.xmp" download>
              Ex1 - 3k+3 Spiker
            </Dropdown.Item> */}
          </DropdownButton>
        </div>
        <div className="btncontainer">
          <Link
            to="#"
            id="restart-tour"
            variant="primary"
            // onClick={props.handleTrueRestartTutorial}
          >
            <div className="btnMode">Restart Tutorial</div>
          </Link>
        </div>
        <div className="btncontainer">
          <Link to="/">
            <div className="btnMode">Return to Main Menu</div>
          </Link>
        </div>
        <div>
          <Form>
            <Form.Check
              type="checkbox"
              label="Display details when hovering"
              // defaultChecked={props.isHover}
              onChange={() => {
                // props.isHover = !props.isHover;
              }}
            />
          </Form>
        </div>
      </center>
    </BMenu>
  );
}

export default Menu;
