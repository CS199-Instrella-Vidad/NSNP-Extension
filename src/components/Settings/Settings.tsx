import * as React from "react";
import StyledBurgerMenu from "../StyledBurgerMenu/StyledBurgerMenu";
import "./Settings.css";
import { slide as BurgerMenu } from "react-burger-menu";
import useLocalStorage from "../../utils/hooks/useLocalStorage";

export default function ConfigHist(props) {
  return (
    <BurgerMenu
      left
      isOpen={props.open}
      onClose={props.onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      width={"30vmax"}
      itemListElement="div"
    >
      <div className="ListPane">
        <h1>Settings</h1>
        <div className="ListItem Setting">
          <h4>About</h4>
        </div>
        <div className="ListItem Setting" onClick={props.itemaction}>
          {props.checked ? <h4>Guided Mode</h4> : <h4>Pseudorandom</h4>}
        </div>
        <div className="ListItem Setting" onClick={props.itemaction1}>
          <h4>{!props.checked1 ? <>Show</> : <>Hide</>} Graph</h4>
        </div>
        <div
          className="ListItem Setting"
          onClick={(e) => {
            props.itemaction2(props);
          }}
        >
          <h4>Save System</h4>
        </div>
        <div className="ListItem Setting">
          <h4>Load System</h4>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              props.itemaction3(e.target, props);
            }}
          />
        </div>
        <div className="ListItem Setting">
          <h4>Help</h4>
        </div>
      </div>
    </BurgerMenu>
  );
}
