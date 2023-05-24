export default function saveSystemtoStorage(
  props,
  newF,
  newL,
  newC,
  newVL,
  newSyn,
  newEnvSyn,
  newNeuronPositions,
  newT
) {
  props.setF(newF);
  props.setNeuronPositions(newNeuronPositions);
  props.setVL(newVL);
  props.setL(newL);
  props.setC(newC);
  props.setEnvSyn(newEnvSyn);
  props.setSyn(newSyn);
  props.setT(newT);
  const json = {
    C: newC,
    VL: newVL,
    F: newF,
    L: newL,
    T: newT,
    syn: newSyn,
    envSyn: newEnvSyn,
    neuronPositions: newNeuronPositions,
  };
  localStorage.setItem("Matrices", JSON.stringify(json));
  localStorage.setItem("positions", JSON.stringify(newNeuronPositions));
}
