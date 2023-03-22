import * as React from "react";
import "./ConfigHist.css";
import reactBurgerMenu from "react-burger-menu";
import { MathComponent } from "mathjax-react";

export default function ConfigHist(props) {
  return (
    <reactBurgerMenu.slide
      right
      isOpen={props.open}
      onClose={props.onClose}
      customBurgerIcon={false}
      customCrossIcon={false}
      width={"30vmax"}
      itemListElement="div"
    >
      <div className="ListPane">
        <h1>History</h1>
        {props.list.map((item, index) => {
          return (
            <div
              className="ListItem"
              key={index}
              onClick={() => props.itemAction(index)}
            >
              <h4 className="ListItemIndex">{index}</h4>
              <MathComponent tex={matrixToString([item])} />
              <div></div>
            </div>
          );
        })}
      </div>
    </reactBurgerMenu.slide>
  );
}
function matrixToString(matrix: number[][]) {
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
