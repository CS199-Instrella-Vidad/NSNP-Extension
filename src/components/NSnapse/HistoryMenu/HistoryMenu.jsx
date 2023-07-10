import "./HistoryMenu.css";
import { slide as BurgerMenu } from "react-burger-menu";
import { MathComponent } from "mathjax-react";
import { useState, useEffect, useRef } from "react";

export default function HistoryMenu(props) {
  const [listType, setListType] = useState("System");
  const [list, setList] = useState(
    props.list1.map((item) => {
      return JSON.parse(item).message;
    })
  );

  useEffect(() => {
    if (listType === "System") {
      let messageList = props.list1.map((item) => {
        return JSON.parse(item).message;
      });
      setList(messageList);
    } else if (listType === "Config") setList(props.list2);
    else if (listType === "Choice") setList(props.list3);
  }, [props.list1, props.list2, props.list3, listType]);

  return (
    <BurgerMenu
      right
      isOpen={props.open}
      onClose={props.onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      width={"20vmax"}
    >
      <div className="ListPane">
        <div className="HistoryPicker">
          <button className="HistoryType" onClick={() => setListType("System")}>
            System
          </button>
          <button className="HistoryType" onClick={() => setListType("Config")}>
            Config
          </button>
          {/* <button className="HistoryType" onClick={() => setListType("Choice")}>
            Choice
          </button> */}
        </div>

        <center>
          <h1>{listType} History</h1>
        </center>
        {list.map((item, index) => {
          return (
            <div
              className="ListItem"
              key={index}
              onClick={() => props.itemAction(index)}
            >
              <h4 className="ListItemIndex">{index}</h4>
              {listType === "Config" ? (
                <MathComponent tex={matrixToString([item])} />
              ) : (
                item
              )}
              <div></div>
            </div>
          );
        })}
      </div>
    </BurgerMenu>
  );
}
function matrixToString(matrix) {
  let string = `\\left(\\begin{array}{ccc} `;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      string += matrix[i][j];
      if (j < matrix[i].length - 1) {
        string += `&`;
      }
    }
    if (i < matrix.length - 1) {
      string += ` \\\\ `;
    }
  }
  string += ` \\end{array}\\right)`;
  return string;
}
