import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider } from "@mui/material";
import "./forms.css";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
function NewNodeForm(props) {
  const [numVars, setNumVars] = useState(1);
  const [numFuncs, setNumFuncs] = useState(1);
  const [nodeOptions, setNodeOptions] = useState([]);

  const [inputVars, setInputVars] = useState([]);
  const [inputFuncs, setInputFuncs] = useState([]);
  const [inputSynOut, setInputSynOut] = useState([]);
  const [inputSynIn, setInputSynIn] = useState([]);

  const neuronNumber = props.L[0].length + 1;

  //for modals
  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    props.handleCloseModal();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setNumVars(1);
    setNumFuncs(1);
  };

  //for button
  let disabledbutton = true;
  const [isdisabled, setAble] = useState(true);
  function checkEmpty() {
    const tb = document.getElementsByClassName("inputs");
    let empty = false;
    for (let i = 0; i < tb.length; i++) {
      if (tb.item(i).value == "") {
        empty = true;
        break;
      }
    }
    if (empty == true) {
      document.getElementById("submitbutton").disabled = true;
      setAble(true);
    } else {
      document.getElementById("submitbutton").disabled = false;
      setAble(false);
    }
  }
  function addNewNeuron() {
    // Add new neuron to the system

    // Change C
    let newC = props.C;
    newC = newC.concat(inputVars);
    props.setC(newC);

    // Change VL
    let neuronNum = props.L[0].length + 1;
    let newVL = props.VL;
    for (let i = 0; i < numVars; i++) {
      newVL.push(neuronNum);
    }
    props.setVL(newVL);

    // Change F
    let newF = props.F;
    for (let i = 0; i < newF.length; i++) {
      for (let j = 0; j < numVars; j++) {
        newF[i].push(0);
      }
    }
    //Push an array the length of the number of elements in a row of newF
    for (let i = 0; i < numFuncs; i++) {
      let newFRow = [];
      for (let i = 0; i < newF[0].length; i++) {
        newFRow.push(0);
      }
      for (let j = 0; j < numVars; j++) {
        newFRow[newFRow.length - numVars + j] = inputFuncs[i][j];
      }
      newF.push(newFRow);
    }
    props.setF(newF);

    // Change L
    let newL = props.L;
    // Create a new column in L for the new neuron
    for (let i = 0; i < newL.length; i++) {
      newL[i].push(0);
    }
    //Push an array the length of the number of elements in a row of newF
    for (let i = 0; i < numFuncs; i++) {
      let newLRow = [];
      for (let i = 0; i < newL[0].length; i++) {
        newLRow.push(0);
      }
      newLRow[newLRow.length - 1] = 1;
      newL.push(newLRow);
    }
    props.setL(newL);

    //Change syn
    let newSyn = props.syn;
    for (let i = 0; i < inputSynIn.length; i++) {
      newSyn.push([inputSynIn[i].value + 1, neuronNumber]);
    }
    for (let i = 0; i < inputSynOut.length; i++) {
      newSyn.push([neuronNumber, inputSynOut[i].value + 1]);
    }
    console.log("adding Neuron");
    setNumVars(1);
    setNumFuncs(1);
    setInputVars([]);
    setInputFuncs([]);
    setInputSynOut([]);
    setInputSynIn([]);
    handleClose();
    console.log("added Neuron");
  }

  function handleAddVars(i, value) {
    let newVars = inputVars;
    newVars[i] = value;
    setInputVars(newVars);
  }

  function handleAddFuncs(i, j, e) {
    let newFuncs = inputFuncs;
    newFuncs[i][j] = e;
    setInputFuncs(newFuncs);
  }

  function handleAddSynOut(e) {
    setInputSynOut(e);
  }

  function handleAddSynIn(e) {
    setInputSynIn(e);
  }

  // Change size of inputVars when numVars changes
  useEffect(() => {
    let newInputVars = inputVars;
    if (inputVars.length < numVars) {
      for (let i = newInputVars.length; i < numVars; i++) {
        newInputVars.push(0);
      }
    } else if (inputVars.length > numVars) {
      for (let i = newInputVars.length; i > numVars; i--) {
        newInputVars.pop();
      }
    }

    setInputVars(newInputVars);
  }, [numVars]);

  // Change size of inputFuncs when numFuncs changes
  useEffect(() => {
    let newInputFuncs = inputFuncs;
    if (inputFuncs.length < numFuncs) {
      for (let i = newInputFuncs.length; i < numFuncs; i++) {
        newInputFuncs.push([]);
        for (let j = 0; j < numVars; j++) {
          newInputFuncs[i].push(0);
        }
      }
    } else if (inputFuncs.length > numFuncs) {
      for (let i = newInputFuncs.length; i > numFuncs; i--) {
        newInputFuncs.pop();
      }
    }

    setInputFuncs(newInputFuncs);
  }, [numFuncs]);

  useEffect(() => {
    console.log("props", props);
    let newOptions = [];
    for (let i = 0; i < props.L[0].length; i++) {
      newOptions.push({ value: i, label: "Node " + (i + 1) });
    }
    setNodeOptions(newOptions);
  }, [props]);

  return (
    <>
      <Button variant="c5" onClick={handleShow}>
        New Node
      </Button>
      <Modal
        dialogclassname="modalcustom"
        keyboard={false}
        size="xl"
        backdrop="static"
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton className="sticktop">
          <h1>Create New Neuron</h1>
        </Modal.Header>
        <Modal.Body className="bodymodal">
          <div className="section">
            <h4>Variables</h4>
            <div className="sliders">
              <label>Number of Variables:</label>
              <Slider
                track="normal"
                min={1}
                max={30}
                vdefaultvalue={1}
                aria-label="Default"
                valueLabelDisplay="on"
                onChangeCommitted={(e, v) => {
                  // Set the number of variables to the value of the input
                  setNumVars(parseInt(v));
                  checkEmpty();
                }}
              />
            </div>
            <div className="vargrid">
              {Array.from(Array(numVars).keys()).map((i) => {
                console.log("i", i);
                return (
                  <div>
                    <label>x{props.VL.length + i + 1}</label>
                    <br />
                    <input
                      className="inputs"
                      type="number"
                      onChange={(e) => {
                        handleAddVars(i, parseInt(e.target.value));
                        checkEmpty();
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="section">
            <h4>Functions</h4>
            <div className="sliders">
              <label>Number of Functions</label>

              <Slider
                min={1}
                max={30}
                defaultValue={1}
                aria-label="Default"
                valueLabelDisplay="on"
                onChangeCommitted={(e, v) => {
                  // Set the number of variables to the value of the input
                  setNumFuncs(parseInt(v));
                  checkEmpty();
                }}
              />
            </div>
            <div>
              <div className="fxn">
                {/* // Add a function selector based on the number of variables the neuron has */}
                <table>
                  <tbody>
                    {Array.from(Array(numFuncs).keys()).map((i) => {
                      return (
                        <tr>
                          <th>
                            <label className="h4">Function {i + 1}</label>
                          </th>
                          {Array.from(Array(numVars).keys()).map((j) => {
                            return (
                              <td>
                                <input
                                  type="number"
                                  className="inputs"
                                  onChange={(e) => {
                                    handleAddFuncs(
                                      i,
                                      j,
                                      parseInt(e.target.value)
                                    );
                                    checkEmpty();
                                  }}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="section">
            <h4>Connections</h4>
            <div>
              <label>Outgoing Connections</label>

              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  handleAddSynOut(e);
                }}
              />
            </div>
            <div>
              <label>Incoming Connections</label>
              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  handleAddSynIn(e);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isdisabled}
            onClick={addNewNeuron}
            id="submitbutton"
            variant="c5"
          >
            Add Neuron
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewNodeForm;
