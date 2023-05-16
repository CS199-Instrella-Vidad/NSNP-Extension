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

function DeleteSynForm(props) {
  const [synOptions, setSynOptions] = useState([]);
  const [status, setStatus] = useState(false);
  const [toDelete, setToDelete] = useState([]);
  const [isdisabled, setAble] = useState(true);
  const [showModal, setShow] = useState(false);

  const show = () => setStatus(true);
  const hide = () => setStatus(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const todelete = () => {
    if (props.selectedSyn.split("-")[1] == "Environment") {
      return;
    }
    let neuron1 = parseInt(props.selectedSyn.split("-")[0].slice(7));
    let neuron2 = parseInt(props.selectedSyn.split("-")[1]);
    let remSyn = [neuron1, neuron2];
    let newSyn = props.syn.filter((syn) => {
      return !(syn[0] == remSyn[0] && syn[1] == remSyn[1]);
    });
    props.setSyn(
      props.syn.filter((syn) => {
        return !(syn[0] == remSyn[0] && syn[1] == remSyn[1]);
      })
    );
    console.log(props.syn);

    let matrices = {
      F: props.F,
      C: props.C,
      L: props.L,
      syn: newSyn,
      VL: props.VL,
      T: props.T,
      envSyn: props.envSyn,
    };

    localStorage.setItem("Matrices", JSON.stringify(matrices));
    props.setSelectedSyn("");
    hide();
  };
  const massDelete = () => {};

  function checkEmpty() {
    // if (synSourceLabel && synDestLabel) {
    //   setAble(false);
    // } else {
    //   setAble(true);
    // }
  }

  function deleteSynapse(syn) {}

  // Load the synapse options for the dropdown menu
  useEffect(() => {
    // let newOptions = [];
    // if (newL.length > 0) {
    //   for (let i = 0; i < newL[0].length; i++) {
    //     newOptions.push({ value: i, label: "Neuron " + (i + 1) });
    //   }
    // }
    // setSynOptions(newOptions);
  }, [props]);

  if (
    props.selectedSyn !== "" &&
    props.selectedSyn.split("-")[1] !== "Environment"
  ) {
    return (
      <>
        <Button variant="c1" onClick={show}>
          Delete {props.selectedSyn}
        </Button>
        <Dialog open={status} onClose={hide}>
          <DialogTitle>Alert: Deleting a Synapse</DialogTitle>
          <DialogContent>
            You are about to delete {props.selectedSyn}.
          </DialogContent>
          <DialogActions>
            <Button onClick={hide}>Cancel</Button>
            <Button onClick={todelete} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return (
      <>
        <Button onClick={handleShow} variant="c5">
          Delete Synapses
        </Button>
        {/* //       <Modal
  //         dialogclassname="modalcustom"
  //         keyboard={false}
  //         centered
  //         backdrop="static"
  //         show={showModal}
  //         onHide={handleClose}
  //       >
  //         <ModalHeader closeButton className="sticktop">
  //           <h3>Delete Synapses</h3>
  //         </ModalHeader>
  //         <ModalBody>
  //           <div>
  //             <h5>Select synapse/s to delete</h5>
  //             <p>
  //               You can delete multiple synapses. Deleting synapses will not
  //               delete the Neurons they are connecting.
  //             </p>
  //             <Select
  //               options={synOptions}
  //               isMulti={true}
  //               onChange={(e) => {
  //                 checkEmpty();
  //                 handleAddtoDelete(e);
  //               }}
  //             />
  //           </div>
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button
  //             disabled={isdisabled}
  //             onClick={massDelete}
  //             id="submitbutton"
  //             variant="c5"
  //           >
  //             Delete
  //           </Button>
  //         </ModalFooter>
  //       </Modal> */}
      </>
    );
  }
}
export default DeleteSynForm;
