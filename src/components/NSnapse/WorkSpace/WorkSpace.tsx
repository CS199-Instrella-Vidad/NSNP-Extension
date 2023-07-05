import React from "react";
import { MathComponent } from "mathjax-react";
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
function WorkSpace(props) {
  return (
    <div className="workspace">
      <div className="Cd-flex column align-items-center justify-content-around">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 text-center justify-content-center">
          <div className="d-flex row my-5 justify-content-center">
            <h2>Configuration Vector</h2>
            <MathComponent tex={matrixToString([props.C])} />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 text-center justify-content-center">
          <div className="d-flex row my-5 justify-content-center">
            <h2>Spiking Vector</h2>
            <MathComponent tex={matrixToString(props.SV)} />
          </div>

          <div className="d-flex row my-5 justify-content-center">
            <h2>Production Matrix</h2>
            <MathComponent tex={matrixToString(props.PM)} />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 text-center justify-content-center">
          <div className="d-flex row my-5 justify-content-center">
            <h2>Environment Output</h2>
            <MathComponent tex={matrixToString([props.env])} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSpace;
