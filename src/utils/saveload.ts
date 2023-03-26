import saveAs from "file-saver";
import convert from "xml-js";
function saveSystem(props) {
  const json = {
    C: props.C,
    VL: props.VL,
    F: props.F,
    L: props.L,
    T: props.T,
    syn: props.syn,
    envSyn: props.envSyn,
    neuronPositions: props.neuronPositions,
  };
  const xml = JSON.stringify(json);
  console.log(JSON.parse(xml));

  const blob = new Blob([xml], { type: "text/xml;charset=utf-8" });
  let filename = JSON.stringify(props.C);
  saveAs(blob, filename + ".json");
}

function loadSystem(target, props) {
  let file = target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let json = JSON.parse(reader.result as string);
    props.setC(json.C);
    props.setVL(json.VL);
    props.setF(json.F);
    props.setL(json.L);
    props.setT(json.T);
    props.setSyn(json.syn);
    props.setEnvSyn(json.envSyn);
    props.setNeuronPositions(json.neuronPositions);
    const matrices = JSON.stringify(json);
    localStorage.setItem("Matrices", matrices);
    localStorage.setItem("positions", JSON.stringify(json.neuronPositions));
  };
  reader.onerror = function () {
    console.log(reader.error);
  };
}

export { saveSystem, loadSystem };
