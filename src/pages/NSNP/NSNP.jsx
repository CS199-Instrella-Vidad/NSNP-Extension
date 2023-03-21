import NewNodeForm from "../../components/NSnapse/forms/NewNodeForm";
import NewInputForm from "../../components/NSnapse/forms/NewInputForm";
import EditNodeForm from "../../components/NSnapse/forms/EditNodeForm";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import "./NSNP.css";
import DeleteForm from "../../components/NSnapse/forms/DeleteForm";

function NSNP() {
  // modals
  const [showNewNodeModal, setShowNewNodeModal] = useState(false);
  const [showNewInputNodeModal, setShowNewInputNodeModal] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [showEdit, setshowEdit] = useState(false);
  //handles
  const handleClose = () => setShowNewNodeModal(false);
  const handleShow = () => setShowNewNodeModal(true);
  const handleNewInputClose = () => setShowNewInputNodeModal(false);
  const handleNewInputShow = () => setShowNewInputNodeModal(true);
  const handleOutputShow = () => alert("Added new Output Neuron");
  const handleDeleteClose = () => setDelete(false);
  const handleDeleteShow = () => setDelete(true);
  const handleShowEdit = () => setshowEdit(true);
  const handleCloseEdit = () => setshowEdit(false);
  return (
    <>
      <Menu />
      <div className="body">
        <div className="nsnpheader">
          <center>
            <h1>NSN P Simulator</h1>
          </center>
          <div className="actionselector">
            <NewNodeForm handleCloseModal={handleClose} />
            <NewInputForm handleCloseModal={handleNewInputClose} />
            <Button variant="c5" onClick={handleOutputShow}>
              New Output Neuron
            </Button>
            {/* place holders */}

            <EditNodeForm handleCloseModal={handleCloseEdit} />
            <DeleteForm />
          </div>
        </div>
      </div>
    </>
  );
}
export default NSNP;
