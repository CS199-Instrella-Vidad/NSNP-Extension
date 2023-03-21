function functionToString(F: number[], j: number, vars, threshold) {
  let string = "";

  string += "f_" + (j + 1) + "(";
  for (let i = 0; i < vars.length; i++) {
    string += "x_" + (vars[i] + 1) + ", ";
  }
  string = string.slice(0, -2);
  string += ") = ";
  for (let i = 0; i < F.length; i++) {
    if (F[i] != 0) {
      string +=
        (F[i] > 1 ? F[i] : F[i] < 1 ? F[i] : "") + "x_" + (i + 1) + " + ";
    }
  }
  string = string.slice(0, -3);

  // Threshold addition

  if (threshold != 0) {
    string += "\\,|_" + threshold;
  }
  return string;
}

export function createNeuron(VL, C, F, L, i, T) {
  let vars: number[] = [];
  let indices: number[] = [];
  let neuronText = `\\displaylines{`;

  // Get the values of the variables
  let varString = "";
  for (let j = 0; j < VL.length; j++) {
    if (VL[j] === i + 1) {
      varString += "x_" + (j + 1) + "[" + C[j] + "], \\;";
      vars.push(C[j]);
      indices.push(j);
    }
  }
  varString = varString.slice(0, -4);
  neuronText += varString + "\\\\\\\\";

  let functionString = "";
  // Get the functions of the neuron
  for (let j = 0; j < L.length; j++) {
    if (L[j][i] === 1) {
      let threshold: number = 0;
      for (let k = 0; k < T.length; k++) {
        if (T[k][0] === j + 1) threshold = T[k][1];
      }

      functionString += functionToString(F[j], j, indices, threshold) + "\\\\";
    }
  }
  neuronText += functionString + "}";

  return [
    {
      data: {
        id: "Neuron " + (i + 1),
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "Neuron " + (i + 1),
        id: "neuron-contents" + i,
        label: neuronText,
      },
      position: {
        x: 100 * (2.5 * (i + 1)),
        y: 100 + 100,
      },
      classes: "neuron-contents",
    },
  ];
}

export function createEnvNode(envValue, i) {
  let envText = `\\displaylines{`;
  envText += envValue + "\\\\";
  envText += "}";
  return [
    {
      data: {
        id: "Environment",
      },
      classes: "neuron",
    },
    {
      data: {
        parent: "Environment",
        id: "Environment Contents",
        label: envText,
      },
      position: {
        x: 100 * (2.5 * (i + 1)),
        y: 100 + 100,
      },
      classes: "neuron-contents",
    },
  ];
}
