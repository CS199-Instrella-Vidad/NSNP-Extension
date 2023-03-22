import cytoscape, { Stylesheet, StylesheetCSS } from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useRef, useState } from "react";
import { ElementDefinition } from "cytoscape";
import { createEnvNode, createNeuron } from "../../../utils/helper";
import ButtonBar from "./ButtonBar";
import stylesheet from "./stylesheet";
import NewNodeForm from "../forms/NewNodeForm";
import React from "react";

export default function Graph(props) {
  // Cytoscape reference
  const cyRef = useRef(cytoscape());
  const [elements, setElements] = useState(new Array<ElementDefinition>());
  const [selectedNode, setSelectedNode] = useState<string>("");

  // Modal states
  const [showNewNode, setShowNewNode] = useState(false);

  // Create the system when the component is mounted
  useEffect(() => {
    setElements([]);
    createSystem();
  }, [props.C, props.VL, props.F, props.L, props.T, props.syn, props.envSyn]);

  // Track events on the graph
  useEffect(() => {
    const cy = cyRef.current;
    cy.on("tap", function (event) {
      var evtTarget = event.target;

      if (evtTarget === cy) {
        console.log("tap on background");
        setSelectedNode("");
      } else {
        console.log("tap on : " + evtTarget.id());
        // If the element is a node, set the selected node to the id of the node
        if (evtTarget.isNode()) {
          setSelectedNode(evtTarget.id());
        }
        // If the element is an edge, set the selected node to the id of the edge
        else if (evtTarget.isEdge()) {
          console.log("Edge");
        }
        setSelectedNode(evtTarget.id());
      }
    });

    // Get the position of all nodes
    cy.on("mouseup", function (event) {
      let positions = cy.nodes().map((node, index) => {
        return {
          id: node.id(),
          position: node.position(),
        };
      });
      localStorage.setItem("positions", JSON.stringify(positions));
    });
    (cy as any).gridGuide({
      guidelinesStyle: {
        strokeStyle: "black",
        horizontalDistColor: "#ff0000",
        verticalDistColor: "green",
        initPosAlignmentColor: "#0000ff",
      },
    });
  }, [cyRef]);

  function createSystem() {
    let newElements: ElementDefinition[] = [];
    // get the max value in props.VL
    let max = Math.max(...props.VL);

    // Loop through the neurons
    for (let i = 0; i < max + 1; i++) {
      // Create a neuron for each variable
      if (i === max) {
        newElements.push(...createEnvNode(props.envValue, i));
      } else {
        newElements.push(
          ...createNeuron(props.VL, props.C, props.F, props.L, i, props.T)
        );
      }
    }

    // From props.syn, create a list of edges where the source and target are the nodes in the list of nodes
    let edges = props.syn.map((synapse) => {
      return {
        data: {
          id: "Synapse " + synapse[0] + "-" + synapse[1],
          source: "Neuron " + synapse[0],
          target: "Neuron " + synapse[1],
          label: synapse[2],
          classes: "edge",
        },
      };
    });

    let outputSource = "Neuron " + props.envSyn;
    let outputEdge = {
      data: {
        id: "Synapse " + outputSource + "-Environment",
        source: outputSource,
        target: "Environment",
        label: "Output",
        classes: "edge",
      },
    };
    edges.push(outputEdge);
    // Add the edges to the list of elements
    newElements.push(...edges);

    let storedPositions = localStorage.getItem("positions");
    if (storedPositions !== null) {
      let json = JSON.parse(storedPositions);
      for (let i = 0; i < json.length; i++) {
        let position = json[i];
        let node = newElements.find((node) => node.data.id === position.id);
        if (node !== undefined) {
          node.position = position.position;
        }
      }
    }

    // set elements to newElements
    console.log(newElements);
    setElements(newElements);
  }
  return (
    <>
      <ButtonBar
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        showNewNode={showNewNode}
        setShowNewNode={setShowNewNode}
      />
      {showNewNode && (
        <NewNodeForm {...props} setShowNewNode={setShowNewNode} />
      )}
      <CytoscapeComponent
        elements={elements}
        boxSelectionEnabled={false}
        stylesheet={stylesheet}
        cy={(cy) => (cyRef.current = cy)}
        minZoom={0.5}
        maxZoom={2}
        style={{ width: "100vw", height: "100vh" }}
      />
    </>
  );
}
