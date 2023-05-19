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

const NewOutputForm = (props) => {
  const [nodeOptions, setNodeOptions] = useState([]);
  const [outputSynIn, setOutputSynIn] = useState([]);
  const [isdisabled, setAble] = useState(true);
  const [status, setStatus] = useState(false);
  const [showModal, setShow] = useState(false);

  const show = () => setStatus(true);
  const hide = () => setStatus(false);
  const toAssign = () => {
    assignNeuron();
    hide();
  };

  function assignNeuron() {
    let neuron = parseInt(props.selectedNode.slice(7));
    props.setEnvSyn(neuron);
    let matrices = JSON.parse(localStorage.getItem("Matrices"));
    if (matrices) {
      matrices.envSyn = neuron;
    } else {
      matrices = {
        F: props.F,
        C: props.C,
        L: props.L,
        syn: props.syn,
        VL: props.C,
        T: props.T,
        envSyn: neuron,
      };
    }
    localStorage.setItem("Matrices", JSON.stringify(matrices));
    props.setSelectedNode("");
  }

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

  const addOutputNeuron = () => {
    props.setEnvSyn(outputSynIn);
    let matrices = JSON.parse(localStorage.getItem("Matrices"));
    if (matrices) {
      matrices.envSyn = outputSynIn;
    } else {
      matrices = {
        F: props.F,
        C: props.C,
        L: props.L,
        syn: props.syn,
        VL: props.C,
        T: props.T,
        envSyn: outputSynIn,
      };
    }
    localStorage.setItem("Matrices", JSON.stringify(matrices));

    handleClose();
  };

  function handleAddSynIn(e) {
    setOutputSynIn(e[0].value + 1);
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // Load the neuron options for making a synapse
  useEffect(() => {
    let newOptions = [];
    if (props.L.length > 0) {
      for (let i = 0; i < props.L[0].length; i++) {
        newOptions.push({ value: i, label: "Neuron " + (i + 1) });
      }
    }

    setNodeOptions(newOptions);
  }, [props]);

  if (props.selectedNode !== "") {
    return (
      <>
        <Button variant="c1" onClick={show}>
          Assign {props.selectedNode} as Output Neuron
        </Button>
        <Dialog open={status} onClose={hide}>
          <DialogTitle>Assign as Output Neuron</DialogTitle>
          <DialogContent>
            You are about to assign {props.selectedNode} as an output neuron.
            This means that this neuron will send values to the environment.
          </DialogContent>
          <DialogActions>
            <Button onClick={hide}>Disagree</Button>
            <Button onClick={toAssign} autoFocus>
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
          Assign Output Neuron
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
            <h3>Assign Output Neuron</h3>
          </ModalHeader>
          <ModalBody>
            <div>
              <h5>Select neuron to assign as Output Neuron</h5>
              <p>
                The selected neuron will be the one to send spikes to the
                environment.
              </p>
              <Select
                options={nodeOptions}
                isMulti={true}
                onChange={(e) => {
                  checkEmpty();
                  handleAddSynIn(e);
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalFooter>
              <Button
                disabled={isdisabled}
                onClick={addOutputNeuron}
                id="submitbutton"
                variant="c5"
              >
                Assign
              </Button>
            </ModalFooter>
          </ModalFooter>
        </Modal>
      </>
    );
  }
};
export default NewOutputForm;
