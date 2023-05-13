import React from "react";
import { useState } from "react";
import { MathComponent } from "mathjax-react";
import "./Matrices.css";
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

function Matrices(props) {
  // States for the Input Fields
  const [inputConfig, setInputConfig] = useState("");
  const [inputFunction, setInputFunction] = useState("");
  const [inputFunctionLocation, setInputFunctionLocation] = useState("");
  const [inputSynapseList, setInputSynapseList] = useState("");
  const [inputThresholdList, setInputThresholdList] = useState("");
  const [inputVarLocList, setInputVarLocList] = useState("");

  // Changing of Configuration Vector
  function handleConfigChange() {
    if (inputConfig != "") {
      let matrixForm = "[" + inputConfig + "]";
      props.setC(JSON.parse(matrixForm));
      setInputConfig("");
      props.setCHist([]);
    }
  }
  function handleFunctionChange() {
    if (inputFunction != "") {
      let matrixForm = "[" + inputFunction + "]";
      props.setF(JSON.parse(matrixForm));
      setInputFunction("");
    }
  }

  function handleFunctionLocationChange() {
    if (inputFunctionLocation != "") {
      let matrixForm = "[" + inputFunctionLocation + "]";
      props.setL(JSON.parse(matrixForm));
      setInputFunctionLocation("");
    }
  }

  function handleSynapseListChange() {
    if (inputSynapseList != "") {
      let matrixForm = "[" + inputSynapseList + "]";
      props.setSyn(JSON.parse(matrixForm));
      setInputSynapseList("");
    }
  }

  function handleThresholdListChange() {
    if (inputThresholdList != "") {
      let matrixForm = "[" + inputThresholdList + "]";
      props.setT(JSON.parse(matrixForm));
      setInputThresholdList("");
    }
  }

  function handleVarLocListChange() {
    if (inputVarLocList != "") {
      let matrixForm = "[" + inputVarLocList + "]";
      props.setVL(JSON.parse(matrixForm));
      setInputVarLocList("");
    }
  }
  return (
    <>
      <div className="d-flex column align-items-center justify-content-around">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 text-center justify-content-center">
          <div className="d-flex row my-5 justify-content-center">
            <h2>Configuration Vector</h2>
            <MathComponent tex={matrixToString([props.C])} />

            <div className="d-flex col">
              <div className="col-2"></div>
              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputConfig(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="1,1,2"
                />
                <button
                  onClick={handleConfigChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
          <div className="d-flex row my-5 justify-content-center">
            <h2>Function Matrix</h2>
            <MathComponent tex={matrixToString(props.F)} />
            <div className="d-flex col">
              <div className="col-2"></div>

              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputFunction(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="[1,1,0],[0.5,0.5,0],[0,0,1],[0,0,0.5]"
                />
                <button
                  onClick={handleFunctionChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>

          <div className="d-flex row my-5 justify-content-center">
            <h2>Function Location Matrix</h2>
            <MathComponent tex={matrixToString(props.L)} />
            <div className="d-flex col">
              <div className="col-2"></div>
              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputFunctionLocation(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="[1,0],[1,0],[0,1],[0,1]"
                />
                <button
                  onClick={handleFunctionLocationChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>

          <div className="d-flex row my-5 justify-content-center">
            <h2>Synapse List</h2>
            <MathComponent tex={matrixToString(props.syn)} />{" "}
            <div className="d-flex col">
              <div className="col-2"></div>
              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputSynapseList(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="[1,2],[2,1]"
                />
                <button
                  onClick={handleSynapseListChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>

          <div className="d-flex row my-5 justify-content-center">
            <h2>Threshold List</h2>
            <MathComponent tex={matrixToString(props.T)} />
            <div className="d-flex col">
              <div className="col-2"></div>
              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputThresholdList(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="[4,4]"
                />
                <button
                  onClick={handleThresholdListChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>

          <div className="d-flex row my-5 justify-content-center">
            <h2>Variable Location List</h2>
            <MathComponent tex={matrixToString([props.VL])} />
            <div className="d-flex col">
              <div className="col-2"></div>
              <div className="input-group input-group-sm mb-3 px-5">
                <input
                  onChange={(e) => setInputVarLocList(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="1,1,2"
                />
                <button
                  onClick={handleVarLocListChange}
                  className="btn btn-secondary"
                  type="button"
                >
                  Set
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Matrices;
