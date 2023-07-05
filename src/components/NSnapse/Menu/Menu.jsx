import "./Menu.css";
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
import Switch from "@mui/material/Switch";

function Menu(props) {
  const [fileName, setFileName] = useState("asd");
  return (
    <BMenu
      id="side-bar-menu"
      isOpen={props.showMenu}
      onClose={props.onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      width={"25vmax"}
      itemListElement="div"
    >
      <div className="ListPane">
        <h1>Options</h1>
        <center>
          <div className="btncontainer">
            <Link
              to="https://romantic-area-46a.notion.site/bd0b6c1c97f345398b2ea2a43972d66c?v=52241364e1b54970888ab28b29521551&pvs=4"
              target="_blank"
            >
              <div className="btnMode">
                <b>TUTORIAL/HELP PAGE</b>
              </div>
            </Link>
          </div>
          <Form className="menuform">
            <Form.Control
              type="file"
              id="custom-file"
              title={fileName ? fileName : "Load file..."}
              onChange={(e) => {
                props.load(e.target, props);
              }}
            />
          </Form>
          <div className="btncontainer">
            <Link
              to="#"
              id="save-btn"
              variant="primary"
              // disabled={props.time > 0 ? true : false}
              onClick={(e) => {
                props.save(props);
              }}
            >
              <div className="btnMode">
                <Save2 /> Save
              </div>
            </Link>
          </div>
          {/* <div className="btncontainer">
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
          </div> */}
          <div>
            <DropdownButton id="file-dropdown" title="Download samples">
              <Dropdown.Item
                href="/samples/[1,1,1,0,0,2].json"
                download
              >
                Sample NSN P System from Wu et al.
              </Dropdown.Item>
              <Dropdown.Item href="/samples/[1,1,2].json" download>
                Sample NSN P System from Ballesteros et al.
              </Dropdown.Item>
            </DropdownButton>
          </div>
          {/* <div className="btncontainer">
            <Link
              to="#"
              id="restart-tour"
              variant="primary"
              // onClick={props.handleTrueRestartTutorial}
            >
              <div className="btnMode">Restart Tutorial</div>
            </Link>
          </div> */}
          <div className="btncontainer">
            <Link to="https://snapse.website/">
              <div className="btnMode">Return to Main Menu</div>
            </Link>
          </div>
          {/* <div>
            <Form className="menuform">
              <Form.Check
                type="checkbox"
                label="Display details when hovering"
                // defaultChecked={props.isHover}
                onChange={() => {
                  // props.isHover = !props.isHover;
                }}
              />
            </Form>
          </div> */}
          <div>
            <Switch
              onChange={(e) => {
                props.set(e.target.checked);
                if (!e.target.checked) {
                  props.reset();
                }
              }}
            />
            Dev Mode
          </div>
          <div>
            <Switch
              onChange={(e) => {
                props.set1(e.target.checked);
              }}
            />
            Guided Mode
          </div>
          {/*<div>
            <Switch
              onChange={(e) => {
                props.set(e.target.checked);
                if (!e.target.checked) {
                  props.reset();
                }
              }}
            />
            Dark Mode
          </div> */}
          <div className="btncontainer">
            <Link
              to="https://github.com/CS199-Instrella-Vidad/NSNP-Extension"
              target="_blank"
            >
              <div className="btnMode">
                <b>GITHUB LINK</b>
              </div>
            </Link>
          </div>
        </center>
      </div>
    </BMenu>
  );
}

export default Menu;
