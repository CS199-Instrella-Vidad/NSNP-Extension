import cytoscape from "cytoscape";
import { mathJaxSvg } from "../../utils/mathJaxsvg";

let svg_math = mathJaxSvg("\\sum^N_i x_i+y_i \\xrightarrow{3}");

let stylesheet: cytoscape.Stylesheet[] = [
  {
    selector: ".neuron",
    css: {
      shape: "roundrectangle",
      content: "data(id)",
      "background-color": "white",
      "border-color": "black",
      "background-opacity": 1,
      "font-family": "Computer Modern",
    },
  },
  {
    selector: ".neuron-contents",
    css: {
      events: "no",
      "text-wrap": "wrap",
      "background-image": function (ele) {
        return mathJaxSvg(ele.data("label"));
      },
      "background-fit": "contain",
      "background-color": "white",
      "background-opacity": 1,

      shape: "roundrectangle",
      width: function (ele) {
        let numBackslashes = (ele.data("label").match(/\\\\/g) || []).length;
        let tentLength = (ele.data("label").length / numBackslashes) * 10;
        return tentLength;
      },
      height: function (ele) {
        let numBackslashes = (ele.data("label").match(/\\\\/g) || []).length;

        let tentLength = numBackslashes * 25;
        return tentLength;
      },
    },
  },
  {
    selector: "edge",
    css: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      // "target-arrow-color": "black",
      // "line-color": "black",
      "text-valign": "center",
      "text-halign": "center",
      "text-background-color": "white",
      "text-background-opacity": 1,
      "text-background-shape": "roundrectangle",
      "text-rotation": "autorotate",
      "text-margin-y": -5,
    },
  },
];

export default stylesheet;
