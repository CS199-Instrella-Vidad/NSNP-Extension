import { Dialog, DialogContent, DialogTitle,DialogActions } from "@mui/material";

import {React,useState} from "react";
import { Button } from "react-bootstrap";
function DeleteForm(handleClose,props,Node=1) {
    const [status,setStatus]=useState(false);
    const show=()=>setStatus(true);
    const hide=()=>setStatus(false);
    const todelete=()=>{
        //do delete here
        alert("Deleted");
        hide();
    };
    return(
        <>
            <Button variant='c1' onClick={show}>Delete Form</Button>
            <Dialog open={status} onClose={hide}>
                <DialogTitle>Alert: Deleting a Node</DialogTitle>
                <DialogContent>You are about to Delete Node {Node}</DialogContent>
                <DialogActions>
                    <Button onClick={hide}>Disagree</Button>
                    <Button onClick={todelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default DeleteForm;