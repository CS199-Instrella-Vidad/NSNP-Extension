import { useState, useEffect } from "react";
import Select from "react-select";
import { Slider } from "@mui/material";
import "./forms.css";
import { Modal, Button, ModalBody, ModalFooter } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import localStorageMatrices from "../../../utils/hooks/useLocalStorage";
const NewOutputForm = (props) => {
  const [nodeOptions, setNodeOptions] = useState([]);
  const [outputSynIn, setOutputSynIn] = useState([]);
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

  const addOutputNeuron = () => {
    // do somethign here
    props.setEnvSyn(outputSynIn.value + 1);
    let matrices = JSON.parse(localStorage.getItem("Matrices"));
    matrices.envSyn = outputSynIn.value + 1;
    localStorage.setItem("Matrices", JSON.stringify(matrices));

    handleClose();
  };

  function handleAddSynIn(e) {
    setOutputSynIn(e);
  }

  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    props.handleCloseModal();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  useEffect(() => {
    let newOptions = [];
    console.log(props.L);
    if (props.L.length > 0) {
      for (let i = 0; i < props.L[0].length; i++) {
        newOptions.push({ value: i, label: "Neuron " + (i + 1) });
      }
    }

    setNodeOptions(newOptions);
  }, [props]);

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
          <div className="section">
            <h5>Select neuron to assign</h5>
            <Select
              options={nodeOptions}
              isMulti={false}
              onChange={(e) => {
                checkEmpty();
                handleAddSynIn(e);
              }}
            />
            <br />
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
};
export default NewOutputForm;
