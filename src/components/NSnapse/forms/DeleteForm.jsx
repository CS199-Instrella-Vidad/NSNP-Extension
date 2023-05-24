import { useState, useEffect } from "react";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import "./forms.css";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { systemStackPush } from "../../../utils/systemStackPush";
import saveSystemtoStorage from "../../../utils/saveSystemtoStorage";

function DeleteForm(props) {
  const [nodeOptions, setNodeOptions] = useState([]);
  const [status, setStatus] = useState(false);
  const [toDelete, setToDelete] = useState([]);
  const [isdisabled, setAble] = useState(true);
  const [showModal, setShow] = useState(false);

  let newF = props.F;
  let newC = props.C;
  let newL = props.L;
  let newSyn = props.syn;
  let newVL = props.VL;
  let newEnvSyn = props.envSyn;
  let newT = props.T;
  let newNeuronPositions = props.neuronPositions;

  const show = () => setStatus(true);
  const hide = () => setStatus(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const todelete = () => {
    let neuron = parseInt(props.selectedNode.slice(7));

    deleteNeuron(neuron);

    // Adding to history
    let system = systemStackPush(
      newC,
      newF,
      newL,
      newVL,
      newT,
      newSyn,
      newEnvSyn,
      newNeuronPositions,
      "Deleted a Neuron"
    );
    props.pushSystem(system);
    hide();
  };

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

  function massDelete() {
    // Adding to history

    let message =
      toDelete.length > 1 ? "Deleted multiple neurons" : "Deleted a neuron";
    let system = systemStackPush(
      newC,
      newF,
      newL,
      newVL,
      newT,
      newSyn,
      newEnvSyn,
      message
    );

    for (let i = 0; i < toDelete.length; i++) {
      deleteNeuron(toDelete[i]);
    }
    props.pushSystem(system);
    handleClose();
  }

  function adjustNeuronPositions(neuron, neuronPositions) {
    // Change neuron Positions
    let newNeuronPositions = neuronPositions;

    newNeuronPositions = newNeuronPositions.filter(
      (item) =>
        item.id != "Neuron " + neuron &&
        item.id != "neuron-contents" + neuron - 1
    );

    // For all objects in neuronPositions, if the id format is "Neuron x" or "neuron-contentsx", change the x to x-1 if x > neuron
    for (let i = 0; i < newNeuronPositions.length; i++) {
      let id = newNeuronPositions[i].id;
      // if the id is "Neuron x"
      if (id.slice(0, 7) == "Neuron ") {
        let idNum = parseInt(id.slice(7));
        if (idNum > neuron) {
          newNeuronPositions[i].id = id.slice(0, 7) + (idNum - 1);
        }
      }
      // if the id is "neuron-contentsx"
      else if (id.slice(0, 15) == "neuron-contents") {
        let idNum = parseInt(id.slice(15));

        if (idNum > neuron - 1) {
          newNeuronPositions[i].id = id.slice(0, 15) + (idNum - 1);
        }
      }
    }
    return newNeuronPositions;
  }

  function deleteNeuron(neuron) {
    let indices = [];
    let idx = newVL.indexOf(neuron);
    while (idx != -1) {
      indices.push(idx);
      idx = newVL.indexOf(neuron, idx + 1);
    }
    // CHANGE VL
    newVL = newVL.filter((item) => item != neuron);
    // adjust the VL array so that no number is skipped
    for (let i = 0; i < newVL.length; i++) {
      if (newVL[i] > neuron) {
        newVL[i] = newVL[i] - 1;
      }
    }

    // Delete Variables in C and F\
    for (let i = 0; i < indices.length; i++) {
      newC.splice(indices[i] - i, 1);
      for (let j = 0; j < newF.length; j++) {
        newF[j].splice(indices[i] - i, 1);
      }
    }

    // Delete Functions in F based on L
    let fIndices = [];
    for (let i = 0; i < newL.length; i++) {
      // for each row
      if (newL[i][neuron - 1] == 1) {
        fIndices.push(i);
      }
    }

    // Filter newF
    newF = newF.filter((item, index) => !fIndices.includes(index));

    // Adjust function locations (L)

    for (let i = 0; i < newL.length; i++) {
      newL[i].splice(neuron - 1, 1);
    }

    // Adjust neuron locations in L
    newL = newL.filter((item, index) => !fIndices.includes(index));

    // CHANGE syn
    // remove all elements that contain neuron
    newSyn = newSyn.filter((item) => !item.includes(neuron));
    // adjust the syn array so that no number is skipped
    for (let i = 0; i < newSyn.length; i++) {
      for (let j = 0; j < newSyn[i].length; j++) {
        if (newSyn[i][j] > neuron) {
          newSyn[i][j] = newSyn[i][j] - 1;
        }
      }
    }

    // TODO: CHANGE T depending on function, depending on function location == neuron
    newT = newT.filter((item) => item[0] != neuron);

    // Adjust envsyn
    if (newEnvSyn > neuron - 1) {
      newEnvSyn = newEnvSyn - 1;
    }

    // Change neuron Positions
    newNeuronPositions = adjustNeuronPositions(neuron, props.neuronPositions);

    saveSystemtoStorage(
      props,
      newF,
      newL,
      newC,
      newVL,
      newSyn,
      newEnvSyn,
      newNeuronPositions,
      newT
    );
  }

  function handleAddtoDelete(e) {
    let sortedArray = [];
    for (let i = 0; i < e.length; i++) {
      sortedArray.push(parseInt(e[i].value + 1));
    }
    sortedArray.sort(function (a, b) {
      return b - a;
    });
    setToDelete(sortedArray);
  }

  // Load the neuron options for the dropdown menu
  useEffect(() => {
    let newOptions = [];
    if (newL.length > 0) {
      for (let i = 0; i < newL[0].length; i++) {
        newOptions.push({ value: i, label: "Neuron " + (i + 1) });
      }
    }

    setNodeOptions(newOptions);
  }, [props]);

  if (props.selectedNode !== "") {
    return (
      <>
        <Button variant="c1" onClick={show}>
          Delete {props.selectedNode}
        </Button>
        <Dialog open={status} onClose={hide}>
          <DialogTitle>Alert: Deleting a Neuron</DialogTitle>
          <DialogContent>
            You are about to delete {props.selectedNode} and synapses connected
            to it.
          </DialogContent>
          <DialogActions>
            <Button onClick={hide}>Disagree</Button>
            <Button onClick={todelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return (
      <>
        <Button onClick={handleShow} variant="c5">
          Delete Neurons
        </Button>
        <Modal
          dialogclassname="modalcustom"
          keyboard={false}
          centered
          backdrop="static"
          show={showModal}
          onHide={handleClose}
        >
          <ModalHeader closeButton className="sticktop">
            <h3>Delete Neurons</h3>
          </ModalHeader>
          <ModalBody>
            <div>
              <h5>Select neuron/s to delete</h5>
              <p>
                You can delete multiple neurons. Deleting neurons will also
                delete synapses connected to them.
              </p>
              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  checkEmpty();
                  handleAddtoDelete(e);
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isdisabled}
              onClick={massDelete}
              id="submitbutton"
              variant="c5"
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default DeleteForm;
