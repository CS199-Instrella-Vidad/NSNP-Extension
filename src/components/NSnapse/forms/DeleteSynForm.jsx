import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import "./forms.css";
import { Button } from "react-bootstrap";
import { systemStackPush } from "../../../utils/systemStackPush";
import saveSystemtoStorage from "../../../utils/saveSystemtoStorage";

function DeleteSynForm(props) {
  // Modal visibility
  const [status, setStatus] = useState(false);
  const show = () => setStatus(true);
  const hide = () => setStatus(false);

  const todelete = () => {
    // Adding to history
    let system = systemStackPush(props);
    props.pushSystem(system.matrices, system.positions, "Deleted a Synapse");

    if (props.selectedSyn.split("-")[1] == "Environment") {
      return;
    }
    let neuron1 = parseInt(props.selectedSyn.split("-")[0].slice(7));
    let neuron2 = parseInt(props.selectedSyn.split("-")[1]);
    let remSyn = [neuron1, neuron2];
    let newSyn = props.syn.filter((syn) => {
      return !(syn[0] == remSyn[0] && syn[1] == remSyn[1]);
    });

    // Setting of synapse
    props.setSyn(
      props.syn.filter((syn) => {
        return !(syn[0] == remSyn[0] && syn[1] == remSyn[1]);
      })
    );

    saveSystemtoStorage(
      props,
      props.F,
      props.L,
      props.C,
      props.VL,
      newSyn,
      props.envSyn,
      props.neuronPositions,
      props.T
    );
    props.setSelectedSyn("");

    hide();
  };

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
        <Button variant="c5" disabled={true}>
          Delete Synapse
        </Button>
      </>
    );
  }
}
export default DeleteSynForm;
