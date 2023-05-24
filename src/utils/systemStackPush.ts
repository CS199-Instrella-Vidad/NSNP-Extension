export function systemStackPush(
  newC,
  newF,
  newL,
  newVL,
  newT,
  newSyn,
  newEnvSyn,
  newNeuronPositions,
  message
) {
  // Add new neuron to the system

  const system = {
    matrices: {
      C: JSON.parse(JSON.stringify(newC)),
      F: JSON.parse(JSON.stringify(newF)),
      L: JSON.parse(JSON.stringify(newL)),
      VL: JSON.parse(JSON.stringify(newVL)),
      T: JSON.parse(JSON.stringify(newT)),
      syn: JSON.parse(JSON.stringify(newSyn)),
      envSyn: JSON.parse(JSON.stringify(newEnvSyn)),
    },
    positions: {
      neuronPositions: JSON.parse(JSON.stringify(newNeuronPositions)),
    },
    message,
  };

  return system;
}
