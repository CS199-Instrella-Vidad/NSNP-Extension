import React from "react";

function ButtonBar(props) {
  return (
    <div className="align-items-center justify-content-center d-flex">
      <button onClick={() => {}}>
        {props.selectedNode === "" ? (
          <>No Element Selected</>
        ) : (
          <>Edit {props.selectedNode}</>
        )}
      </button>
      <button
        onClick={() => {
          props.setShowNewNode(!props.showNewNode);
        }}
      >
        New Node
      </button>
      <button onClick={() => {}}>Reset Variable</button>
      <button onClick={() => {}}>Reset Variable</button>
    </div>
  );
}

export default ButtonBar;
