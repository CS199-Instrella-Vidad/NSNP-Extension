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

const AddSynapse = (props) => {
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destOptions, setDestOptions] = useState([]);

  const [synSourceLabel, setSynSourceLabel] = useState([]);
  const [synDestLabel, setSynDestLabel] = useState([]);

  const [synSource, setSynSource] = useState([]);
  const [synDest, setSynDest] = useState([]);

  const [isdisabled, setAble] = useState(true);
  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSynDestLabel(null);
    setSynSourceLabel(null);
    setSynSource(0);
    setSynDest(0);
    setAble(true);
  };

  const handleShow = () => {
    setShow(true);
    setAble(true);
  };

  function checkEmpty() {
    if (synSourceLabel && synDestLabel) {
      setAble(false);
    } else {
      setAble(true);
    }
  }

  const addSynapse = () => {
    let newSyns = [synSource, synDest];
    props.setSyn([
      ...props.syn.filter((syn) => {
        return !(syn[0] == newSyns[0] && syn[1] == newSyns[1]);
      }),
      newSyns,
    ]);
    // Saving the matrices to local storage

    saveSystemtoStorage(
      props,
      props.F,
      props.L,
      props.C,
      props.VL,
      [
        ...props.syn.filter((syn) => {
          return !(syn[0] == newSyns[0] && syn[1] == newSyns[1]);
        }),
        newSyns,
      ],
      props.envSyn,
      props.neuronPositions,
      props.T
    );
    props.setSelectedNode("");

    // Adding to history
    let system = systemStackPush(
      props.C,
      props.F,
      props.L,
      props.VL,
      props.T,
      [
        ...props.syn.filter((syn) => {
          return !(syn[0] == newSyns[0] && syn[1] == newSyns[1]);
        }),
        newSyns,
      ],
      props.envSyn,
      props.neuronPositions,
      "Added a Synapse"
    );
    props.pushSystem(system);
    setSynDestLabel(null);
    setSynSourceLabel(null);
    setSynSource(0);
    setSynDest(0);
    handleClose();
  };

  function handleAddSynSource(e) {
    setSynSource(e.value + 1);
    setSynSourceLabel(e);

    if (synDestLabel && e.value === synDestLabel.value) {
      setSynDestLabel(null);
      setSynDest([]);
    }
  }
  function handleAddSynDest(e) {
    setSynDest(e.value + 1);
    setSynDestLabel(e);
  }

  // Load the neuron options for making a synapse
  useEffect(() => {
    let newOptions = [];
    if (props.L.length > 0) {
      for (let i = 0; i < props.L[0].length; i++) {
        newOptions.push({ value: i, label: "Neuron " + (i + 1) });
      }
    }

    setSourceOptions(newOptions);
  }, [props]);

  // Load source neurons when dest neurons are selected
  useEffect(() => {
    let newOptions = [];
    if (synSource.length !== 0) {
      for (let i = 0; i < props.L[0].length; i++) {
        if (i !== synSource - 1) {
          newOptions.push({ value: i, label: "Neuron " + (i + 1) });
        }
      }
    }
    setDestOptions(newOptions);
  }, [synSourceLabel]);

  // Check empty every time destination and source are selected
  useEffect(() => {
    checkEmpty();
  }, [synDestLabel, synSourceLabel, synSource, synDest]);

  return (
    <>
      <Button onClick={handleShow} variant="c5">
        Add Synapse
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
          <h3>Create a Synapse</h3>
        </ModalHeader>
        <ModalBody>
          <div>
            <h5>Create a Synapse connecting 2 Neurons</h5>
            <p></p>
            <h5>Source</h5>
            <Select
              options={sourceOptions}
              isMulti={false}
              onChange={(e) => {
                handleAddSynSource(e);
                checkEmpty();
              }}
              value={synSourceLabel}
            />
            <h5>Destination</h5>
            <Select
              options={destOptions}
              isMulti={false}
              value={synDestLabel}
              onChange={(e) => {
                handleAddSynDest(e);
                checkEmpty();
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={isdisabled}
            onClick={addSynapse}
            id="submitbutton"
            variant="c5"
          >
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddSynapse;
