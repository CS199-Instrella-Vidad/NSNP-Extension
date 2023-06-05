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
                href="../../../../samples/[1,1,1,0,0,2].json"
                download
              >
                Ex1 - 3k+3 Spiker
              </Dropdown.Item>
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
            <Link to="https://snapse.website/">
              <div className="btnMode">Return to Main Menu</div>
            </Link>
          </div>
          <div>
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
          </div>
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
            <Link to="https://github.com/CS199-Instrella-Vidad">
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
